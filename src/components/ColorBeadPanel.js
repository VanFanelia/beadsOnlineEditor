import React from 'react';
import { DragSource } from 'react-dnd';
import jsxToString from 'jsx-to-string';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import ItemTypes from '../utils/dnd/ItemTypes';

import { black, white, beadShadowGray } from '../style/colors';
import { textRatioLineHeight, textRatioFontSize } from '../utils/fontRatio';
import { jssSheet, jssClasses } from '../utils/propTypes';

const beadSource = {
	beginDrag(props) {
		console.log(props);
		return {};
	},
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

function getBeadPreviewImageSrc(color) {
	return jsxToString((
		<svg version="1.1" height="60" width="40" xmlns="http://www.w3.org/2000/svg">
			<g className="bead filled green" transform="translate(20,10) scale(0.9)" >
				<ellipse className="top" cx="0" cy="0" rx="22" ry="10" style={`fill: ${color}`} />
				<ellipse className="bottom" cx="0" cy="45" rx="22" ry="10" style={`fill: ${color}`} />
				<polygon points="-22,0 22,0 22,45 -22,45" style={`fill: ${color}`} />
				<ellipse className="hole" cx="0" cy="0" rx="14" ry="6" style={`fill: ${white}`} />
				<ellipse className="nippel" cx="0" cy="2" rx="10" ry="5" style={`fill: ${beadShadowGray}`} />
			</g>
		</svg>
	));
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

class ColorBeadPanel extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
	}

	componentDidMount() {
		const img = new Image();
		const xml = getBeadPreviewImageSrc(`${this.props.backgroundColor}`);
		img.src = `data:image/svg+xml;charset=utf-8,${xml}`;
		img.onload = () => this.props.connectDragPreview(img, { dropEffect: 'copy', anchorX: 1, anchorY: 0 });
	}

	render() {
		return this.props.connectDragSource(
			<li
				className={this.classes.colorContainer}
				style={{
					opacity: this.props.isDragging ? 0.5 : 1,
					cursor: 'move',
				}}
			>
				<span
					className={this.classes.colorField}
					style={{ backgroundColor: this.props.backgroundColor, color: this.props.textColor }}
				>
					...
				</span>
				<span className={this.classes.colorDescription}>{this.props.colorName}</span>
			</li>);
	}
}


ColorBeadPanel.propTypes = {
	backgroundColor: React.PropTypes.string.isRequired,
	textColor: React.PropTypes.string.isRequired,
	colorName: React.PropTypes.string.isRequired,
	sheet: jssSheet,
	classes: jssClasses,
	connectDragSource: React.PropTypes.func.isRequired,
	connectDragPreview: React.PropTypes.func.isRequired,
	isDragging: React.PropTypes.bool.isRequired,
};

ColorBeadPanel.defaultProps = {
};

export default DragSource(
	ItemTypes.BEAD,
	beadSource,
	collect)(injectSheet(styles)(ColorBeadPanel));
