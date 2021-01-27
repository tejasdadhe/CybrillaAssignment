const Product = require ('../models/product');
const mongoose = require ('mongoose');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser: true,useUnifiedTopology: true});


const products = [
    new Product({
        name : "A",
        price : 30
    }),
    new Product({
        name : "B",
        price : 20
    }),
    new Product({
        name : "C",
        price : 50
    }),
    new Product({
        name : "D",
        price : 15
    }),
];


for(var i in products)
{
    products[i].save(function(e,r){
        if(!e) console.log("Done");
    });
}


