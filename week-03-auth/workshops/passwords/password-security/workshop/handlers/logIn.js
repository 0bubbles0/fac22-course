const model = require('../database/db');

// Old:
// const crypto = require('crypto');

// New:
const bcrypt = require('bcryptjs');

function get(request, response) {
	response.send(/*html*/ `
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Log in</button>
    </form>
  `);
}

const SALT = 'blkcjd5x6sfs952.';
function post(request, response) {
	const { email, password } = request.body;
	//Old
	// model
	// .getUser(email)
	// .then(dbUser => {
	// 	const hashedPass = crypto
	// 		.createHash('sha256')
	// 		.update(`${SALT}${password}`)
	// 		.digest('hex');
	// 	if (dbUser.password !== hashedPass) {
	// 		throw new Error('Password mismatch');
	// 	} else {
	// 		response.send(`<h1>Welcome back, ${email}</h1>`);
	// 	}
	// })
	//New
	model
		.getUser(email)
		.then(dbUser => bcrypt.compare(password, dbUser.password))
		.then(match => {
			if (!match) throw new Error('Password mismatch');
			response.send(`<h1>Welcome back, ${email}</h1>`);
		})
		.catch(error => {
			console.error(error);
			response.send(`<h1>User not found</h1>`);
		});
}

module.exports = { get, post };
