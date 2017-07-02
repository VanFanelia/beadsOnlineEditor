const gridSize = {
	xs: 13,
	s: 26,
	m: 39,
	l: 52,
	xl: 78,
	xxl: 104,
	xxxl: 130,
};

export const textRatioLineHeight = (size) => {
	if (size in gridSize) {
		return `${gridSize[size]}px`;
	}

	// eslint-disable-next-line no-console
	console.error('ERROR - grid size not found!');
	return '';
};

export const textRatioFontSize = (size) => {
	if (size in gridSize) {
		return `${gridSize[size] * (1 / 1.444444)}px`;
	}

	// eslint-disable-next-line no-console
	console.error('ERROR - grid size not found!');
	return '';
};

export const headlineRatioLineHeight = (size) => {
	if (size in gridSize) {
		return `${gridSize[size]}px`;
	}

	// eslint-disable-next-line no-console
	console.error('ERROR - grid size not found!');
	return '';
};

export const headlineRatioFontSize = (size) => {
	if (size in gridSize) {
		return `${gridSize[size]}px`;
	}

	// eslint-disable-next-line no-console
	console.error('ERROR - grid size not found!');
	return '';
};
