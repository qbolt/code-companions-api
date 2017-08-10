const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const emailjs = require('emailjs');
const uuid = require('uuid/v4');
const apiToken = "9d07a3c8-8b27-408a-8870-047ae9cccb42";

//models
const User = require('./models/User');
const ProjectListing = require('./models/ProjectListing');

//email server
const emailServer = emailjs.server.connect({
    user: "codecompanionverify@gmail.com",
    password: "verifycompanioncode",
    host: "smtp.gmail.com",
    ssl: true
});

//check all requests for api token
router.use((req, res, next) => {
    if (req.query.token) {
        if (req.query.token !== apiToken) {
            res.status(403).json({ message: "Invalid API Token" })
        } else {
            next()
        }
    } else {
        res.status(403).json({ message: "API Token Not Provided" })
    }
});

router.get('/', (req, res) => res.json({ message: 'API Home' }));

router.route('/users')
    .get((req, res) => User.findAll().then(users => res.json({ users: users })))
    .post((req, res) => {
        bcrypt.hash(req.sanitize('password').escape(), 10).then(hashed_password => {
            const newUser = User.build({
                first_name: req.sanitize('firstname').escape(),
                last_name: req.sanitize('lastname').escape(),
                email: req.sanitize('email').escape(),
                username: req.sanitize('username').escape(),
                profile_pic: req.sanitize('profile_pic').escape(),
                password: hashed_password,
                verification_code: uuid()
            });

            newUser.save().then(user => {

                //send verification email
                emailServer.send({
                    text: "Verify your email localhost:8080/api/users/" + user.id + "/verify/?token=" + apiToken + "&verify=" + user.verification_code,
                    from: "Code Companions <tivi@natividadalvarez.com>",
                    to: user.first_name + " " + user.last_name + " <" + user.email + ">",
                    subject: "Code Companions Account"
                }, (err, message) => console.log(err || message));

                res.json({ success: true, newUser: user });
            }).catch(err => {
                res.json({ success: false, err: err });
            });
        });
    });

router.route('/users/:id')
    .get((req, res) => User.findById(req.params.id).then(user => res.json({ user: user })))
    .put((req, res) => res.json({ update: 'update users' }))
    .delete((req, res) => res.json({ delete: 'deleted user' }));

router.route('/users/:id/verify')
    .get((req, res) => {
        const verification_code = req.sanitizeQuery('verify').escape().toString();
        const id = req.sanitizeParams('id').escape().toString();
        User.update(
            { verified: true },
            { where: { id: id, verification_code: verification_code } }
        ).then(user => {
            res.json({ success: true, msg: "Your account was verified!" });
        }).catch(err => {
            res.json({ success: false, err: err });
        });

    });

router.route('/users/login')
    .post((req, res) => {
        const username = req.sanitize('username').escape().toString();
        const password = req.sanitize('password').escape().toString();
        User.findOne({ where: { username } }).then(user => {
            user = user.toJSON();
            bcrypt.compare(password, user.password).then((same) => {
                if (same) {
                    res.json({ success: true, user: user });
                } else {
                    res.json({ success: false, err: "Incorrect Password" });
                }
            }).catch((err) => {
                res.json({ success: false, err: err });
            });
        }).catch(err => {
            res.json({ success: false, err: "Incorrect Username" });
        });
    });

router.route('/projects')
    .get((req, res) => ProjectListing.findAll().then(projectListings => res.json({ projectListings: projectListings })))
    .post((req, res) => {
        const username = req.sanitize('username').escape().toString();
        const user_id = req.sanitize('user_id').escape().toString();
        const project_creator = {
            username: username,
            user_id: user_id
        };
        const project_description = req.sanitize('project_description').escape().toString();
        const tags = req.sanitize('tags').escape().toString().split('|'); // we will ask users to sperate tags by pipe character
        const num_devs_needed = req.sanitize('num_devs_needed').escape().toString();

        const newProjectListing = ProjectListing.build({
            project_creator: project_creator,
            project_description: project_description,
            tags: tags,
            num_devs_needed: num_devs_needed
        });

        newProjectListing.save().then(projectListing => {
            res.json({ success: true, projectListing: projectListing });
        }).catch(err => {
            res.json({ success: false, err: err });
        });
    });

module.exports = router;