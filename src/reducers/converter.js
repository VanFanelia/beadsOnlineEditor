const SET_LINK_URL = 'SET_LINK_URL';

/** *******************
 * Default State
 ***********************/
export const defaultCanvasState = {
	linkUrl: 'foobar',
};

/** *******************
 * Actions
 ***********************/

export const setLinkUrl = z => ({
	type: SET_LINK_URL,
	linkUrl: z,
});

/** *******************
 * Reducer
 ***********************/
const converter = (state = defaultCanvasState, action) => {
	switch (action.type) {

	case 'INIT':
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
