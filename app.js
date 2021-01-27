const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
dotenv.config();


mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser: true,useUnifiedTopology: true});



var express = require('express');
var app = express();

app.use("/",routes)
app.listen(8081);

