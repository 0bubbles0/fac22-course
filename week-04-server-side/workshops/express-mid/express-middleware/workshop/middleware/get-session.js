let { sessions } = require('../sessions');

// Middleware:   SESSION
function getSession(req, res, next) {
	// console.log(req);
	const sid = req.signedCookies.sid;
	const sessionInfo = sessions[sid];
	if (sessionInfo) {
		req.session = sessionInfo;
		console.log(req.session);
	}
	next();
}

module.exports = { getSession };
