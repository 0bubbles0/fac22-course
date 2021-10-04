// Import database connection
const db = require('../database/connection.js');

function get(request, response) {
	// send SQL command to db. Promise waits for its return
	db.query('SELECT * FROM users').then(result => {
		// console.log(result);
		const users = result.rows;
		const userList = users.map(user => `<li>${user.username}</li>`).join('');
		response.send(`<ul>${userList}</ul>`);
	});
	// response.send(`<h1>Hello world</h1>`);
}

module.exports = { get };
