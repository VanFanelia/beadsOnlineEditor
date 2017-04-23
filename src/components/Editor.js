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
			onChangeTabletSize={props.onChangeTabletSize}
			onChangeZoom={props.onChangeZoom}
			setBead={props.setBead}
			currentCanvasPictureData={props.currentCanvasPictureData}
			setCurrentCanvasColor={props.setCurrentCanvasBead}
			currentCanvasBead={props.currentCanvasBead}
		/>
	</div>
);

Editor.propTypes = {
	sheet: jssSheet,
	mode: React.PropTypes.string,
	currentCanvasPictureData: React.PropTypes.objectOf(React.PropTypes.any),
	onClickCreateCanvas: React.PropTypes.func,
	onClickChoosePicture: React.PropTypes.func,
	onChangeTabletSize: React.PropTypes.func,
	onChangeZoom: React.PropTypes.func,
	setBead: React.PropTypes.func,
	setMode: React.PropTypes.func,
	tabletSizeX: React.PropTypes.number,
	tabletSizeY: React.PropTypes.number,
	zoom: React.PropTypes.number,
	setCurrentCanvasBead: React.PropTypes.func,
	currentCanvasBead: React.PropTypes.string,
	linkUrl: React.PropTypes.string,
};

export default injectSheet(styles)(Editor);
