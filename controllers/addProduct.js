const Promotions = require('../utils/promotions');
const cart = require('../models/cart');
const product = require('../models/product');




async function addToCart(cartId,product,res)
{
    if(cartId) // Adding product to existing cart
    {
        cart.findById(cartId,function(err,result)
        {
            if(err || result==null) res.status(400).send({ error: 1, result: "Invalid cartId"})
            else 
            {
                const promotions = new Promotions();
                promotions.fetchPromotions.then(function(promotionObject)
                {
                    const newCart = result;
                    if(newCart.products[product['_id']])
                    {
                        newCart.products[product['_id']].quantity += 1;
                        newCart.products[product['_id']].price += product['price'];  
                    }
                    else
                    {    
                        const id =  product['_id'];
                        var newProduct = {};
                        newProduct['quantity'] = 1;
                        newProduct['_id'] = id;
                        newProduct['name'] = product.name;
                        newProduct['price'] = product.price;
                        newProduct['discount'] = 0;
                        newCart.products[id] = newProduct;
                    }
                    newCart.totalPrice += product['price'];
                    newCart.totalQuantity += 1;
                    promotions.calculateBulkDiscount(promotionObject,newCart);
                    promotions.calculateCartDiscount(promotionObject,newCart);
                    cart.findOneAndUpdate({_id:cartId},newCart,{ new: true },function(errr,result){console.log("#### Product Added #####")
                    res.status(200).send({ error: 0, result: {remark:"Product Added to cart",cart:result}});
                    });
                },
                function(error)
                {
                    res.status(500).send({ error: 1, result: "Internal server error"})
                });
            }
        })
    }
    else         // Create a new cart
    {
        const id =  product['_id'];
        var newProduct = {};
        newProduct['quantity'] = 1;
        newProduct['_id'] = id;
        newProduct['name'] = product.name;
        newProduct['price'] = product.price;
        newProduct['discount'] = 0;

        const cartObj = {'products':{}};
        cartObj.products[id] = newProduct;
        cartObj.totalQuantity = 1;
        cartObj.cartDiscount = 0;
        cartObj.totalDiscount = 0;
        cartObj.totalPrice = product.price;

        const newCart = new cart(cartObj)
        newCart.save((err,cart)=>{
        res.status(200).send({ error: 0, result: {remark:"Product Added to cart",cartId:cart['_id']}});  
        });
    }

}



addProduct= (req,res) =>
{
    const cartId = req.body.cartId;
    const productId = req.body.productId;

    if(!productId) res.send({ error: 1, result: "Invalid productId"})
    else
    {
        product.findById(productId,function(err,result)
        {
            if(err)
            {
                res.send({
                    error: 1,
                    result: "Invalid productId"
                } )
            }
            else
            {
                addToCart(cartId,result,res)
            }
        })
    }
}


module.exports = addProduct;
