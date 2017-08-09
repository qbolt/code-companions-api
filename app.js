const express = require('express');
const app = express();
const router = require('./router');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

//prefix all routes with api
app.use('/api', router);


const port = process.env.port || 8080;
app.listen(port, ()=>{console.log(`api listening on port ${port}`)});