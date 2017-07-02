import Jimp from 'jimp';
import { defaultBead, getBeadByColor, NO_BEAD } from '../utils/beadColors';

const CHANGE_TABLET_SIZE = 'CHANGE_TABLET_SIZE';
const CHANGE_ZOOM = 'CHANGE_ZOOM';
const SET_BEAD = 'SET_BEAD';
const SET_CURRENT_CANVAS_BEAD = 'SET_CURRENT_CANVAS_BEAD';
const SET_CURRENT_CANVAS_IMAGE = 'SET_CURRENT_CANVAS_IMAGE';

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

export const transferPreviewImageInToEditor = (image, tabletSizeX, tabletSizeY) => ({
	type: SET_CURRENT_CANVAS_IMAGE,
	image,
	tabletSizeX,
	tabletSizeY,
});

/** *******************
 * Reducer
 ***********************/
const canvas = (state = defaultCanvasState, action) => {
	switch (action.type) {

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
		if (action.beadId === NO_BEAD) {
			if (index > -1) {
				data.splice(index, 1);
			}
		} else if (index > -1) {
			data = [...data];
			data[index] = { x: action.x, y: action.y, beadId: action.beadId };
		} else {
			data = [...data, { x: action.x, y: action.y, beadId: action.beadId }];
		}

		return Object.assign({}, state, {
			currentCanvasPictureData: { pixels: data },
		});
	}

	case SET_CURRENT_CANVAS_IMAGE: {
		let data = state.currentCanvasPictureData.pixels;

		for (let x = 0; x < action.image.bitmap.width; x += 1) {
			for (let y = 0; y < action.image.bitmap.height; y += 1) {
				const color = Jimp.intToRGBA(action.image.getPixelColor(x, y));
				const beadId = getBeadByColor(color.r, color.g, color.b, color.a).id;

				const index = data.findIndex(element => (
					element.x === action.x && element.y === action.y
				));
				if (index > -1) {
					data = [...data];
					data[index] = { x, y, beadId };
				} else {
					data = [...data, { x, y, beadId }];
				}
			}
		}

		return Object.assign({}, state, {
			currentCanvasPictureData: { pixels: data },
			tabletSizeX: Math.ceil(action.image.bitmap.width / 29),
			tabletSizeY: Math.ceil(action.image.bitmap.height / 29),
		});
	}

	default:
		return state;
	}
};

export default canvas;
