const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var schema  = new Schema(
    {
        products: {type: Array, required: true},
        totalQuantity : {type: Number, required: true},
        totalPrice : {type: Number, required: true}
    }
);

module.exports = mongoose.model('cart',schema);