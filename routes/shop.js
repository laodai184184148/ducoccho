const express = require('express');
const shopController = require('../controller/shop');
const router = express.Router();
const Order = require('../models/order');
const Cart = require('../models/cart');
const Product = require('../models/product');
const { ensureAuthenticated, forwardAuthenticated,authRole } = require('../config/auth');


router.get('/', shopController.getAllProducts);

router.get('/products/:id', shopController.getProductDetail);

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.find()
      .then(products=>{
        var product = products.filter(function(item) {
          return item.id == productId;
        });
        cart.add(product[0], productId);
        req.session.cart = cart;
        console.log(cart);
        
        res.redirect('/');
      })
      .catch(err => console.log(err));
    
    
});

router.get('/cart', function(req, res, next) {
    if (!req.session.cart|| req.session.cart.totalItems==0)  {
      return res.render('cart', {
        title: 'NodeJS Shopping Cart',
        products: null,
        user:req.user
      });
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {
      title: 'NodeJS Shopping Cart',
      products: cart.getItems(),
      totalPrice: cart.totalPrice,
      user:req.user
    });
});
router.post('/search',shopController.getsearchpage);
router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
  
    cart.remove(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});
router.get('/cart/checkout', function(req, res, next) {
  if (req.session.cart.totalItems==0) {
    res.redirect('/')
  }else{
  var cart = new Cart(req.session.cart);
  var today = new Date();
  res.render('checkout',{
    title: 'NodeJS Shopping Cart',
      products: cart.getItems(),
      totalPrice: cart.totalPrice,
      user:req.user,
      carrt:cart,
      pageTitle:'checkout'
  })
}
});
router.post('/cart/checkout', function(req, res, next) {
  var cart = new Cart(req.session.cart);
  var today = new Date();
  let errors=[];
  var order = new Order({
    items:cart.getItems(),
    shippingdeatils:{
      city:req.body.city,
      district:req.body.district,
      sub_district:req.body.sdis,
      street:req.body.street,
      houseNumber:req.body.houseNumber
    },
    shippingTime:{
      date:req.body.date,
      hour:req.body.hour
    },
    cusdetails:{
      name:req.body.fname,
      email:req.body.email,
      phonenumber:req.body.phone
    },
    totalItems:cart.totalItems,
    totalPrice:cart.totalPrice,
    
    
    
    payment_method:req.body.payment_method,
    create_date:today
});
  if (req.body.payment_method=='Thanh Toán Khi Nhận Hàng')
  {
    order.payment_status="Unpaid";
    order.del_status="Waiting for  Delivery"
  }
  else{
    order.payment_status="Paid";
    order.del_status="Waiting for  Delivery"
  }
   if (!order.shippingdeatils.city||!order.shippingdeatils.district||!order.shippingdeatils.sub_district||!order.shippingdeatils.street||!order.shippingdeatils.houseNumber||!order.cusdetails.name||!order.cusdetails.email||!order.cusdetails.phonenumber){
     errors.push({msg:'Please fill in any fields'});
   }
   if (errors.length>0){
    res.render('checkout',{
        errors,
        products: cart.getItems(),
        totalPrice: cart.totalPrice,
        user:req.user,
        carrt:cart
    });
    
   } else {
    order.save()
    .then(result=>{
      res.render('order_detailes',{
        title: 'NodeJS Shopping Cart',
          products: cart.getItems(),
          user:req.user,
          carrt:cart,
          order:order,
          pageTitle:'post checkout'
      })
    })
    .catch(err => console.log(err));
  }
});
router.get('/order', shopController.getorderpage);
router.post('/order/findorder', shopController.postsearchorderpage);
module.exports = router; 