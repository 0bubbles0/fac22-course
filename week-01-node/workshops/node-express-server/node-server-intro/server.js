// Create a Server
const express = require('express');

const server = express();

// Add a Route: function done when server receives a request. / is home
server.get('/', (request, response) => {
	response.send('hello');
});
