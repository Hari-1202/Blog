/* eslint-disable no-undef */
const express = require('express')
const authRouter = require('./Routes/authenticator')
const taskRouter = require('./Routes/tasks')
const userRouter = require('./Routes/users')
const blogRouter = require('./Routes/blogs')
const cookieParser = require('cookie-parser')
const establishDatabaseConnection = require('./db')
const errorHandler = require('./Controller/errorController')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cookieParser())

var whitelist = ['http://localhost:8000', 'http://localhost:3000']
// var whitelist = []
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))


establishDatabaseConnection()
//Tasks
//Set up an authenticator


const baseApiVersion = '/api/v1/'


app.use(baseApiVersion , authRouter)
app.use(baseApiVersion + 'tasks', taskRouter)
app.use(baseApiVersion + 'users', userRouter)
app.use(baseApiVersion + 'blog', blogRouter )
app.use(errorHandler)

app.listen('8000', () => {
    console.log("Server succesfully started on http://localhost:8000")
})


