const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var schema  = new Schema(
    {
        products: {type: Object, required: true},
        totalQuantity : {type: Number, required: true},
        totalPrice : {type: Number, required: true},
        cartDiscount: {type: Number, required: true},
        totalDiscount: {type: Number, required: true}
    }
);

module.exports = mongoose.model('cart',schema);