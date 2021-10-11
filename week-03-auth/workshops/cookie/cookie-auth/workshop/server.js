const express = require('express');
const server = express();

//Middleware to read cookies
const cookieParser = require('cookie-parser');
server.use(cookieParser('alongrandomstringnobodyelseknows'));

// Crypto helper. Remember sessions
const crypto = require('crypto');
let sessions = {};

server.get('/', (request, response) => {
	//Old
	// const cookies = request.get('cookie');
	// console.log(request.cookies);
	// Stateless:

	// server-side crypto sid
	console.log(request.signedCookies);
	const sid = request.signedCookies.sid;
	console.log(sid);
	if (sid) {
		const userInfo = sessions[sid];
		console.log(userInfo);
		response.send(`<h1>Hello Yuhuu, ${userInfo.username}</h1>`);
	} else {
		response.send(`<h1>You're logged out</h1>`);
	}
});

// no Express
// server.get('/example', (request, response) => {
// 	response.set(
// 		'set-cookie',
// 		'hello=this is my cookie. Yum; HttpOnly; Max-Age=60; SameSite=Lax'
// 	);
// 	response.redirect('/');
// });

// with Express helper
server.get('/example', (request, response) => {
	// Old
	// response.cookie('hello', 'this is my cookie. Yummy', {
	// 	httpOnly: true,
	// 	maxAge: 1000 * 60, // 60,000ms (60s)
	// 	sameSite: 'lax',
	// });
	// response.redirect('/');
	// Stateless:
	// response.cookie('hello', 'this is my cookie. Yummy', { signed: true });
	// response.redirect('/');
});

server.get('/remove', (request, response) => {
	//would work without middleware
	// response.clearCookie('hello');
	// response.redirect('/');
});

//stateless
// server.get('/login', (request, response) => {
// 	const sid = crypto.randomBytes(18).toString('base64');
// 	const userInfo = {
// 		id: 1,
// 		username: 'bubbles',
// 		admin: true,
// 	};
// 	response.cookie('login-cookie', userInfo, {
// 		httpOnly: true,
// 		maxAge: 1000 * 60, // 60,000ms (60s)
// 		sameSite: 'lax',
// 		signed: true,
// 	});
// 	response.redirect('/');
// });

// server.get('/logout', (request, response) => {
// 	response.clearCookie('login-cookie');
// 	response.redirect('/');
// });

// Server-side
server.get('/login', (request, response) => {
	const sid = crypto.randomBytes(18).toString('base64');
	sessions[sid] = {
		id: 1,
		username: 'bubbles',
		admin: true,
	};

	response.cookie('sid', sid, {
		httpOnly: true,
		maxAge: 1000 * 60, // 60,000ms (60s)
		sameSite: 'lax',
		signed: true,
	});
	response.redirect('/');
});

server.get('/logout', (request, response) => {
	const sid = request.signedCookies.sid;
	response.clearCookie('sid');
	delete sessions.sid;
	response.redirect('/');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
