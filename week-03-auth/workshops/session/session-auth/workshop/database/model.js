const db = require('./connection.js');

function createUser(email, hash, name) {
	const INSERT_USER = `
    INSERT INTO users (email, password, name) VALUES ($1, $2, $3)
    RETURNING id, email, name
  `;
	return db
		.query(INSERT_USER, [email, hash, name])
		.then(result => result.rows[0]);
}

function createSession(sid, datObj) {
	const INSERT_SESSION = /*sql*/ `
    INSERT INTO sessions
    (sid, data)
    VALUES ($1, $2) 
    RETURNING sid
  `;
	return db
		.query(INSERT_SESSION, [sid, datObj])
		.then(result => console.log(result.rows[0].sid));
}

function getUser(email) {
	const SELECT_USER = `
  SELECT id, email, password, name FROM users WHERE email=$1
  `;
	return db.query(SELECT_USER, [email]).then(result => result.rows[0]);
}

function getSession(sid) {
	const SELECT_SESSION = 'SELECT data FROM sessions WHERE sid=$1';
	return db.query(SELECT_SESSION, [sid]).then(result => {
		const singleResult = result.rows[0];
		return singleResult && singleResult.data;
	});
}

module.exports = {
	createUser,
	getUser,
	createSession,
	getSession,
};
