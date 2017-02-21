const canvas = (state = {}, action) => {
	switch (action.type) {
	case 'CREATE_NEW_BEADS_CANVAS':
		return {
			tabletSizeX: action.tabletSizeX,
			tabletSizeY: action.tabletSizeY,
			currentCanvasPictureData: action.currentCanvasPictureData,
			currentCanvasName: action.currentCanvasName,
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
