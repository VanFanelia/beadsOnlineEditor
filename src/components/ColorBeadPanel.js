import React from 'react';
import { DragSource } from 'react-dnd';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import ItemTypes from '../utils/dnd/ItemTypes';

import { black } from '../style/colors';
import { textRatioLineHeight, textRatioFontSize } from '../utils/fontRatio';
import { jssSheet } from '../utils/propTypes';

const beadSource = {
	beginDrag(props) {
		console.log(props);
		return {};
	},
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	};
}

const styles = {
	colorContainer: {
		margin: grid('xxs'),
		padding: grid('xxs'),
		border: '1px solid black',
		lineHeight: textRatioLineHeight('s'),
		fontSize: textRatioFontSize('s'),
	},
	colorField: {
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
	props.connectDragSource(
		<li
			className={classes.colorContainer}
			style={{
				opacity: props.isDragging ? 0.5 : 1,
				cursor: 'move',
			}}
		>
			<span
				className={classes.colorField}
				style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
			>
				...
			</span>
			<span className={classes.colorDescription}>{props.colorName}</span>
		</li>)
);

ColorBeadPanel.propTypes = {
	backgroundColor: React.PropTypes.string.isRequired,
	textColor: React.PropTypes.string.isRequired,
	colorName: React.PropTypes.string.isRequired,
	sheet: jssSheet,
	connectDragSource: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired,
};

ColorBeadPanel.defaultProps = {
};

export default DragSource(
	ItemTypes.BEAD,
	beadSource,
	collect)(injectSheet(styles)(ColorBeadPanel));
