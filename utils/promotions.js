

const mongoose = require ('mongoose');
const promotionModel = require('../models/promotions');

let fetchPromotions = new Promise(function(resolve, reject) {   
    promotionModel.find({},{_id:0},
        function(error,promotion)
        {
            if(promotion) {
                promotion = JSON.parse(JSON.stringify(promotion[0]));
                resolve(promotion);
            }
            else reject(error);
        });
    });

class Promotions {

    constructor()
    {
        this.fetchPromotions = fetchPromotions;
    }

    

    calculateBulkDiscount(promotion,cartObject)
    {
        const bulkPromotion = promotion.bulkPromotion;
        const cartPromotion = promotion.cartPricePromotion;
        
        var totalAmountBeforeDiscount = 0;  
        var totalBulkDiscount = 0;
        var totalAmountAfterDiscount = 0;


        const productsInCart = cartObject.products;


        for(var i in productsInCart)
        {

            const productName = productsInCart[i].name;
            if(bulkPromotion[productName]) // Bulk Promotion on this item exists
            {
                const promotion = bulkPromotion[productName]
                const cartQuantity = productsInCart[i].quantity;
                const promotionQuantity = promotion.quantity;
                const discountAmount = promotion.discountAmount;
                const bulkDiscount = Math.floor(cartQuantity/promotionQuantity) * discountAmount;
                console.log("Bulk Discount",bulkDiscount);
                cartObject.products[i].discount = bulkDiscount;
                totalBulkDiscount += bulkDiscount;
            }
            totalAmountBeforeDiscount  += Number(productsInCart[i].price);
        }
        cartObject.cartDiscount = totalBulkDiscount;
        totalAmountAfterDiscount = totalAmountBeforeDiscount - totalBulkDiscount;
    }
    calculateCartDiscount(promotion,cartObject)
    {
        var promotionObject = promotion.cartPricePromotion;
        if((Number(cartObject.totalPrice)-Number(cartObject.cartDiscount)) >= Number(promotionObject.targetAmount))
        {
            cartObject.totalDiscount = promotionObject.discountAmount;
        }
        else cartObject.totalDiscount = 0;
    }
}

module.exports = Promotions;

