import React from 'react';
import injectSheet from '../utils/injectSheet';
import { jssSheet } from '../utils/propTypes';
import grid from '../utils/grid';

import StartupEditorChooser from '../components/StartupEditorChooser';
import CanvasContainer from '../components/container/CanvasContainer';

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
		<StartupEditorChooser visible={props.currentCanvasMode === 'init'} onCreateCanvasClick={props.onCreateCanvasClick} />
		<CanvasContainer
			visible={props.currentCanvasMode === 'editor'}
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
	currentCanvasMode: React.PropTypes.string,
	currentCanvasPictureData: React.PropTypes.objectOf(React.PropTypes.any),
	onCreateCanvasClick: React.PropTypes.func,
	onChangeTabletSize: React.PropTypes.func,
	onChangeZoom: React.PropTypes.func,
	setBead: React.PropTypes.func,
	tabletSizeX: React.PropTypes.number,
	tabletSizeY: React.PropTypes.number,
	zoom: React.PropTypes.number,
	setCurrentCanvasBead: React.PropTypes.func,
	currentCanvasBead: React.PropTypes.string,
};

export default injectSheet(styles)(Editor);
