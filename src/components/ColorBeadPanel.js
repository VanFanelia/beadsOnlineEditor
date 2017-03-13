import React from 'react';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import { black } from '../style/colors';
import { textRatioLineHeight, textRatioFontSize } from '../utils/fontRatio';
import { jssSheet } from '../utils/propTypes';

const styles = {
	colorContainer: {
		margin: grid('xxs'),
		padding: grid('xxs'),
		border: '1px solid black',
		lineHeight: textRatioLineHeight('s'),
		fontSize: textRatioFontSize('s'),
	},
	colorButton: {
		height: grid('s'),
		width: grid('s'),
		float: 'left',
		textAlign: 'center',
		fontSize: textRatioFontSize('xs'),
	},
	colorDescription: {
		color: black,
	},
};

const ColorBeadPanel = ({ sheet: { classes }, ...props }) => (
	<li className={classes.colorContainer}>
		<button
			className={classes.colorButton}
			style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
		>
			...
		</button>
		<span className={classes.colorDescription}>{props.colorName}</span>
	</li>
);

ColorBeadPanel.propTypes = {
	backgroundColor: React.PropTypes.string.isRequired,
	textColor: React.PropTypes.string.isRequired,
	colorName: React.PropTypes.string.isRequired,
	sheet: jssSheet,
};

ColorBeadPanel.defaultProps = {
};

export default injectSheet(styles)(ColorBeadPanel);
