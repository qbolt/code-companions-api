const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://fujfntzw:KPGbWEPIl_qrZ8hHCjqqHnB8VT4hfsC8@babar.elephantsql.com:5432/fujfntzw');
const bcrypt = require('bcrypt');
const expressValidator = require('express-validator');
const apiToken = "9d07a3c8-8b27-408a-8870-047ae9cccb42";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

//prefix all routes with api
app.use('/api', router);

//models
const User = require('./models/User');

//check all requests for api token
router.use(function(req, res, next) {
    if(req.query.token){
        if (req.query.token !== apiToken){
            res.status(403).json({message: "Invalid API Token"});
        }else {
            next();
        } 
    } else {
        res.status(403).json({message: "API Token Not Provided"});
    };
});

router.get('/', function(req, res) {
  res.json({ message: 'API Home'});
});


router.route('/users')
    .get((req, res)=>{
        User.findAll().then(users=>{
            res.json({users: users});
        });
    })

     .post((req, res)=>{
        var firstname = req.sanitize('firstname').escape().toString();
        var lastname = req.sanitize('lastname').escape().toString();
        var email = req.sanitize('email').escape().toString();
        var username = req.sanitize('username').escape().toString();
        if (req.body.profile_pic){
            var profile_pic = req.sanitize('profile_pic').escape().toString();
        }
        var password = req.sanitize('password').escape().toString();
        password = bcrypt.hash(password, 10).then(password=>{
            var newUser = User.build({
                first_name: firstname,
                last_name: lastname,
                email: email,
                username: username,
                profile_pic: profile_pic,
                password: password
            });

            newUser.save().then(user=>{
                res.json({success: true, newUser: user});
            }).catch(err =>{
                res.json({success: false, err: err});
            });
        });
        
    })

    

const port = process.env.port || 8080;
app.listen(port, ()=>{console.log(`app is listening on port ${port}`)});