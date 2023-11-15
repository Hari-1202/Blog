/* eslint-disable no-undef */
class ApplicationError extends Error {
    constructor(message, statusCode){
        super(message)
        this.message = message
        this.statusCode = statusCode
        this.status = 'Fail'
        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ApplicationError