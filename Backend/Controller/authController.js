/* eslint-disable no-undef */
const userModel = require('../Model/userModel')
const jwt = require('jsonwebtoken');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const ApplicationError = require('../utils/error');

const generateToken = (id) => {
    return jwt.sign({
        id
    }, 'secret', { expiresIn: '1h' });
}


const isTokenValid = asyncErrorHandler(async (req, res, next) => {
    try {
        const token = req.cookies.JWT || req.headers.authtoken
        const isValidToken = jwt.verify(token, 'secret')
        const user = await userModel.findOne({ _id: isValidToken.id })
        if (!user) {
            return res.status(400).json({ message: 'user doesnt exist' })
        }

        if (Math.floor(Date.now() / 1000) > isValidToken.exp) {
            return res.status(400).json({ message: 'session expired . Please login again' })
        }

        req.currentUser = user
        next()
    } catch (err) {
        next(new ApplicationError(`An error occured " ${err}`, 400))
    }

})



const login = asyncErrorHandler(async (req, res, next) => {
    try {
        const cookieOptions = {
            expires: new Date(Date.now() +15 * 60 * 1000),
            httpOnly: true
        }
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({
                status: 'Error',
                message: 'Please enter registered email id'
            })
        }
        const checkPasswordMatch = await user.checkPasswordMatch(req.body.password, user.password)
        if (checkPasswordMatch) {
            //Generate JWT token
            const jwtToken = generateToken(user._id)
            res.cookie('JWT', jwtToken, cookieOptions)
            res.status(200).json({
                status: 'Success',
                token: jwtToken,
                expiresIn: cookieOptions.expires
            })

        } else {
            res.status(200).json({
                status: 'errror',
                message: 'Please enter correctrt password'
            })
        }
    } catch (err) {
        next(new ApplicationError(`An error occured " ${err}`, 400))
    }

})


const signup = asyncErrorHandler(async (req, res, next) => {
    try {
        const data = await userModel.create(req.body)
        res.status(200).json({
            status: 'Success',
            data
        })
    } catch (err) {
        next(new ApplicationError(`An error occured " ${err}`, 400))
    }
})


module.exports = {
    generateToken,
    isTokenValid,
    login,
    signup
}