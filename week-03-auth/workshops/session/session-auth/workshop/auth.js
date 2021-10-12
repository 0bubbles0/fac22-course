const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const model = require('./database/model');

const COOKIE_OPTIONS = {
	httpOnly: true,
	maxAge: 600000,
	sameSite: 'strict',
	signed: true,
};

function createUser(email, password, name) {
	// hash password
	// store user in database
	// return user
	return bcrypt
		.hash(password, 10)
		.then(hash => model.createUser(email, hash, name));
}

function verifyUser(email, password) {
	// gets user from DB with email
	// bcrypt.compare passwords
	// if correct: return user ELSE throw error

	return model.getUser(email).then(dbUser => {
		return bcrypt.compare(password, dbUser.password).then(match => {
			if (!match) {
				throw new Error('Oh no, wrong password!');
			} else {
				delete user.password;
				return dbUser;
			}
		});
	});
}

function saveUserSession(user) {
	//generate random session ID with crypto
	const sid = crypto.randomBytes(18).toString('base64');
	// create new Session
	return model.createSession(sid, { user });
}

module.exports = { createUser, verifyUser, saveUserSession, COOKIE_OPTIONS };
