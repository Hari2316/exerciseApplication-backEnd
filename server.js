require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

//const path = require('path')

//express app
const app = express()


//middleware  
app.use(express.json())

//requests being made by the user 
app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})


//react build
//app.use(express.static(path.join(__dirname + "/public")))

//routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listening for requests
         app.listen(process.env.PORT,()=>{
             console.log('Connected to the DB & Listening on port',process.env.PORT)
         })
    })
    .catch((error) => {
       console.log(error)
    })


