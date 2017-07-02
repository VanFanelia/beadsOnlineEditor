const gridSize = {
	xxs: '6.5',
	xs: '13',
	s: '26',
	m: '39',
	l: '52',
	xl: '78',
	xxl: '104',
	xxxl: '130',
};

const grid = (size, printPixel = true) => {
	if (size in gridSize) {
		return `${gridSize[size]}${printPixel ? 'px' : ''}`;
	}

	if (size.indexOf('+') > 0) {
		const splitted = size.split('+');
		let sum = 0;
		splitted.forEach((s) => {
			sum += Number.parseInt(grid(s.trim(), false), 10);
		});
		return `${sum}${printPixel ? 'px' : ''}`;
	}

	// eslint-disable-next-line no-console
	console.error('ERROR - grid size not found!');
	return '';
};

export default grid;
