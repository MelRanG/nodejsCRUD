import {Request, Response, NextFunction } from "express"

const StatusCode = require('./statusCode')

const ErrorHandlerMiddleware = (err:any, req:Request, res:Response, next:NextFunction) => {
	let error = {
		statusCode: err.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
		message: err.message || "Internal server error",
	}
    console.log("에러핸들러 실행")
	return res.status(error.statusCode).json({ message: error.message })
}

module.exports = ErrorHandlerMiddleware