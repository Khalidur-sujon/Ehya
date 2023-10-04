const errorResponserHandler = (err, req, res, next) => {
	const statusCode = err.statusCode || 400;

	res.status(statusCode).json({
		message: err.message,
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

//inavalid path error handler
const invalidPathHandler = (req, res, next) => {
	let error = new Error("Invalid Path");
	error.statusCode = 404;
	next(error);
};

//export
module.exports = {
	errorResponserHandler,
	invalidPathHandler,
};
