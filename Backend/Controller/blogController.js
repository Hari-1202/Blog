const asyncErrorHandler = require("../utils/asyncErrorHandler");
const blog = require('../Model/blogModel')

const getAllBlogs = asyncErrorHandler(async (req,res,next) => {
    try {
        const response = await blog
            .find({})
            .populate({
                path: 'userData',
                select: 'name -_id'
            })

        res.status(200).json({status: 'Success', response})
    } catch(err){
        res.status(400).json({status: 'Error', message: `Error occured : ${err}`})
    }
})

const getUserBlog = asyncErrorHandler(async (req,res,next) => {
    try {
        const response = await blog.find({userId: req.currentUser.id}).select("title description content")
        res.status(200).json({status: 'Success', response})
    } catch(err){
        res.status(400).json({status: 'Error', message: `Error occured : ${err}`})
    }
})

const postUserBlog = asyncErrorHandler(async (req,res,next) => {
    try {
        const reqBody = {
            ...req.body,
            userId: req.currentUser.id
        }
        const doestTitleExistforUser = await blog.findOne({userId: req.currentUser.id, title: req.body.title})
        console.log(doestTitleExistforUser, reqBody, !doestTitleExistforUser)
        if(!doestTitleExistforUser) {
        const response = await blog.create(reqBody)
        res.status(200).json({status: 'Success', response})
        } else {
            return res.status(400).json({status: 'Error', message: `Error occured : blog with this title already exists `})
        }
    } catch(err){
        res.status(400).json({status: 'Error', message: `Error occured : ${err}`})
    }
})

const updateUserBlog = asyncErrorHandler(async (req,res,next) => {
    console.log(req.currentUser.id, req.body)
    try {
        const response = await blog.updateOne({userId: req.currentUser.id}, req.body, {
            new: true
        })
        res.status(200).json({status: 'Success', response})
    } catch(err){
        res.status(400).json({status: 'Error', message: `Error occured : ${err}`})
    }
})

const deleteUserBlog = asyncErrorHandler(async (req,res,next) => {
    console.log(req.body)
    try {
        await blog.deleteOne({title: req.body.title})
        res.status(200).json({status: 'Success'})
    } catch(err){
        res.status(400).json({status: 'Error', message: `Error occured : ${err}`})
    }
})


module.exports = {
    getAllBlogs,
    getUserBlog,
    postUserBlog,
    updateUserBlog,
    deleteUserBlog
}