/* eslint-disable no-undef */
const express = require('express')
const { isTokenValid } = require('../Controller/authController')
const { getTaskByid, createTask, updateTask, deleteTask } = require('../Controller/taskController')

const router = express.Router()


router.use(isTokenValid)
router.get('/', getTaskByid)
router.post('/createTask',  createTask)

router.route('/:taskId')
.patch(updateTask)
.delete(deleteTask)


module.exports = router