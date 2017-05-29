import convert from '../utils/converter';
import { RESIZE_OPTION_SCALE_CUBIC } from '../utils/scaleOptions';

const SET_LINK_URL = 'SET_LINK_URL';
const SET_IMAGE = 'SET_IMAGE';
const SET_CONVERTER_PARAMETERS = 'SET_CONVERTER_PARAMETERS';
const CONVERSION_DONE = 'CONVERSION_DONE';

/** *******************
 * Default State
 ***********************/
export const defaultConverterState = {
	linkUrl: '',
	selectedAlgorithm: 'RESIZE_NEAREST_NEIGHBOR',
	selectedScaleOption: RESIZE_OPTION_SCALE_CUBIC,
	maxWidth: 2,
	maxHeight: 2,
	usedBeadTypes: ['BASIC_HAMA_COLORS', 'PASTEL_HAMA_COLORS', 'METAL_HAMA_COLORS'],
	image: null,
	convertedImage: null,
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

export const setConverterParameters = (
	selectedAlgorithm,
	maxWidth,
	maxHeight,
	usedBeadTypes,
	selectedScaleOption,
) => (
	{
		type: SET_CONVERTER_PARAMETERS,
		selectedAlgorithm,
		maxWidth,
		maxHeight,
		usedBeadTypes,
		selectedScaleOption,
	}
);

export const startConversion = () => ({
	type: CONVERSION_DONE,
});

/** *******************
 * Reducer
 ***********************/
const converter = (state = defaultConverterState, action) => {
	switch (action.type) {

	case 'INIT':
		return Object.assign({}, state, defaultConverterState);

	case SET_LINK_URL:
		return Object.assign({}, state, {
			linkUrl: action.linkUrl,
		});

	case SET_IMAGE:
		return Object.assign({}, state, {
			image: action.image,
		});

	case SET_CONVERTER_PARAMETERS:
		return Object.assign({}, state, {
			selectedAlgorithm: action.selectedAlgorithm,
			maxWidth: action.maxWidth,
			maxHeight: action.maxHeight,
			usedBeadTypes: action.usedBeadTypes,
			selectedScaleOption: action.selectedScaleOption,
		});

	case CONVERSION_DONE:
		return Object.assign({}, state, {
			convertedImage: convert(
				state.image,
				state.selectedAlgorithm,
				state.maxWidth,
				state.maxHeight,
				state.usedBeadTypes,
				state.selectedScaleOption,
			),
		});

	default:
		return state;
	}
};

export default converter;
