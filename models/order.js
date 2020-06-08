const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    items:{
    
    },
    cusdetails:{
        name:String,
        email:String,
        phonenumber:String
    },
    shippingdeatils:{
        city:String,
        district:String,
        sub_district:String,
        street:String,
        houseNumber:String
    },
    shippingTime:{
        date:String,
        hour:String
      },
    totalItems:Number,
    totalPrice:Number,    
    payment_status:String,
    del_status:String,
    payment_method:String,
    create_date:Date
});
orderSchema.index( { cusdetails: "text" } )

module.exports = mongoose.model('Order', orderSchema);