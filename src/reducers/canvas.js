export const defaultCanvasState = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	currentCanvasPictureData: {},
	currentCanvasName: 'Untitled',
	currentCanvasMode: 'init',
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

	default:
		return state;
	}
};

export default canvas;