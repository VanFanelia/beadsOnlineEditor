import { defaultBead } from '../utils/beadColors';

const CHANGE_TABLET_SIZE = 'CHANGE_TABLET_SIZE';
const CHANGE_ZOOM = 'CHANGE_ZOOM';
const SET_BEAD = 'SET_BEAD';
const SET_CURRENT_CANVAS_BEAD = 'SET_CURRENT_CANVAS_BEAD';

const SET_MODE = 'SET_MODE';

/** *******************
 * Default State
 ***********************/
export const defaultCanvasState = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	currentCanvasPictureData: { pixels: [] },
	currentCanvasName: 'Untitled',
	currentCanvasBead: defaultBead,
	zoom: 100,
};

/** *******************
 * Actions
 ***********************/

export const changeTabletSize = (x, y) => ({
	type: CHANGE_TABLET_SIZE,
	tabletSizeX: x,
	tabletSizeY: y,
});

export const changeZoom = z => ({
	type: CHANGE_ZOOM,
	zoom: z,
});

export const setBead = (x, y, beadId) => ({
	type: SET_BEAD,
	x,
	y,
	beadId,
});

export const setCurrentCanvasBead = beadId => ({
	type: SET_CURRENT_CANVAS_BEAD,
	currentCanvasBead: beadId,
});


/** *******************
 * Reducer
 ***********************/
const canvas = (state = defaultCanvasState, action) => {
	switch (action.type) {
	case SET_MODE:
		return Object.assign({}, state, {
			tabletSizeX: defaultCanvasState.tabletSizeX,
			tabletSizeY: defaultCanvasState.tabletSizeY,
			currentCanvasPictureData: defaultCanvasState.currentCanvasPictureData,
			currentCanvasName: defaultCanvasState.currentCanvasName,
			currentCanvasBead: defaultCanvasState.currentCanvasBead,
		});

	case SET_CURRENT_CANVAS_BEAD:
		return Object.assign({}, state, {
			currentCanvasBead: action.currentCanvasBead,
		});

	case CHANGE_TABLET_SIZE:
		return Object.assign({}, state, {
			tabletSizeX: action.tabletSizeX,
			tabletSizeY: action.tabletSizeY,
		});

	case CHANGE_ZOOM:
		return Object.assign({}, state, {
			zoom: action.zoom,
		});

	case SET_BEAD: {
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
