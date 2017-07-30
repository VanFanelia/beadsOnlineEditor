import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from '../utils/injectSheet';
import { jssSheet, jimpImage, jssClasses } from '../utils/propTypes';
import grid from '../utils/grid';

import { MODES } from '../reducers/global';

import StartupEditorChooser from '../components/StartupEditorChooser';
import CanvasContainer from '../components/container/CanvasContainer';
import PictureChooser from '../components/PictureChooser';
import PicturePreview from '../components/PicturePreview';
import ConfigureParameterEditor from '../components/ConfigureParameterEditor';
import ActionBar from '../components/ActionBar';
import CopyUrlPopup from '../components/CopyUrlPopup';

const styles = {
	container: {
		textAlign: 'center',
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: `calc(100% - ${grid('xl')})`,
		marginTop: grid('l'),
	},
};

class Editor extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
	}

	componentWillMount() {
		if (this.props.presetImage) {
			this.props.useUrlImage(
				decodeURIComponent(this.props.presetImage),
				this.props.presetImageWidth,
				this.props.presetImageHeight,
			);
		}
	}

	render() {
		return (
			<div className={this.classes.container}>
				<StartupEditorChooser
					visible={this.props.mode === MODES.INIT}
					onClickCreateCanvas={() => {
						this.props.setMode(MODES.EDITOR);
					}}
					onClickChoosePicture={() => {
						this.props.setMode(MODES.CHOOSE_PICTURE);
					}}
				/>
				<PictureChooser
					visible={this.props.mode === MODES.CHOOSE_PICTURE}
				/>
				<PicturePreview
					visible={
							this.props.mode === MODES.CHOOSE_PARAMETERS ||
							this.props.mode === MODES.CONVERSION_FINISHED
						}
					linkUrl={this.props.linkUrl}
					image={this.props.image}
				/>
				<ConfigureParameterEditor
					visible={
						this.props.mode === MODES.CHOOSE_PARAMETERS ||
						this.props.mode === MODES.CONVERSION_FINISHED
					}
				/>

				<PicturePreview
					visible={this.props.mode === MODES.CONVERSION_FINISHED}
					linkUrl={this.props.linkUrl}
					image={this.props.convertedImage}
					resizeImage={false}
				/>
				<ActionBar
					visible={this.props.mode === MODES.CONVERSION_FINISHED}
					action={() => {
						this.props.usePreviewImageInEditor(
							this.props.convertedImage,
							this.props.tabletSizeX,
							this.props.tabletSizeY,
						);
					}}
				/>

				<CanvasContainer
					visible={this.props.mode === MODES.EDITOR || this.props.mode === MODES.PRINT_PREVIEW}
					tabletSizeX={this.props.tabletSizeX}
					tabletSizeY={this.props.tabletSizeY}
					zoom={this.props.zoom}
					setBead={this.props.setBead}
					setColorFilter={this.props.setColorFilter}
					colorFilter={this.props.colorFilter}
					currentCanvasPictureData={this.props.currentCanvasPictureData}
					setCurrentCanvasColor={this.props.setCurrentCanvasBead}
					currentCanvasBead={this.props.currentCanvasBead}
					currentMode={this.props.mode}
					blockData={this.props.blockData}
				/>
				<CopyUrlPopup
					visible={this.props.showUrlPopup}
					url={this.props.imageShareUrl}
				/>
			</div>
		);
	}
}

Editor.propTypes = {
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	mode: PropTypes.string.isRequired,
	currentCanvasPictureData: PropTypes.objectOf(PropTypes.any).isRequired,
	setBead: PropTypes.func.isRequired,
	setMode: PropTypes.func.isRequired,
	setColorFilter: PropTypes.func.isRequired,
	tabletSizeX: PropTypes.number.isRequired,
	tabletSizeY: PropTypes.number.isRequired,
	zoom: PropTypes.number.isRequired,
	colorFilter: PropTypes.string.isRequired,
	setCurrentCanvasBead: PropTypes.func.isRequired,
	usePreviewImageInEditor: PropTypes.func.isRequired,
	currentCanvasBead: PropTypes.string.isRequired,
	linkUrl: PropTypes.string.isRequired,
	blockData: PropTypes.objectOf(PropTypes.any).isRequired,
	image: jimpImage,
	convertedImage: jimpImage,
	showUrlPopup: PropTypes.bool.isRequired,
	imageShareUrl: PropTypes.string.isRequired,
	presetImage: PropTypes.string,
	useUrlImage: PropTypes.func.isRequired,
	presetImageWidth: PropTypes.number.isRequired,
	presetImageHeight: PropTypes.number.isRequired,
};

Editor.defaultProps = {
	image: null,
	convertedImage: null,
	presetImage: '',
};

export default injectSheet(styles)(Editor);
