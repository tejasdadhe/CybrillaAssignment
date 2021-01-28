const product = require('../models/product');

listProducts = (req,res) =>
{
    product.find({},{__v:0},function(err,products){
        if(err)
            res.status(400).send({ error: 1, result: err})
        else    
            res.status(200).send({ error: 0, result: products});
    });
}

module.exports = listProducts;
