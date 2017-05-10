import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import jsxToString from 'jsx-to-string';
import classNames from 'classnames';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import ItemTypes from '../utils/dnd/ItemTypes';

import { black, white, beadShadowGray, buttonActiveGray } from '../style/colors';
import { textRatioLineHeight, textRatioFontSize } from '../utils/fontRatio';
import { jssSheet, jssClasses } from '../utils/propTypes';

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
		position: 'relative',
		width: '100%',
		cursor: 'copy !important',
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
	isSelected: {
		backgroundColor: buttonActiveGray,
	},
};

class ColorBeadPanel extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.onClickPanel = this.onClickPanel.bind(this);
	}

	componentDidMount() {
		const img = new Image();
		const xml = getBeadPreviewImageSrc(`${this.props.backgroundColor}`);
		img.src = `data:image/svg+xml;charset=utf-8,${xml}`;
		img.onload = () => this.props.connectDragPreview(img, { dropEffect: 'copy', anchorX: 1, anchorY: 0 });
	}

	onClickPanel() {
		this.props.setCurrentCanvasColor(this.props.beadId);
	}

	render() {
		return this.props.connectDragSource(
			<li>
				<button
					id={this.props.beadId}
					className={classNames({
						[this.classes.colorContainer]: true,
						[this.classes.isSelected]: this.props.isSelected,
					})}
					style={{
						opacity: this.props.isDragging ? 0.5 : 1,
						cursor: 'move',
					}}
					onClick={this.onClickPanel}
				>
					<span
						className={this.classes.colorField}
						style={{ backgroundColor: this.props.backgroundColor, color: this.props.textColor }}
					>
						...
					</span>
					<span className={this.classes.colorDescription}>{this.props.colorName}</span>
				</button>
			</li>);
	}
}

const beadSource = {
	beginDrag(props) {
		return { beadId: props.beadId };
	},
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
}

ColorBeadPanel.propTypes = {
	beadId: PropTypes.string.isRequired,
	backgroundColor: PropTypes.string.isRequired,
	textColor: PropTypes.string.isRequired,
	colorName: PropTypes.string.isRequired,
	isSelected: PropTypes.bool,
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	connectDragSource: PropTypes.func.isRequired,
	connectDragPreview: PropTypes.func.isRequired,
	isDragging: PropTypes.bool.isRequired,
	setCurrentCanvasColor: PropTypes.func.isRequired,
};

ColorBeadPanel.defaultProps = {
	isSelected: false,
};

export default DragSource(
	ItemTypes.BEAD,
	beadSource,
	collect)(injectSheet(styles)(ColorBeadPanel));
