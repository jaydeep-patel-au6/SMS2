var express=require('express')
var session = require('express-session')
var mongoose = require('mongoose');
var hbs = require('hbs');
var studentRoute=require('./controller/stu_user.js')
var teacherRoute=require('./controller/tech_user.js')
var studRegRoute=require('./controller/stud_reg')
var studDash=require('./controller/stu_dash')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var teacher=require('./controller/teacher_dash')
var auth=require('./middleware/check-auth')

var app=express()


//VIEW ENGINE
app.set('view engine', 'hbs');
app.set('views', 'views');


//SESSION
app.use(session({
    secret: 'keyboard cat',
    name:"sms",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false,maxAge:1000*60*60 }
  }))


//ROUTES
app.use(methodOverride('hemant'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/student',studentRoute)
app.use('/teacher',teacherRoute)
app.use('/stu_reg',studRegRoute)
app.use('/dshbrd',studDash)
app.use('/teacher', teacher)





app.use((req,res,next)=>
{var error=new Error('NOT FOUND')
//error.message('NOT FOUND')
next()
})

app.use((error,req,res,next)=>
{
    res.status(error.status || 500)
    res.json({
        error:{
            message:error.message
        }
    })
})


//DATABASE_CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/SMS', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


//DASHBOARD 
app.get('/',(req,res)=>
{res.render('home')})



//PORT
var port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log("SERVER CONNECTED")
})