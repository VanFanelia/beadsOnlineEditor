const SET_LINK_URL = 'SET_LINK_URL';
const INIT_CONVERTER = 'INIT_CONVERTER';

/** *******************
 * Default State
 ***********************/
export const defaultCanvasState = {
	linkUrl: 'foobar',
};

/** *******************
 * Actions
 ***********************/

export const init = () => ({
	type: SET_LINK_URL,
	linkUrl: INIT_CONVERTER,
});

export const setLinkUrl = (z) => {
	return {
		type: SET_LINK_URL,
		linkUrl: z,
	};
};



/** *******************
 * Reducer
 ***********************/
const converter = (state = defaultCanvasState, action) => {
	switch (action.type) {

	case INIT_CONVERTER:
		return Object.assign({}, state, {
			linkUrl: defaultCanvasState.linkUrl,
		});

	case SET_LINK_URL:
		return Object.assign({}, state, {
			linkUrl: action.linkUrl,
		});

	default:
		return state;
	}
};

export default converter;
