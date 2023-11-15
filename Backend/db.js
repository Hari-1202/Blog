/* eslint-disable no-undef */
const mongoose = require('mongoose')

const establishDatabaseConnection = () => {
    let uri =
        `mongodb+srv://root:cD1oXK33kxJdQKYs@cluster0.cusuuoc.mongodb.net/?retryWrites=true&w=majority`;
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'Tasks' 
    }).then(() => {
        console.log('Connected to mongodb')
    })
    }
    
module.exports = establishDatabaseConnection