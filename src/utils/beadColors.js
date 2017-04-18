const blankColor = { color: '#eeeeee00' };

export const defaultBead = 'H01';

const beadList = {
	H01: { color: '#000000' },
	H02: { color: '#ffffff' },
	H03: { color: '#ff0000' },
};

const getBeadIdData = (beadId) => {
	if (beadId in beadList) {
		return beadList[beadId];
	}

	console.error('BeadId not found in bead list!');
	return blankColor;
};

export default getBeadIdData;
