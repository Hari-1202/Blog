/* eslint-disable no-undef */
const  mongoose  = require("mongoose");
const bcrypt = require('bcrypt');
const authSchema  = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword : {
        type: String,
        validate : {
            validator : function(val){
                return val === this.password
            },
            message: "Passwords do not match"
        }
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    changedPasswordAt: Date,
}, {
    collection :  'User',
    toJSON: { virtuals: true }, toObject: { virtuals: true }
})

authSchema.methods.checkPasswordMatch = async function(enteredPwd, hashedPwd){
   return await bcrypt.compare(enteredPwd, hashedPwd)
}

authSchema.methods.checkPasswordHasChanged = async function(tokenIssuedTime){
    if(this.changedPasswordAt) {
       return tokenIssuedTime > changedPasswordAt
    }
    next()
}

authSchema.virtual('userTasks', {
    ref: 'Tasks',
    foreignField: 'userId',
    localField: '_id'
})

authSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmPassword = undefined
    next()
})

const userModel = mongoose.model('Authentictaor', authSchema)


module.exports = userModel