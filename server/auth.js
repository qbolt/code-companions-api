const express = require('express')
const app = express()

const auth = function(req, res, next) {
  const bearerHeader = req.headers['authorization']
  console.log(bearerHeader);
  if(bearerHeader !== undefined){
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]
    req.token = bearerToken
    next()
  }else {
    res.status(403).send("Forbidden")
  }
}

module.exports = auth