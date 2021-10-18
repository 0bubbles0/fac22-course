// Standard error messages
const { STATUS_CODES } = require('http');

// Check if in production

// Middleware: Error handling
function handleErrors(error, req, res, next) {
	console.error(error);
	const myStatus = error.status || 500;
	res.status(myStatus);
	// if production: standard HTTP message
	const productionStatus = process.env.NODE_ENV;
	if (productionStatus == 'production') {
		res.send(`${STATUS_CODES[myStatus]}`);
	} else {
		res.send(`<pre>${error.stack}</pre>`);
	}
	//otherwise
}

module.exports = { handleErrors };
