const CustomError = require('./customError')
const { STATUS_CODE } = require('./statusCode')

export class BadRequestError extends CustomError {
    constructor(message:any) {
        super(message)
		this.statusCode = STATUS_CODE.BAD_REQUEST
	}
}