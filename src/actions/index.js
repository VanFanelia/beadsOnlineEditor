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
