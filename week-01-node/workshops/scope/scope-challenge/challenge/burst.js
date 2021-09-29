let mousedown = false;

// if (randomRange) {		}
document.addEventListener('mousedown', event => {
	const { clientX, clientY } = event;
	mousedown = true;

	function createBurst(x, y) {
		const el = document.createElement('div');
		el.classList.add('burst');

		const getRandomHue = randomRange(0, 360);

		const hue = getRandomHue();
		el.style.setProperty('--hue', hue);

		const top = x - 4;
		const left = y - 4;
		el.style.setProperty('top', top + 'px');
		el.style.setProperty('left', left + 'px');

		let size = 1;
		function grow() {
			size += 1;
			el.style.setProperty('transform', `scale(${size})`);
			if (mousedown) {
				requestAnimationFrame(grow);
			}
		}

		requestAnimationFrame(grow);
		return el;
	}

	const burst = createBurst(clientX, clientY);
	document.body.appendChild(burst);
});

document.addEventListener('mouseup', event => {
	mousedown = false;
});
