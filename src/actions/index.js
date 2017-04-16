import { defaultCanvasState } from '../reducers/canvas';

export const createNewBeadsCanvas = () => ({
	type: 'CREATE_NEW_BEADS_CANVAS',
	tabletSizeX: defaultCanvasState.tabletSizeX,
	tabletSizeY: defaultCanvasState.tabletSizeY,
	currentCanvasPictureData: defaultCanvasState.currentCanvasPictureData,
	currentCanvasName: defaultCanvasState.currentCanvasName,
	currentCanvasMode: defaultCanvasState.currentCanvasMode,
});

export const changeCanvasName = name => ({
	type: 'CHANGE_CANVAS_NAME',
	currentCanvasName: name,
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

