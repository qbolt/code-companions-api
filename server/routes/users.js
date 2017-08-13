const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const emailjs = require('emailjs')
const bcrypt = require('bcrypt')
const uuid = require('uuid/v4')
const auth = require('../auth');

var User = require('../models/User.js')

const emailServer = emailjs.server.connect({
    user: "codecompanionverify@gmail.com",
    password: "verifycompanioncode",
    host: "smtp.gmail.com",
    ssl: true
})

router.get('/', auth, function(req, res) {
  jwt.verify(req.token, "secret-key", (err, data)=>{
    if(err){
      res.json({success: false, err: err})
    }else {
      User.findAll(
        {attributes: { exclude: ['password','verification_code'] }}
      ).then(users =>
         res.json({success: true, users: users })
      )
    }
  })
})

router.post('/', (req, res)=>{
  bcrypt.hash(req.sanitize('password').escape(), 10).then(hashed_password => {
    const newUser = User.build({
      first_name: req.sanitize('firstname').escape(),
      last_name: req.sanitize('lastname').escape(),
      email: req.sanitize('email').escape(),
      username: req.sanitize('username').escape(),
      profile_pic: req.sanitize('profile_pic').escape(),
      password: hashed_password,
      verification_code: uuid()
    })

    newUser.save().then(user => {
      //send verification email
      emailServer.send({
        text: "Verify your email localhost:8080/api/users/" + user.id + "/verify/?verify=" + user.verification_code,
        from: "Code Companions <codecompanionverify@gmail.com>",
        to: user.first_name + " " + user.last_name + " <" + user.email + ">",
        subject: "Code Companions Account"
      })
      res.json({ success: true, newUser: user })
    }).catch(err => {
      res.json({ success: false, err: err })
    })
  })
})

router.post('/login', (req, res)=>{
  const username = req.sanitize('username').escape()
  const password = req.sanitize('password').escape()

  User.findOne({ where: { username } }).then(user => {
    user = user.toJSON()
    if (user.verified === false) {
       res.json({ success: false, err: "Acount Not Verified" })
    }else {
      bcrypt.compare(password, user.password).then((same) => {
        if (same) {
          var token = jwt.sign({user}, "secret-key")
          res.json({ success: true, user: user, token: token})
        } else {
          res.json({ success: false, err: "Incorrect Password" })
        }
      }).catch((err) => {
        res.json({success: false, err: err})
      })
    }
  }).catch(err => {
    res.json({ success: false, err: err })
  })
})

router.get('/:id/verify', (req, res)=>{
  const verification_code = req.sanitizeQuery('verify').escape()
  const id = req.sanitizeParams('id').escape()
  User.update(
    { verified: true },
    { where: { id: id, verification_code: verification_code } }
  ).then(user => {
    res.json({ success: true, msg: "Your account was verified!" })
  }).catch(err => {
    res.json({ success: false, err: err })
  })
})

router.route('/:id')
  .get(auth, (req, res)=>{ 
    jwt.verify(req.token, "secret-key", (err, data)=>{
      if(err){
          res.json({success: false, err: err})
      }else {
        User.findById(req.params.id).then(user => res.json({success: true, user: user }))
      }
    })
  })
  .put((req, res) =>{ 
    jwt.verify(req.token, "secret-key", (err, data)=>{
      if(err){
          res.json({success: false, err: err})
      }else {
        res.json({ update: 'update users' })
      }
    })
  })
  .delete((req, res) => { 
    jwt.verify(req.token, "secret-key", (err, data)=>{
      if(err){
        res.json({success: false, err: err})
      }else {
        res.json({ delete: 'deleted user' })
      }
    })
  })

module.exports = router
