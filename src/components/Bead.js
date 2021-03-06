import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import jsxToString from 'jsx-to-string';

import injectSheet from '../utils/injectSheet';
import blankBead from '../graphics/BlankBead.svg';
import ItemTypes from '../utils/dnd/ItemTypes';
import { getBeadIdData } from '../utils/beadColors';
import grid from '../utils/grid';
import { translate } from '../utils/translate';

import { jssSheet, jssClasses } from '../utils/propTypes';
import { transparent, hoverTargetColor, tooltipBackground } from '../style/colors';


function collectDrops(con, monitor) {
	return {
		connectDropTarget: con.dropTarget(),
		isOver: monitor.isOver(),
	};
}

const beadTarget = {
	drop(props, monitor) {
		props.setBead(props.x, props.y, monitor.getItem().beadId);
	},
};

const styles = {
	bead: {
		position: 'relative',
		height: grid('xs'),
		width: grid('xs'),
		lineHeight: grid('xs'),
		display: 'inline-block',
		'&:hover': {
			backgroundColor: hoverTargetColor,
			'&:before': {
				display: 'block',
				transform: 'translateY(0) scale(1)',
			},
		},
		'&:before': {
			position: 'absolute',
			left: '0',
			top: `-${grid('s')}`,
			backgroundColor: tooltipBackground,
			height: grid('s'),
			lineHeight: grid('s'),
			borderRadius: '5px',
			padding: `0 ${grid('xs')}`,
			content: 'attr(label)',
			whiteSpace: 'nowrap',
			display: 'none',
			animation: 'seconds 1.0s forwards',
			animationIterationCount: '1',
			animationDelay: '1s',
			opacity: 0,
			fontWeight: 'bold',
			zIndex: 9,
		},
	},

	'@keyframes seconds': {
		'0%': {
			opacity: 0,
		},
		'100%': {
			opacity: 1,
		},
	},

	'&:hover:after': {
		display: 'block',
	},

	'bead:hover:before': {
		display: 'block',
	},
	empty: {
		backgroundColor: transparent,
	},
	iconBlank: {
		backgroundColor: transparent,
		height: '11px',
		width: '9px',
		margin: '2px auto auto auto',
		display: 'block',
	},
	icon: {
		backgroundColor: transparent,
		height: '11px',
		width: '11px',
		margin: '2px auto auto auto',
		display: 'block',
	},
	resetButtonStyle: {
		padding: 0,
		margin: 0,
		border: 'none',
		'&:hover': {
			transform: 'translateY(-4px) scale(1.5)',
		},
	},
};

function getColoredBeadIcon(color) {
	const xml = jsxToString((
		<svg version="1.1" height="40" width="40" xmlns="http://www.w3.org/2000/svg">
			<ellipse cx="20" cy="20" rx="20" ry="20" style={`fill: ${color}`} />
		</svg>
	));
	return `data:image/svg+xml;charset=utf-8,${xml}`;
}

class Bead extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.x = props.x;
		this.y = props.y;
		this.setBead = props.setBead;
		this.onBeadClick = this.onBeadClick.bind(this);
	}

	onBeadClick() {
		this.props.setBead(this.x, this.y, this.props.currentCanvasBead);
	}

	render() {
		let beadIcon = blankBead;
		let isBlank = true;
		let beadName = translate('NO_BEAD_SET');
		if (Object.keys(this.props.beadData).length !== 0) {
			const beadData = getBeadIdData(this.props.beadData.beadId);
			beadIcon = getColoredBeadIcon(beadData.color);
			beadName = `${beadData.id} - ${beadData.name}`;
			isBlank = false;
		}
		const bead = (
			<button
				id={this.props.beadId}
				className={classNames({
					[this.classes.resetButtonStyle]: true,
					[this.classes.bead]: true,
					[this.classes.empty]: this.props.empty,
					[`content-${this.props.beadId}`]: true,
				})}
				onClick={this.onBeadClick}
				label={beadName}
			>
				{this.props.empty ? (
					<img
						className={classNames({
							[this.classes.iconBlank]: isBlank,
							[this.classes.icon]: !isBlank },
						)}
						src={beadIcon}
						alt=""
					/>) : 'foo'}
				{this.props.isOver &&
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						height: '100%',
						width: '100%',
						zIndex: 1,
						opacity: 0.5,
						backgroundColor: hoverTargetColor,
					}}
				/>
				}
			</button>);
		return this.props.connectDropTarget(bead);
	}
}

Bead.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	beadId: PropTypes.string.isRequired,
	empty: PropTypes.bool,
	isOver: PropTypes.bool.isRequired,
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	setBead: PropTypes.func.isRequired,
	connectDropTarget: PropTypes.func.isRequired,
	beadData: PropTypes.objectOf(PropTypes.any).isRequired,
	currentCanvasBead: PropTypes.string.isRequired,
};

Bead.defaultProps = {
	empty: true,
};

export default DropTarget(
	ItemTypes.BEAD,
	beadTarget,
	collectDrops,
)(connect()(injectSheet(styles)(Bead)));
