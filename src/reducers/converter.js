const SET_LINK_URL = 'SET_LINK_URL';
const SET_IMAGE = 'SET_IMAGE';

/** *******************
 * Default State
 ***********************/
export const defaultCanvasState = {
	linkUrl: '',
	image: undefined,
};

/** *******************
 * Actions
 ***********************/

export const setLinkUrl = url => ({
	type: SET_LINK_URL,
	linkUrl: url,
});

export const setImage = image => ({
	type: SET_IMAGE,
	image,
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

	case SET_IMAGE:
		console.log(action.image);
		return Object.assign({}, state, {
			image: action.image,
		});

	default:
		return state;
	}
};

export default converter;
