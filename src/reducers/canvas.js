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
