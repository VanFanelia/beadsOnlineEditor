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
	figureWrapper: {
		padding: grid('s'),
		width: '33%',
	},
	figure: {
		width: '100%',
		height: '100%',
		padding: grid('s'),
		border: '1px solid black',
	},
	icon: {
		height: grid('l'),
		width: grid('l'),
	},
	caption: {
		textAlign: 'center',
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
		console.log('foo');
	}

	initPictureChoice() {
		this.bar = 'foo';
		console.log('bar');
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
					<figure className={this.classes.figure}>
						<img className={this.classes.icon} src={iconEmptyFile} alt="" />
						<figcaption className={this.classes.caption}>
							<h3 className={this.classes.headline}>
								{ translate('START_EMPTY_EDITOR') }
							</h3>
						</figcaption>
					</figure>
					<a onClick={this.initEmptyEditor} />
				</div>
				<div className={this.classes.figureWrapper}>
					<figure className={this.classes.figure}>
						<img className={this.classes.icon} src={iconImage} alt="" />
						<figcaption className={this.classes.caption}>
							<h3 className={this.classes.headline}>
								{ translate('START_WITH_PICTURE') }
							</h3>
						</figcaption>
					</figure>
					<a onClick={this.initPictureChoice()} />
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
