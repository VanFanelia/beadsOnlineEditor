import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeTabletSize } from '../actions/index';
import injectSheet from '../utils/injectSheet';

import { black, lightGrayBackground, errorRed } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

import grid from '../utils/grid';
import translate from '../utils/translate';

const styles = {
	menuBar: {
		backgroundColor: lightGrayBackground,
		height: grid('s + s'),
		padding: grid('xs'),
		color: black,
	},
	hidden: {
		display: 'none',
	},
	input: {
		marginLeft: grid('s'),
		width: grid('m'),
		textAlign: 'center',
	},
	error: {
		border: `1px solid ${errorRed}`,
		color: errorRed,
		fontWeight: 'bold',
	},
	cross: {
		marginLeft: grid('s'),
	},
};

const MenuBar = ({ dispatch, sheet: { classes }, ...props }) => {
	let inputX;
	let inputY;

	const checkInput = () => {
		const x = Number(inputX.value);
		const y = Number(inputY.value);

		if (!Number.isInteger(x) || !Number.isInteger(y)) {
			return;
		}

		if (x < 1 || x > 5) {
			inputX.classList.add(classes.error);
			return;
		}
		inputX.classList.remove(classes.error);

		if (y < 1 || y > 5) {
			inputY.classList.add(classes.error);
			return;
		}
		inputY.classList.remove(classes.error);

		dispatch(changeTabletSize(x, y));
	};

	return (
		<div className={classNames({ [classes.menuBar]: true, [classes.hidden]: !props.visible })}>
			<label htmlFor="tabletSizeX">{translate('NUMBER_OF_TABLES_LABEL')}</label>
			<input
				ref={(node) => { inputX = node; }}
				className={classes.input}
				type="number"
				name="tabletSizeX"
				value={props.tabletSizeX}
				onChange={checkInput}
			/>
			<label className={classes.cross} htmlFor="tabletSizeY">{translate('NUMBER_OF_TABLES_LABEL_CROSS')}</label>
			<input
				ref={(node) => { inputY = node; }}
				className={classes.input}
				type="number"
				name="tabletSizeY"
				value={props.tabletSizeY}
				onChange={checkInput}
			/>
		</div>
	);
};

MenuBar.propTypes = {
	tabletSizeX: React.PropTypes.number,
	tabletSizeY: React.PropTypes.number,
	visible: React.PropTypes.bool,
	classes: jssClasses,
	sheet: jssSheet,
	dispatch: React.PropTypes.func,
};

MenuBar.defaultProps = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	visible: false,
};

export default connect()(injectSheet(styles)(MenuBar));
