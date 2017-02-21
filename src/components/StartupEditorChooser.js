import React from 'react';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import iconImage from '../graphics/icon/image.svg';
import iconEmptyFile from '../graphics/icon/emptyFile.svg';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { lightGrayBackground } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';
import { textRatioFontSize, textRatioLineHeight } from '../utils/fontRatio';

const styles = {
	container: {
		display: 'flex',
		backgroundColor: lightGrayBackground,
		height: grid('s'),
		justifyContent: 'center',
	},
	containerBig: {
		height: grid('xxxl + xxxl'),
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

class StartupEditorChooser extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
	}

	initEmptyEditor() {
		this.foo = 'bar';
	}

	initPictureChoice() {
		this.bar = 'foo';
	}

	render() {
		return (
			<div
				className={classNames({
					[this.classes.container]: true,
					[this.classes.containerBig]: this.props.choice },
					)}
			>
				<div className={this.classes.figureWrapper}>
					<button className={this.classes.figure} onClick={this.initEmptyEditor}>
						<img className={this.classes.icon} src={iconEmptyFile} alt="" />
						<h3 className={this.classes.headline}>
							{ translate('START_EMPTY_EDITOR') }
						</h3>
					</button>
				</div>
				<div className={this.classes.figureWrapper}>
					<button className={this.classes.figure} onClick={this.initPictureChoice} >
						<img className={this.classes.icon} src={iconImage} alt="" />
						<h3 className={this.classes.headline}>
							{ translate('START_WITH_PICTURE') }
						</h3>
					</button>
				</div>
			</div>
		);
	}
}

StartupEditorChooser.propTypes = {
	choice: React.PropTypes.bool,
	sheet: jssSheet,
	classes: jssClasses,
};

export default injectSheet(styles)(StartupEditorChooser);
