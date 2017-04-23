import { defaultBead } from '../utils/beadColors';

export const defaultCanvasState = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	currentCanvasPictureData: { pixels: [] },
	currentCanvasName: 'Untitled',
	currentCanvasMode: 'init',
	currentCanvasBead: defaultBead,
	zoom: 100,
};

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


const canvas = (state = defaultCanvasState, action) => {
	switch (action.type) {
	case 'CREATE_NEW_BEADS_CANVAS':
		return Object.assign({}, state, {
			tabletSizeX: defaultCanvasState.tabletSizeX,
			tabletSizeY: defaultCanvasState.tabletSizeY,
			currentCanvasPictureData: defaultCanvasState.currentCanvasPictureData,
			currentCanvasName: defaultCanvasState.currentCanvasName,
			currentCanvasMode: 'editor',
			currentCanvasBead: defaultCanvasState.currentCanvasBead,
		});

	case 'CREATE_CHOOSE_PICTURE_DIALOG':
		return Object.assign({}, state, {
			currentCanvasMode: 'choosePicture',
		});

	case 'CHANGE_CANVAS_NAME':
		return Object.assign({}, state, {
			currentCanvasName: action.currentCanvasName,
		});

	case 'SET_CURRENT_CANVAS_BEAD':
		return Object.assign({}, state, {
			currentCanvasBead: action.currentCanvasBead,
		});

	case 'CHANGE_TABLET_SIZE':
		return Object.assign({}, state, {
			tabletSizeX: action.tabletSizeX,
			tabletSizeY: action.tabletSizeY,
		});

	case 'CHANGE_ZOOM':
		return Object.assign({}, state, {
			zoom: action.zoom,
		});

	case 'SET_BEAD': {
		let data = state.currentCanvasPictureData.pixels;
		const index = data.findIndex(element => (
			element.x === action.x && element.y === action.y
		));
		if (index > -1) {
			data = [...data];
			data[index] = { x: action.x, y: action.y, beadId: action.beadId };
		} else {
			data = [...data, { x: action.x, y: action.y, beadId: action.beadId }];
		}

		return Object.assign({}, state, {
			currentCanvasPictureData: { pixels: data },
		});
	}

	default:
		return state;
	}
};

export default canvas;
