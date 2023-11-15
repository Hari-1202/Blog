/* eslint-disable no-undef */
const ApplicationError = require('./error')
module.exports =  handleAsyncError = (fn) => {
    return (req, res, next) => {
    fn(req, res, next).catch(err => next(new ApplicationError(`Error occured because of ${err}`, 404  )) )
    }
}
