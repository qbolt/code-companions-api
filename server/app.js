const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const jwt = require('jsonwebtoken')
const expressValidator = require('express-validator')

//CORS middleware
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, POST, GET')
  next();
});


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(expressValidator())
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}))


//routes
var index = require('./routes/index')
var users = require('./routes/users')

app.use('/api/', index)
app.use('/api/users', users)


app.listen(8080, ()=>{console.log("api on port 8080")})