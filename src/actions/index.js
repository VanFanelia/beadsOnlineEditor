export const createNewBeadsCanvas = () => ({
	type: 'CREATE_NEW_BEADS_CANVAS',
});

export const createChoosePictureDialog = () => ({
	type: 'CREATE_CHOOSE_PICTURE_DIALOG',
});

export const changeTabletSize = (x, y) => ({
	type: 'CHANGE_TABLET_SIZE',
	tabletSizeX: x,
	tabletSizeY: y,
});

export const changeZoom = z => ({
	type: 'CHANGE_ZOOM',
	zoom: z,
});

export const setBead = (x, y, beadId) => ({
	type: 'SET_BEAD',
	x,
	y,
	beadId,
});

export const setCurrentCanvasBead = beadId => ({
	type: 'SET_CURRENT_CANVAS_BEAD',
	currentCanvasBead: beadId,
});
