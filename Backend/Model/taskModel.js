/* eslint-disable no-undef */
const mongoose = require("mongoose");
const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description : {
        type: String
    },
    userId: {
        type: String
    }
}, {
    collection: 'Tasks'
})



const taskModel = mongoose.model('Tasks', taskSchema)


module.exports = taskModel