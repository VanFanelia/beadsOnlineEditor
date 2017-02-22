import React from 'react';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import iconImage from '../graphics/icon/image.svg';
import iconEmptyFile from '../graphics/icon/emptyFile.svg';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { lightGrayBackground } from '../style/colors';
import { textRatioFontSize, textRatioLineHeight } from '../utils/fontRatio';
import { jssSheet } from '../utils/propTypes';

const styles = {
	container: {
		display: 'flex',
		backgroundColor: lightGrayBackground,
		height: grid('xxxl + xxxl'),
		justifyContent: 'center',
	},
	containerHide: {
		display: 'none',
	},
	anchor: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		margin: 0,
	},
	figureWrapper: {
		padding: grid('s'),
		width: '33%',
	},
	figure: {
		width: '100%',
		height: '100%',
		padding: grid('s'),
		border: '1px solid black',
		position: 'relative',
		textAlign: 'center',
	},
	icon: {
		height: grid('l'),
		width: grid('l'),
	},
	headline: {
		fontSize: textRatioFontSize('s'),
		lineHeight: textRatioLineHeight('s'),
	},
};

const StartupEditorChooser = ({ sheet: { classes }, ...props }) => (
	<div
		className={classNames({
			[classes.container]: true,
			[classes.containerHide]: !props.visible },
		)}
	>
		<div className={classes.figureWrapper}>
			<button className={classes.figure} onClick={props.onCreateCanvasClick}>
				<img className={classes.icon} src={iconEmptyFile} alt="" />
				<h3 className={classes.headline}>
					{ translate('START_EMPTY_EDITOR') }
				</h3>
			</button>
		</div>
		<div className={classes.figureWrapper}>
			<button className={classes.figure} onClick={props.onCreateCanvasClick} >
				<img className={classes.icon} src={iconImage} alt="" />
				<h3 className={classes.headline}>
					{ translate('START_WITH_PICTURE') }
				</h3>
			</button>
		</div>
	</div>
);

StartupEditorChooser.propTypes = {
	visible: React.PropTypes.bool,
	onCreateCanvasClick: React.PropTypes.func,
	sheet: jssSheet,
};

export default injectSheet(styles)(StartupEditorChooser);
