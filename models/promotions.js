const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var schema  = new Schema(
    {
        bulkPromotion: { type: Object }, 
        cartPricePromotion: { type: Object } 
    }
);

module.exports = mongoose.model('promotions',schema);

