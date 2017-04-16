import React from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';

import injectSheet from '../utils/injectSheet';
import blankBead from '../graphics/BlankBead.svg';
import ItemTypes from '../utils/dnd/ItemTypes';
import grid from '../utils/grid';

import { jssSheet, jssClasses } from '../utils/propTypes';
import { transparent } from '../style/colors';

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
			backgroundColor: 'yellow',
		},
	},
	empty: {
		backgroundColor: transparent,
	},
	icon: {
		backgroundColor: transparent,
		height: '7px',
		width: '5px',
		margin: '6px auto auto auto',
		display: 'block',
	},
};

class Bead extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.x = props.x;
		this.y = props.y;
		this.setBead = props.setBead;
	}

	render() {
		const bead = (
			<span
				id={this.props.beadId}
				className={classNames({
					[this.classes.bead]: true,
					[this.classes.empty]: this.props.empty,
				})}
			>
				{this.props.empty ? (<img className={this.classes.icon} src={blankBead} alt="" />) : 'foo'}
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
						backgroundColor: 'green',
					}}
				/>
				}
			</span>);
		return this.props.connectDropTarget(bead);
	}
}

Bead.propTypes = {
	x: React.PropTypes.number,
	y: React.PropTypes.number,
	beadId: React.PropTypes.string,
	empty: React.PropTypes.bool,
	isOver: React.PropTypes.bool.isRequired,
	sheet: jssSheet,
	classes: jssClasses,
	setBead: React.PropTypes.func,
	connectDropTarget: React.PropTypes.func,
};

Bead.defaultProps = {
	empty: true,
};

export default DropTarget(
	ItemTypes.BEAD,
	beadTarget,
	collectDrops,
)(connect()(injectSheet(styles)(Bead)));
