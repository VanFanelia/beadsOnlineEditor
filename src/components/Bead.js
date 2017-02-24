import React from 'react';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import { jssSheet } from '../utils/propTypes';
import { transparent } from '../style/colors';
import blankBead from '../graphics/BlankBead.svg';

const styles = {
	bead: {
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
	<span
		id={props.beadId}
		className={classNames({
			[classes.bead]: true,
			[classes.empty]: props.empty },
		)}
	>
		{props.empty ? (<img className={classes.icon} src={blankBead} alt="" />) : 'foo'}
	</span>
);

Bead.propTypes = {
	x: React.PropTypes.number,
	y: React.PropTypes.number,
	beadId: React.PropTypes.string,
	empty: React.PropTypes.bool,
	bead: React.PropTypes.func,
	sheet: jssSheet,
};

Bead.defaultProps = {
	empty: true,
};

export default injectSheet(styles)(Bead);
