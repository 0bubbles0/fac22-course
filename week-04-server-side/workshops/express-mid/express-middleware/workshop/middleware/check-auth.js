// Middleware: NO SESSION ERROR
function checkAuth(req, res, next) {
	const user = req.session;
	if (!user) {
		res
			.status(401)
			.send(
				/*html*/ `<h1>Sorry, please log in</h1><a href="/log-in">Log in</a>`
			);
	} else {
		next();
	}
}

module.exports = { checkAuth };
