import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeTabletSize } from '../actions/index';
import injectSheet from '../utils/injectSheet';

import { black, lightGrayBackground, errorRed } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

import grid from '../utils/grid';
import ColorFilter from './ColorFilter';
import translate from '../utils/translate';

const styles = {
	colorBar: {
		backgroundColor: lightGrayBackground,
		position: 'absolute',
		height: '100%',
		padding: grid('xs'),
		paddingTop: grid('l'),
		color: black,
		width: grid('xxxl + l'),
		right: 0,
		top: 0,
	},
	hidden: {
		width: grid('xs'),
	},
	input: {
		width: grid('xxxl'),
		display: 'block',
	},
	colorList: {
		padding: 0,
		margin: 0,
		listStyleType: 'none',
	},
	colorFilter: {
		display: 'inline-block',
	},
	colorContainer: {
		foo: 'bar',
	}
};

const ColorBar = ({ dispatch, sheet: { classes }, ...props }) => {
	return (
		<div className={classNames({ [classes.colorBar]: true })}>
			<ColorFilter />
			<input className={classes.input} type="text" value={''} placeholder="search..." />
			<ul className={classes.colorList}>
				<li className={classes.colorContainer}>
					{'bar'}
				</li>
			</ul>
		</div>
	);
};

ColorBar.propTypes = {
	tabletSizeX: React.PropTypes.number,
	tabletSizeY: React.PropTypes.number,
	visible: React.PropTypes.bool,
	classes: jssClasses,
	sheet: jssSheet,
	dispatch: React.PropTypes.func,
};

ColorBar.defaultProps = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	visible: false,
};

export default connect()(injectSheet(styles)(ColorBar));
