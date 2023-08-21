const express = require('express');
const app = express();

const bodyParser = require('body-parser');

//Security Midddleware

const rateLimit = require('express-rate-limit')
const sanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const cors = require('cors');
const hpp = require('hpp');
const xss = require('xss-clean');

const mongoose = require('mongoose')

//ENV

const dotENV = require('dotenv');
dotENV.config();

// Security Middleware Implementations

app.use(sanitize());
app.use(helmet());
app.use(cors());
app.use(hpp());
app.use(xss());

app.use(express.json({limit:"50mb"}));
//app.use(express.urlencoded({limit: "100mb"}));

//BodyParser implermentaion
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded());

//Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3000
})
app.use(limiter);

//Database Connection
const URL = `mongodb+srv://${process.env.MONGODB_USER_NAME}:${process.env.MONGODB_USER_PASSWORD}@cluster0.9pvozuw.mongodb.net/CRUD?retryWrites=true&w=majority`;
//const OPTIONS = {useNewUrlParser: true, useUnifiedToplogy: true};
const OPTIONS = {useNewUrlParser: true};
mongoose.connect(URL, OPTIONS).then((error)=>{
    console.log("Connected to Database");
    //console.log(error);
})


module.exports = app;