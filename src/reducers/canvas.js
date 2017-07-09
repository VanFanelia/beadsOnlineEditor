import Jimp from 'jimp';
import { defaultBead, getBeadByColor, NO_BEAD, transparentBead } from '../utils/beadColors';
import { removeSurroundingTransparentBeads } from '../utils/imageAlgorithm';
import { calculateBase64Image } from '../utils/calculateBase64Image';

const CHANGE_TABLET_SIZE = 'CHANGE_TABLET_SIZE';
const CHANGE_ZOOM = 'CHANGE_ZOOM';
const SET_BEAD = 'SET_BEAD';
const SET_CURRENT_CANVAS_BEAD = 'SET_CURRENT_CANVAS_BEAD';
const SET_CURRENT_CANVAS_IMAGE = 'SET_CURRENT_CANVAS_IMAGE';
const REMOVE_SURROUNDING_TRANSPARENT_BEADS = 'REMOVE_SURROUNDING_TRANSPARENT_BEADS';
const SET_COLOR_FILTER = 'SET_COLOR_FILTER';
const SHOW_URL_POPUP = 'SHOW_URL_POPUP';
const HIDE_URL_POPUP = 'HIDE_URL_POPUP';

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
	colorFilter: '',
	showUrlPopup: false,
	imageShareUrl: '',
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

export const removeSurroundingTransparentBeadsAction = () => ({
	type: REMOVE_SURROUNDING_TRANSPARENT_BEADS,
});

export const setColorFilter = category => ({
	type: SET_COLOR_FILTER,
	colorFilter: category,
});

export const showUrlPopup = imageBase64 => ({
	type: SHOW_URL_POPUP,
	showUrlPopup: true,
	imageUrl: imageBase64,
});

export const hideUrlPopup = () => ({
	type: HIDE_URL_POPUP,
	showUrlPopup: false,
});

export const generateUrlAndShowPopup = (pixels, sizeX, sizeY) => (
	dispatch => (
		calculateBase64Image(pixels, sizeX, sizeY).then(
			image => dispatch(showUrlPopup(image)),
			error => dispatch(showUrlPopup(`An Error occured: ${error}`)),
		)
	)
);

/** *******************
 * Reducer
 ***********************/
const canvas = (state = defaultCanvasState, action) => {
	switch (action.type) {

	case SET_CURRENT_CANVAS_BEAD:
		return Object.assign({}, state, {
			currentCanvasBead: action.currentCanvasBead,
		});

	case SET_COLOR_FILTER:
		return Object.assign({}, state, {
			colorFilter: action.colorFilter,
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

		for (let x = 0; x < Math.ceil(action.image.bitmap.width / 29) * 29; x += 1) {
			for (let y = 0; y < Math.ceil(action.image.bitmap.height / 29) * 29; y += 1) {
				if (x >= action.image.bitmap.width || y >= action.image.bitmap.height) {
					data = [...data, { x, y, beadId: transparentBead }];
				} else {
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
		}

		return Object.assign({}, state, {
			currentCanvasPictureData: { pixels: data },
			tabletSizeX: Math.ceil(action.image.bitmap.width / 29),
			tabletSizeY: Math.ceil(action.image.bitmap.height / 29),
		});
	}

	case REMOVE_SURROUNDING_TRANSPARENT_BEADS: {
		return Object.assign({}, state, {
			currentCanvasPictureData: {
				pixels: removeSurroundingTransparentBeads(
					state.currentCanvasPictureData.pixels,
					state.tabletSizeX * 29,
					state.tabletSizeY * 29,
				),
			},
		});
	}

	case SHOW_URL_POPUP: {
		const link = `${window.location.href}?img=${
			encodeURIComponent(action.imageUrl)
		}`;

		return Object.assign({}, state, {
			showUrlPopup: true,
			imageShareUrl: link,
		});
	}

	case HIDE_URL_POPUP: {
		return Object.assign({}, state, {
			showUrlPopup: false,
		});
	}

	default:
		return state;
	}
};

export default canvas;
