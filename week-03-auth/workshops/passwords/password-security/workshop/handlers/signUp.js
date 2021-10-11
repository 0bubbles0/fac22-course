const model = require('../database/db');

//Old:
// const crypto = require('crypto');

//New:
const bcrypt = require('bcryptjs');

function get(request, response) {
	response.send(/*html*/ `
    <h1>Create an account</h1>
    <form action="sign-up" method="POST">
      <label for="email">Email</label>
      <input type="email" id="email" name="email">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button>Sign up</button>
    </form>
  `);
}

// const SALT = 'blkcjd5x6sfs952.';
function post(request, response) {
	console.log(request.body);
	const { email, password } = request.body;
	//Old
	// const hashedPassword = crypto
	// 	.createHash('sha256')
	// 	.update(`${SALT}${password}`)
	// 	.digest('hex');
	//New
	// model
	// 	.createUser({ email, password: hashedPassword })
	// 	.then(() => {
	// 		response.send(`<h1>Welcome ${email}</h1>`);
	// 	})
	// 	.catch(error => {
	// 		console.error(error);
	// 		response.send(`<h1>Something went wrong, sorry</h1>`);
	// 	});

	// New: bcrypt library
	bcrypt
		.hash(password, 10)
		.then(hash => model.createUser({ email, password: hash }))
		.then(() => {
			response.send(`<h1>Thanks for signing up, ${email}</h1>`);
		})
		.catch(error => {
			console.error(error);
			response.send(`<h1>Something went wrong, sorry</h1>`);
		});
}

module.exports = { get, post };
