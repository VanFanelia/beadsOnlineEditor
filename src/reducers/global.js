const INIT = 'INIT';
const SET_MODE = 'SET_MODE';

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

	default:
		return state;
	}
};

export default canvas;
