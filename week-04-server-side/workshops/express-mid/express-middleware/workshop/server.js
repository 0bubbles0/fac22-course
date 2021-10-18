const crypto = require('crypto');
const express = require('express');
const cookieParser = require('cookie-parser');
const { request } = require('http');
const { response } = require('express');

const PORT = process.env.PORT || 3000;

// this should normally be hidden in a env var
const SECRET = 'nkA$SD89&&282hd';

const server = express();

server.use(cookieParser(SECRET));
server.use(express.urlencoded({ extended: false }));

// this should really be in a database
let { sessions } = require('./sessions');
// let sessions = {};

// Import middleware
const { getSession } = require('./middleware/get-session');
const { checkAuth } = require('./middleware/check-auth');
const { handleErrors } = require('./middleware/handle-errors');

// Middleware:   SESSION
server.use(getSession);
// server.use((req, res, next) => {
// 	// console.log(req);
// 	const sid = req.signedCookies.sid;
// 	const sessionInfo = sessions[sid];
// 	if (sessionInfo) {
// 		req.session = sessionInfo;
// 		console.log(req.session);
// 	}
// 	next();
// });

// Middleware: NO SESSION ERROR
// function checkAuth(req, res, next) {
// 	const user = req.session;
// 	if (!user) {
// 		res
// 			.status(401)
// 			.send(
// 				/*html*/ `<h1>Sorry, please log in</h1><a href="/log-in">Log in</a>`
// 			);
// 	} else {
// 		next();
// 	}
// }

server.get('/', (req, res) => {
	// const sid = req.signedCookies.sid;
	// const user = sessions[sid];
	const user = req.session;
	if (user) {
		res.send(`
      <h1>Hello ${user.email}</h1>
      <form method="post" action="/log-out">
        <button>Log out</button>
      </form>
    `);
	} else {
		// no point keeping cookie if it doesn't match any saved sessions
		res.clearCookie('sid');
		res.send(`<h1>Hello world</h1><a href="/log-in">Log in</a>`);
	}
});

server.get('/log-in', (req, res) => {
	res.send(`
    <h1>Log in</h1>
    <form action="/log-in" method="POST">
      <label for="email">Email</email>
      <input type="email" id="email" name="email">
    </form>
  `);
});

server.post('/log-in', (req, res) => {
	const newUser = req.body;
	const sid = crypto.randomBytes(18).toString('base64');
	res.cookie('sid', sid, {
		signed: true,
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 600000,
	});
	sessions[sid] = newUser;
	res.redirect('/profile');
});

server.post('/log-out', (req, res) => {
	const sid = req.signedCookies.sid;
	delete sessions[sid];
	res.clearCookie('sid');
	res.redirect('/');
});

server.get('/profile', checkAuth, (req, res) => {
	// const sid = req.signedCookies.sid;
	// const user = sessions[sid];
	// if (!user) {
	// 	res
	// 		.status(401)
	// 		.send(
	// 			/*html*/ `<h1>Sorry, please log in</h1><a href="/log-in">Log in</a>`
	// 		);
	// } else {
	// 	res.send(`<h1>Hello ${user.email}</h1>`);
	// }
	const user = req.session;
	res.send(`<h1>Hello ${user.email}</h1>`);
});

server.get('/profile/settings', checkAuth, (req, res) => {
	// const sid = req.signedCookies.sid;
	// const user = sessions[sid];
	const user = req.session;
	res.send(`<h1>Settings for ${user.email}</h1>`);
});

server.get('/error', (req, res, next) => {
	const fakeError = new Error('uh oh');
	// fakeError.status = 400;
	fakeError.status = 403;
	next(fakeError);
	// next(handleErrors);
});

// Middleware: Error handling
// function handleErrors(error, req, res, next) {
// 	console.error(error);
// 	const myStatus = error.status || 500;
// 	res.status(myStatus).send(`<h1>Oooops</h1>`);
// }

server.use(handleErrors);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
