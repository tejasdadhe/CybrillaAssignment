const cart = require('../models/cart');

viewCart = (req,res) =>
{

    if(req.query.cartId)
    {
        const cartId = req.query.cartId;
        console.log("here",cartId);
        cart.find({_id:cartId},function(err,result)
        {
            if(err)  //Database Error
            {
                response = {
                    error: 1,
                    result: err
                } 
                res.send(response);
            }
            else if(!result.length) // No such cart exist
            {
                response = {
                    error: 1,
                    result: 'Cart with id '+ cartId +' does not exist'
                } 
                res.send(response);
            }
            else
            {
                response = {
                    error: 0,
                    result: result
                } 
                res.status(200);
                res.send(response);
            }
        });
    }
    else
    {
        response = {
            error: 1,
            result: "cartID is required!"
        } 
        res.send(response);
    }
}

module.exports = viewCart;
