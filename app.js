const express=require('express');
const app=express();
const expressLayouts=require('express-ejs-layouts');
const mongoose=require('mongoose');
const db = require('./config/keys').MongoURL;
const flash= require('connect-flash');
const session=require('express-session')
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');

const swaggerJsDoc=require('swagger-jsdoc');
const swaggerUi=require('swagger-ui-express');


const swaggerOptions={
  swaggerDefinition: {
      info: {
          title: 'Restful API',
          description: "API Documentation",
          contact: {
              name: "Nguyen Quoc Dai"
          },
          servers: ["http://localhost:3003"]
      }
  },
  apis: ["app.js"]
};




const swaggerDocs=swaggerJsDoc(swaggerOptions);
app.use('/apidocs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
/**
 * @swagger
 * /:
 *  get:
 *    description: Use to request all product
 *    responses:
 *      '200':
 *        description: A successful request
 * /admin/add-product:
 *   post:
 *    description: Create new product and post to database
 *    parameters:
 *    - name: title
 *      description: Title of product
 *      in: formData
 *      required: true
 *      type: string
 *    - name: imageURL
 *      description: Product image URL
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: Product price
 *      in: formData
 *      type: Number
 *    - name: description
 *      description: Product description
 *      in: formData
 *      type: String
 *    - name: brand
 *      description: Product Brand
 *      in: formData
 *      type: String
 *    - name: special
 *      description: Product special point
 *      in: formData
 *      type: String
 *    - name: ingredient
 *      description: Product ingredient
 *      in: formData
 *      type: String
 *    - name: careful
 *      description: Product careful
 *      in: formData
 *      type: String
 *    responses:
 *      '200':
 *        description: Create product success
 * /users/register:
 *   post:
 *    description: Create new basic user and post to database
 *    parameters:
 *    - name: name
 *      description: Name of user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: email
 *      description: Email of user
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: Password account
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Create new basic user success
 * /admin/edit-product:
 *   post:
 *    description: Edit product information
 *    parameters:
 *    - name: id
 *      description: Id of product
 *      in: formData
 *      required: true
 *      type: string
 *    - name: title
 *      description: Title of product
 *      in: formData
 *      required: true
 *      type: string
 *    - name: imageURL
 *      description: New image url
 *      in: formData
 *      required: true
 *      type: string
 *    - name: price
 *      description: New Price
 *      in: formData
 *      type: Number
 *    - name: description
 *      description: New Description
 *      in: formData
 *      type: String
 *    - name: brand
 *      description: Product Brand
 *      in: formData
 *      type: String
 *    - name: special
 *      description: Product special point
 *      in: formData
 *      type: String
 *    - name: ingredient
 *      description: Product ingredient
 *      in: formData
 *      type: String
 *    - name: careful
 *      description: Product careful
 *      in: formData
 *      type: String
 *    responses:
 *      '200':
 *        description: Create new basic user success
 * /admin/delete-product:
 *   post:
 *    description: Delete product
 *    parameters:
 *    - name: id
 *      description: Id of deleted product
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: Delete success
 * /users/login:
 *   post:
 *    description: Login
 *    parameters:
 *    - name: email
 *      description: User Email
 *      in: formData
 *      required: true
 *      type: string
 *    - name: password
 *      description: User Password
 *      in: formData
 *      required: true
 *      type: string
 *    responses:
 *      '200':
 *        description: login success
 * 
 */ 
require('./config/passport_local')(passport);
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT=process.env.PORT||3003;

//ejs
app.use(expressLayouts);
app.set('view engine','ejs');
//bodyparser
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());



//app.use(express.static(__dirname + 'public'));
app.use(express.static(path.join(__dirname, 'public')));
//connect flash
app.use(flash())

//globals vars
app.use((req,res,next)=>{
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  next();
})
//routes
app.use('/users',require('./routes/users'));
app.use('/',require('./routes/shop'));
app.use('/admin',require('./routes/admin'));


//app.use(express.static('./views/public'))

app.listen(PORT,()=> console.log('Server started on port '+PORT));
