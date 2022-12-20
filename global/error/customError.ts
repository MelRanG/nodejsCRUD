class CustomError extends Error {
	constructor(message:any) {
		super(message)
	}
}
module.exports = CustomError