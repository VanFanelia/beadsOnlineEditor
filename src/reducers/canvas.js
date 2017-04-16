export const defaultCanvasState = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	currentCanvasPictureData: { pixels: [] },
	currentCanvasName: 'Untitled',
	currentCanvasMode: 'init',
	zoom: 100,
};

const canvas = (state = defaultCanvasState, action) => {
	switch (action.type) {
	case 'CREATE_NEW_BEADS_CANVAS':
		return Object.assign({}, state, {
			tabletSizeX: action.tabletSizeX,
			tabletSizeY: action.tabletSizeY,
			currentCanvasPictureData: action.currentCanvasPictureData,
			currentCanvasName: action.currentCanvasName,
			currentCanvasMode: 'editor',
		});

	case 'CHANGE_CANVAS_NAME':
		return Object.assign({}, state, {
			currentCanvasName: action.currentCanvasName,
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
		const data = state.currentCanvasPictureData.pixels;
		const index = data.findIndex(element => (
			element.x === action.x && element.y === action.y
		));
		if (index > -1) {
			data[index] = { x: action.x, y: action.y, beadId: action.beadId };
		} else {
			data.push({ x: action.x, y: action.y, beadId: action.beadId });
		}
		console.log(data);

		return Object.assign({}, state, {
			currentCanvasPictureData: { pixels: data },
		});
	}

	default:
		return state;
	}
};

export default canvas;
