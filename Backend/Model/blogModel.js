const mongoose = require("mongoose");
const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    content: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    collection: 'blog',
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    version: false
})


blogSchema.set('toJSON', {
    virtuals: true,
    transform: (doc, ret, next) => {
       delete ret.id
       delete ret._id
       delete ret.__v
       ret.userData && delete ret.userData.id
    }
});

blogSchema.virtual('userData' , {
    ref : 'Authentictaor',
    foreignField: '_id',
    localField: 'userId',
    justOne: true,
})


module.exports = mongoose.model('blog', blogSchema)