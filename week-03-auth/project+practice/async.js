function wait(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getUser() {
	return wait(1000).then(() => ({ id: 1, name: 'oli' }));
}

function verify(user) {
	return wait(1000).then(() => {
		throw new Error('Uh oh');
	});
}

async function run() {
	const user = await getUser();
	const match = await verify(user);
}

run().then(console.log).catch(console.error);
// error happens after 1sec, but catch never happens
