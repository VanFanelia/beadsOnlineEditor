import React from 'react';
import injectSheet from '../utils/injectSheet';
import { jssSheet } from '../utils/propTypes';
import grid from '../utils/grid';

import { MODES } from '../reducers/global';

import StartupEditorChooser from '../components/StartupEditorChooser';
import CanvasContainer from '../components/container/CanvasContainer';
import PictureChooser from '../components/PictureChooser';
import PicturePreview from '../components/PicturePreview';
import ConfigureParameterEditor from '../components/ConfigureParameterEditor';

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
			visible={props.mode === MODES.CHOOSE_PARAMETERS}
			linkUrl={props.linkUrl}
		/>
		<ConfigureParameterEditor
			visible={props.mode === MODES.CHOOSE_PARAMETERS}
			rawPictureData={props.linkUrl}
		/>
		<CanvasContainer
			visible={props.mode === MODES.EDITOR}
			tabletSizeX={props.tabletSizeX}
			tabletSizeY={props.tabletSizeY}
			zoom={props.zoom}
			setBead={props.setBead}
			currentCanvasPictureData={props.currentCanvasPictureData}
			setCurrentCanvasColor={props.setCurrentCanvasBead}
			currentCanvasBead={props.currentCanvasBead}
		/>
	</div>
);

Editor.propTypes = {
	sheet: jssSheet.isRequired,
	mode: React.PropTypes.string.isRequired,
	currentCanvasPictureData: React.PropTypes.objectOf(React.PropTypes.any).isRequired,
	setBead: React.PropTypes.func.isRequired,
	setMode: React.PropTypes.func.isRequired,
	tabletSizeX: React.PropTypes.number.isRequired,
	tabletSizeY: React.PropTypes.number.isRequired,
	zoom: React.PropTypes.number.isRequired,
	setCurrentCanvasBead: React.PropTypes.func.isRequired,
	currentCanvasBead: React.PropTypes.string.isRequired,
	linkUrl: React.PropTypes.string.isRequired,
};

export default injectSheet(styles)(Editor);
