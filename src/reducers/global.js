const INIT = 'INIT';
const SET_MODE = 'SET_MODE';
const CONVERSION_DONE = 'CONVERSION_DONE';
const SET_CONVERTER_PARAMETERS = 'SET_CONVERTER_PARAMETERS';
const SET_CURRENT_CANVAS_IMAGE = 'SET_CURRENT_CANVAS_IMAGE';

export const MODES = {
	INIT: 'init',
	EDITOR: 'editor',
	CHOOSE_PICTURE: 'choosePicture',
	CHOOSE_PARAMETERS: 'chooseParameters',
	CONVERSION_FINISHED: 'conversionFinished',
};

/** *******************
 * Default State
 ***********************/
export const defaultCanvasState = {
	mode: 'init',
};


/** *******************
 * Actions
 ***********************/
export const setMode = mode => ({
	type: SET_MODE,
	mode,
});


/** *******************
 * Reducer
 ***********************/
const canvas = (state = defaultCanvasState, action) => {
	switch (action.type) {
	case INIT:
		return Object.assign({}, state, {
			mode: defaultCanvasState.mode,
		});

	case SET_MODE:
		return Object.assign({}, state, {
			mode: action.mode,
		});

	case SET_CONVERTER_PARAMETERS:
		return Object.assign({}, state, {
			mode: MODES.CHOOSE_PARAMETERS,
		});

	case CONVERSION_DONE:
		return Object.assign({}, state, {
			mode: MODES.CONVERSION_FINISHED,
		});

	case SET_CURRENT_CANVAS_IMAGE:
		return Object.assign({}, state, {
			mode: MODES.EDITOR,
		});

	default:
		return state;
	}
};

export default canvas;
