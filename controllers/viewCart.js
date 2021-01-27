const cart = require('../models/cart');

viewCart = (req,res) =>
{
    console.log("clled");
    cart.find({},function(err,result)
    {
        if(err)
        {
            response = {
                error: 1,
                result: err
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

module.exports = viewCart;
