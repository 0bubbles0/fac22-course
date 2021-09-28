// Create Server
const express = require('express');
const dogs = require('./dogs.js');

const server = express();

// GET
server.get('/', (request, response) => {
	//Search Form
	const searchForm = `<form><input name="search" placeholder="Search a dog"/>
  <button>Search</button></form>`;
	const userInput = request.query.search;
	console.log(userInput);

	// dogs -> list
	const dogList = Object.values(dogs);
	const htmlList = dogList
		.filter(b => b.name.includes(userInput))
		.map(a => `<li>${a.name}</li>`)
		.join('');

	const fullUl = `<ul>${htmlList}</ul>`;

	const html = `${searchForm}${fullUl}`;
	response.send(html);

	// let items = '';
	// for (const thing of Object.values(dogs)) {
	// 	items += `<li>${thing.name}</li>`;
	// }
	// const list = `<ul>${items}</ul>`;
	// response.send(list);
});

// POST: need middleware
server.get('/add-dog', (request, response) => {
	const addForm = `<form><input name="name" placeholder="Dog Name"/><input name="breed" placeholder="Dog Breed"/>
  <button>Add</button></form>`;
	response.send(addForm);
});

// Middleware: post body-parser
const bodyParser = express.urlencoded({ extended: false });

server.post('/add-dog', bodyParser, (request, response) => {
	// console.log('New user post');

	// Make new dog
	const answer = request.body;
	const dogName = answer.name.toLowerCase();
	// const dogBreed = answer.breed;
	// const newDetails = { name: dogName, breed: dogBreed };
	// dogs[dogName] = newDetails;
	dogs[dogName] = answer;
	// luna: { name: "Luna", breed: "Cocker Spaniel" },

	// Redirect
	response.redirect('/');
	// response.send('Yay, thanks for submitting');
});

// Delete dog

// Create Server Port
const PORT = 3333;
server.listen(PORT, () =>
	console.log(`Yay! Listening on http://localhost:${PORT}`)
);
