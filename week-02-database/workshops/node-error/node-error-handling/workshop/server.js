const express = require('express');

const home = require('./routes/home.js');
const tryCatch = require('./routes/tryCatch.js');
const rejection = require('./routes/rejection.js');

const server = express();

server.get('/', home.get);
server.get('/try-catch', tryCatch.get);
server.get('/rejection', rejection.get);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// last resort catcher
process.on('unhandledRejection', error => {
	console.error(error);
	process.exit(1);
	// can restart with Heroku, pm2 systemd
});
