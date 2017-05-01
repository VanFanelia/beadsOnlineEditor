import Normalize from 'normalize.jss';
import animations from './animations';
import { darkFontColor } from './colors';
import { textRatioFontSize, textRatioLineHeight, headlineRatioLineHeight, headlineRatioFontSize } from '../utils/fontRatio';
import transition from './transition';
import grid from '../utils/grid';

export default {
	'@global': {
		body: {
			margin: 0,
			padding: 0,
			color: darkFontColor,
			background: '#ddeee3',
			fontFamily: 'Source Sans Pro, sans-serif',
			fontSize: textRatioFontSize('s'),
			lineHeight: textRatioLineHeight('s'),
		},
		...Normalize,
		figure: {
			margin: 0,
		},
		button: {
			backgroundColor: 'transparent',
			cursor: 'pointer',
			'&:hover': {
				boxShadow: '0 8px 8px rgba(0,31,73,.15)',
				transform: 'translateY(-4px)',
				transition: transition(),
			},
		},
		'*': {
			boxSizing: 'border-box',
		},
		h1: {
			fontSize: headlineRatioFontSize('l'),
			lineHeight: headlineRatioLineHeight('l'),
		},
		h2: {
			fontSize: headlineRatioFontSize('m'),
			lineHeight: headlineRatioLineHeight('m'),
		},
		h3: {
			fontSize: headlineRatioFontSize('s'),
			lineHeight: headlineRatioLineHeight('s'),
		},
		h4: {
			fontSize: headlineRatioFontSize('s'),
			lineHeight: headlineRatioLineHeight('s'),
		},
		h5: {
			fontSize: headlineRatioFontSize('s'),
			lineHeight: headlineRatioLineHeight('s'),
		},
		h6: {
			fontSize: headlineRatioFontSize('s'),
			lineHeight: headlineRatioLineHeight('s'),
		},
		p: {
			fontSize: textRatioFontSize('s'),
			lineHeight: textRatioLineHeight('s'),
			margin: `0 0 ${grid('s')} 0`,
		},
		label: {
			fontSize: textRatioFontSize('s'),
			lineHeight: textRatioLineHeight('s'),
		},
		ul: {
			textAlign: 'left',
		},
	},
	...animations,
};
