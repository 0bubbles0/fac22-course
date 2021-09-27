// Create a Server
const express = require('express');

const server = express();

//Middleware
const staticHandler = express.static('public');

server.use(staticHandler);

// Add a Route: function done when server receives any request (/ is home)
// server.get('/', (request, response) => {
// 	response.status(200);
// 	// set headers
// 	response.set('funny-header', 'hihi');
// 	response.set({
// 		'not-funny-header': 'oh no',
// 		'joke-header': 'haha',
// 	});
// 	// send message
// 	// response.send('Hello. Great!');
// 	const add = 4 + 1;
// 	const time = new Date().toLocaleTimeString();
// 	response.send(`<h1>Hello</h1><p>Great ${add} and ${time}!</p>`);
// });

// //localhost:3000/json
// server.get('/json', (request, response) => {
// 	response.send({ message: 'Wake up!', user: 'Bubbles' });
// });

// //localhost:3000/redirects
// server.get('/redirects', (request, response) => {
// 	response.redirect('/');
// });

// // dynamic paths, eg http://localhost:3000/users/Penny
// server.get('/users/:name', (request, response) => {
// 	const name = request.params.name;
// 	response.send(`<h1>Hello ${name}</h1>`);
// });
// // server.get('/:name', (request, response) => {
// // 	const name = request.params.name;
// // 	response.send(`<h1>Hello ${name}</h1>`);
// // });

// // Error handling
// server.use((request, response) => {
// 	response.status(404).send('<h1>Disappointing!</h1>');
// });

// // Next, Middleware needs to be at top of file
// server.get('/', (request, response, next) => {
// 	console.log(request.method + ' ' + request.url);
// 	next();
// });

// server.get('/', (request, response) => {
// 	response.send('<h1>Hello</h1>');
// });

// function logger(request, response, next) {
// 	console.log(request.method + ' method is from url ' + request.url);
// 	next();
// }

// server.get('/', logger, (request, response) => {
// 	response.send('<h1>Hello</h1>');
// });

// Start the Server: connect to internet, have port listen to incoming HTTP request
const PORT = 3000;

server.listen(PORT, () =>
	console.log(`Yuhu! Listening on http://localhost:${PORT}`)
);
// Terminal: $ node server.js --> now can see http://localhost:3000 in Browser --> hello
// Stop Node --> Terminal: Strg C

// Send requests: 3000

// Response: response.status(404)

// Some static files in public folder --> CSS, HTML, img

// Post: deal with form submission
server.post('/submit', (request, response) => {
	console.log('posted');
	response.send('Yay, thanks for submitting');
});
