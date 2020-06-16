var express = require('express')
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var student= express.Router()


//SCHEMA
var Student = require('../model/student.js')
student.use(express.static('public'))


//SIGN_UP
student.get('/signup', (req, res, next) => {
    res.render('stud_signup.hbs')
})

student.post('/signup', (req, res, next) => {
    Student.find({ email: req.body.email })
        .then((result) => {
            if (result.length>=1) {
                console.log("EMAIL_ID ALREADY EXIST")
            }
            else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    // Store hash in your password DB.
                    if (err) {
                        console.log(err)
                    }
                    else {
                        var student = new Student({
                            _id: mongoose.Types.ObjectId(),
                            name: req.body.user_name,
                            email: req.body.email,
                            password: hash
                        })
                        student.save()
                            .then((data) => {
                                req.session.signup=data._id
                                console.log("SIGN_UP SESSION",req.session.signup)
                                console.log("SIGN_UP DATA  :-",data)
                                //res.redirect(`/stu_reg/reg?_id=${data._id}`)
                                res.redirect('/stu_reg/reg/')
                            })
                        }
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                ERROR: err
            })
            console.log(err)
        })
})


//LOGIN
student.get('/login', (req, res, next) => {
    res.render('Stud_login')
})

student.post('/login', (req, res, next) => {
    Student.find({email:req.body.email})
    .then((doc)=>
    {
        if (doc.length<1)
        {
            console.log("EMAIL_ID NOT FOUND")
        }
        else
        {bcrypt.compare(req.body.password, doc[0].password, (err, result)=> {
                // result == true
                if(result)
                {
                    console.log("yes")
                    var token = jwt.sign({email:doc[0].email,password:doc[0].password }, process.env.JWTKEY, { expiresIn:'1h'});
                    console.log("Login token (stuent) :- ", token)
                    console.log("LOGIN ID (STUDENT)  :-", doc[0]._id)
                    req.session.user_id=doc[0]._id

                   console.log("STUDENT SESSION_ID :-",req.session.user_id=doc[0]._id )
                    //req.session.token=token
                    res.redirect('/dshbrd/')
                   
                    //res.redirect(`/dshbrd?_id=${doc[0]._id}`)
                    //res.render('stu_dash',{name:doc.name})
                }
            });
        }
        
    })
    .catch((err)=>
    {
        console.log(err)
    })   
})

module.exports = student