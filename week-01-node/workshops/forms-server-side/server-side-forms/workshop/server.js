const express = require('express');
const dogs = require('./dogs.js');

const server = express();

const PORT = 3333;
server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// Server setup
server.get('/', (request, response) => {
	//Search Form
	const searchForm = `<form><input name="search" />
  <button>Submit</button></form>`;
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
