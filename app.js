const mongoose = require ('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');


dotenv.config();


mongoose.connect(process.env.MONGO_DB_URI,{useNewUrlParser: true,useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);


var express = require('express');
var app = express();


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/",routes)
app.listen(8081);

