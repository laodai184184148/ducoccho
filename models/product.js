const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        Text:true
    },
    imageURL: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

    price: Number,

    description: String,

    rating:Number,

    brand:String,

    ingredient:String,
    
    volume_weight:String,

    alcohol:Number,

    special:String,

    madein:String,

    type:String,

    congdung:String,

    lieudung:String,

    careful:String,

    huongdan:String,

    doituong:String,

    dodam:String,
});
productSchema.index( { name: "text", description: "text" } )

module.exports = mongoose.model('Product', productSchema);