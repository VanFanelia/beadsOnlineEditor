import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { changeTabletSize, changeZoom, generateUrlAndShowPopup } from '../reducers/canvas';
import { setMode, MODES } from '../reducers/global';
import injectSheet from '../utils/injectSheet';

import { black, lightGrayBackground, errorRed } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

import grid from '../utils/grid';
import { translate } from '../utils/translate';

const styles = {
	menuBar: {
		backgroundColor: lightGrayBackground,
		height: grid('s + s'),
		padding: grid('xs'),
		color: black,
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
	zoom: {
		width: grid('l'),
		marginLeft: grid('s'),
		marginRight: grid('s'),
	},
	button: {
		marginLeft: grid('s'),
		marginRight: grid('s'),
	},
};

const MenuBar = ({ dispatch, sheet: { classes }, ...props }) => {
	let inputX;
	let inputY;
	let inputZoom;

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

	const checkZoomFactor = () => {
		const z = Number(inputZoom.value);
		if (!Number.isInteger(z) || z < 0) {
			return;
		}
		dispatch(changeZoom(z));
	};

	return (
		<div className={classNames({ [classes.menuBar]: true })}>
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
			<input
				ref={(node) => { inputZoom = node; }}
				className={classes.zoom}
				type="number"
				name="zoom"
				value={props.zoom}
				onChange={checkZoomFactor}
			/>
			<label htmlFor="zoom">{translate('ZOOM')}</label>
			<button
				className={classes.button}
				onClick={() => dispatch(setMode(MODES.PRINT_PREVIEW))}
				style={{ display: props.currentMode === MODES.EDITOR ? 'inline-block' : 'none' }}
			>
				{translate('PRINT_PREVIEW')}
			</button>

			<button
				className={classes.button}
				onClick={() => dispatch(generateUrlAndShowPopup(
					props.currentCanvasPictureData.pixels,
					props.tabletSizeX * 29,
					props.tabletSizeY * 29,
				))}
				style={{ display: props.currentMode === MODES.EDITOR ? 'inline-block' : 'none' }}
			>
				{translate('URL_TO_SHARE')}
			</button>
			<button
				className={classes.button}
				onClick={() => dispatch(setMode(MODES.EDITOR))}
				style={{ display: props.currentMode === MODES.PRINT_PREVIEW ? 'inline-block' : 'none' }}
			>
				{translate('BACK_TO_EDITOR_MODE')}
			</button>
		</div>
	);
};

MenuBar.propTypes = {
	tabletSizeX: PropTypes.number,
	tabletSizeY: PropTypes.number,
	currentMode: PropTypes.string.isRequired,
	currentCanvasPictureData: PropTypes.objectOf(PropTypes.any).isRequired,
	classes: jssClasses.isRequired,
	sheet: jssSheet.isRequired,
	dispatch: PropTypes.func.isRequired,
	zoom: PropTypes.number,
};

MenuBar.defaultProps = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	zoom: 100,
};

export default connect()(injectSheet(styles)(MenuBar));
