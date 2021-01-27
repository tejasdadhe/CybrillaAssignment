const product = require('../models/product');

const handleCall = function(err,res)
{
    if(err) console.log(err);
    else
    {
        console.log(res);
    }
}

listProducts = (req,res) =>
{
    console.log("clled");
    product.find({},{_id:0,__v:0},handleCall);
}

module.exports = listProducts;
