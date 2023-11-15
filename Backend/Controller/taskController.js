
/* eslint-disable no-undef */
const taskModel = require("../Model/taskModel")
const asyncErrorHandler = require("../utils/asyncErrorHandler")
const ApplicationError = require("../utils/error")
const getTaskByid = asyncErrorHandler(async (req, res, next) => {
    try {
        const result = await taskModel.find({ userId: req.currentUser.id })
        if (result) {
            res.status(200).json({
                status: 'Success',
                data: result
            })
        }
    } catch (err) {
      next(new ApplicationError(`An error occured " ${err}`, 400))
    }
})

const createTask = asyncErrorHandler(async (req, res, next) => {
    try {
        const createBody = {
            ...req.body,
            userId: req.currentUser.id
        }
        const response = await taskModel.create(createBody)
        res.status(200).json({
            status: 'Success',
            response
        })
    } catch (err) {
       next(new ApplicationError(`An error occured " ${err}`, 400))
    }
})

const updateTask = asyncErrorHandler(async (req, res, next) => {
    try {
        console.log(req.params.taskId,  req.body)
        const response = await taskModel.findByIdAndUpdate(req.params.taskId,  req.body, {
            new: true
        })
        res.status(200).json({
            status: 'Success',
            response
        })
    } catch (err) {
       next(new ApplicationError(`An error occured " ${err}`, 400))
    }
})

const deleteTask = asyncErrorHandler(async (req, res, next) => {
    try {
        await taskModel.findByIdAndDelete(req.params.taskId)
        res.status(200).json({
            status: 'Successfully deleted the task',
        })
    } catch (err) {
       next(new ApplicationError(`An error occured " ${err}`, 400))
    }
})

module.exports = {
    getTaskByid,
    createTask,
    updateTask,
    deleteTask
}