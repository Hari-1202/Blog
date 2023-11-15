/* eslint-disable no-undef */
module.exports  = (err, req, res) => {
    res.status(err.statusCode).json({ statusCode: err.statusCode, status: err.status, message: err.message, stack: err.stack })
}

