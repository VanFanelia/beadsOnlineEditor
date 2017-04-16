import React from 'react';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';

import injectSheet from '../utils/injectSheet';
import blankBead from '../graphics/BlankBead.svg';
import ItemTypes from '../utils/dnd/ItemTypes';
import grid from '../utils/grid';

import { jssSheet } from '../utils/propTypes';
import { transparent } from '../style/colors';


const beadTarget = {
	drop(props, monitor) {
		console.log(props);
		console.log(monitor.getItem());
		// setBead();
	},
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
	};
}

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

const Bead = ({ sheet: { classes }, ...props }) => (
	props.connectDropTarget(
		<span
			id={props.beadId}
			className={classNames({
				[classes.bead]: true,
				[classes.empty]: props.empty },
			)}
		>
			{props.empty ? (<img className={classes.icon} src={blankBead} alt="" />) : 'foo'}
			{props.isOver &&
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
		</span>)
);

Bead.propTypes = {
	x: React.PropTypes.number,
	y: React.PropTypes.number,
	beadId: React.PropTypes.string,
	empty: React.PropTypes.bool,
	bead: React.PropTypes.func,
	sheet: jssSheet,
	isOver: React.PropTypes.bool.isRequired,
};

Bead.defaultProps = {
	empty: true,
};

export default DropTarget(ItemTypes.BEAD, beadTarget, collect)(injectSheet(styles)(Bead));
