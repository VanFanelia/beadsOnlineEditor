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
		return {
			tabletSizeX: action.tabletSizeX,
			tabletSizeY: action.tabletSizeY,
			currentCanvasPictureData: action.currentCanvasPictureData,
			currentCanvasName: action.currentCanvasName,
			currentCanvasMode: 'editor',
		};

	case 'CHANGE_CANVAS_NAME':
		return Object.assign({}, state, {
			currentCanvasName: action.currentCanvasName,
		});

	default:
		return state;
	}
};

export default canvas;
