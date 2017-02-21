const defaultCanvasPictureData = {};
const defaultCanvasName = 'Untitled';

export const createNew = (tabletSizeX, tabletSizeY) => ({
	type: 'CREATE_NEW_BEADS_CANVAS',
	tabletSizeX,
	tabletSizeY,
	currentCanvasPictureData: defaultCanvasPictureData,
	currentCanvasName: defaultCanvasName,
});

export const changeCanvasName = name => ({
	type: 'CHANGE_CANVAS_NAME',
	currentCanvasName: name,
});
