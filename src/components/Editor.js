import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from '../utils/injectSheet';
import { jssSheet, jimpImage } from '../utils/propTypes';
import grid from '../utils/grid';

import { MODES } from '../reducers/global';

import StartupEditorChooser from '../components/StartupEditorChooser';
import CanvasContainer from '../components/container/CanvasContainer';
import PictureChooser from '../components/PictureChooser';
import PicturePreview from '../components/PicturePreview';
import ConfigureParameterEditor from '../components/ConfigureParameterEditor';
import ActionBar from '../components/ActionBar';

const styles = {
	container: {
		textAlign: 'center',
		position: 'absolute',
		left: 0,
		top: 0,
		width: '100%',
		height: `calc(100% - ${grid('xl')})`,
		marginTop: grid('xl'),
	},
};

const Editor = ({ sheet: { classes }, ...props }) => (
	<div className={classes.container}>
		<StartupEditorChooser
			visible={props.mode === MODES.INIT}
			onClickCreateCanvas={() => { props.setMode(MODES.EDITOR); }}
			onClickChoosePicture={() => { props.setMode(MODES.CHOOSE_PICTURE); }}
		/>
		<PictureChooser
			visible={props.mode === MODES.CHOOSE_PICTURE}
		/>
		<PicturePreview
			visible={props.mode === MODES.CHOOSE_PARAMETERS || props.mode === MODES.CONVERSION_FINISHED}
			linkUrl={props.linkUrl}
			image={props.image}
		/>
		<ConfigureParameterEditor
			visible={props.mode === MODES.CHOOSE_PARAMETERS || props.mode === MODES.CONVERSION_FINISHED}
		/>

		<PicturePreview
			visible={props.mode === MODES.CONVERSION_FINISHED}
			linkUrl={props.linkUrl}
			image={props.convertedImage}
			resizeImage={false}
		/>
		<ActionBar
			visible={props.mode === MODES.CONVERSION_FINISHED}
			action={() => {
				props.usePreviewImageInEditor(
					props.convertedImage,
					props.tabletSizeX,
					props.tabletSizeY,
				);
			}}
		/>

		<CanvasContainer
			visible={props.mode === MODES.EDITOR || props.mode === MODES.PRINT_PREVIEW}
			tabletSizeX={props.tabletSizeX}
			tabletSizeY={props.tabletSizeY}
			zoom={props.zoom}
			setBead={props.setBead}
			currentCanvasPictureData={props.currentCanvasPictureData}
			setCurrentCanvasColor={props.setCurrentCanvasBead}
			currentCanvasBead={props.currentCanvasBead}
			currentMode={props.mode}
		/>
	</div>
);

Editor.propTypes = {
	sheet: jssSheet.isRequired,
	mode: PropTypes.string.isRequired,
	currentCanvasPictureData: PropTypes.objectOf(PropTypes.any).isRequired,
	setBead: PropTypes.func.isRequired,
	setMode: PropTypes.func.isRequired,
	tabletSizeX: PropTypes.number.isRequired,
	tabletSizeY: PropTypes.number.isRequired,
	zoom: PropTypes.number.isRequired,
	setCurrentCanvasBead: PropTypes.func.isRequired,
	usePreviewImageInEditor: PropTypes.func.isRequired,
	currentCanvasBead: PropTypes.string.isRequired,
	linkUrl: PropTypes.string.isRequired,
	image: jimpImage,
	convertedImage: jimpImage,
};

Editor.defaultProps = {
	image: null,
	convertedImage: null,
};

export default injectSheet(styles)(Editor);
