import React from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import injectSheet from '../utils/injectSheet';

import { black, white, lightGrayBackground, filterRed } from '../style/colors';
import { jssSheet } from '../utils/propTypes';

import grid from '../utils/grid';
import { textRatioLineHeight, textRatioFontSize } from '../utils/fontRatio';
import translate from '../utils/translate';
import ColorFilter from './ColorFilter';
import ColorBeadPanel from './ColorBeadPanel';

const styles = {
	colorBar: {
		backgroundColor: lightGrayBackground,
		position: 'absolute',
		height: '100%',
		padding: grid('xs'),
		paddingTop: grid('l'),
		color: black,
		width: grid('xxxl + xxl'),
		right: 0,
		top: 0,
	},
	hidden: {
		width: grid('xs'),
	},
	input: {
		width: grid('xxxl + xl'),
		display: 'block',
		height: grid('s'),
		lineHeight: textRatioLineHeight('s'),
		fontSize: textRatioFontSize('s'),
		margin: `0 0 ${grid('xs')} 0`,
	},
	colorList: {
		padding: 0,
		margin: 0,
		listStyleType: 'none',
	},
	colorFilter: {
		display: 'inline-block',
	},
};

const ColorBar = ({ sheet: { classes } }) =>
(
	<div className={classNames({ [classes.colorBar]: true })}>
		<ColorFilter />
		<input className={classes.input} type="text" value={''} placeholder={translate('SEARCH_PLACEHOLDER')} />
		<ul className={classes.colorList}>
			<ColorBeadPanel backgroundColor={black} colorName={translate('COLOR_BLACK')} textColor={white} />
			<ColorBeadPanel backgroundColor={white} colorName={translate('COLOR_WHITE')} textColor={black} />
			<ColorBeadPanel backgroundColor={filterRed} colorName={translate('COLOR_RED')} textColor={black} />
		</ul>
	</div>
);

ColorBar.propTypes = {
	sheet: jssSheet,
};

ColorBar.defaultProps = {
	tabletSizeX: 1,
	tabletSizeY: 1,
	visible: false,
};

export default connect()(injectSheet(styles)(ColorBar));
