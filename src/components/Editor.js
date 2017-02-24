import React from 'react';
import injectSheet from '../utils/injectSheet';
import { jssSheet } from '../utils/propTypes';

import SimpleIntro from '../components/SimpleIntro';
import StartupEditorChooser from '../components/StartupEditorChooser';
import MenuBar from '../components/MenuBar';

const styles = {
	wrapper: {
		margin: '2em 1em',
	},
};

const Editor = ({ sheet: { classes }, ...props }) => (
	<div>
		<StartupEditorChooser visible={props.currentCanvasMode === 'init'} onCreateCanvasClick={props.onCreateCanvasClick} />
		<MenuBar
			tabletSizeX={props.tabletSizeX}
			tabletSizeY={props.tabletSizeY}
			visible={props.currentCanvasMode === 'editor'}
			onChange={props.onChangeTabletSize}
		/>
		<div className={classes.canvas} >
			for (var i=i; i < 29; i++) {
				<ObjectRow obj={objects[i]} key={i}>
			}
		</div>
	</div>
);

Editor.propTypes = {
	sheet: jssSheet,
	currentCanvasMode: React.PropTypes.string,
	onCreateCanvasClick: React.PropTypes.func,
	onChangeTabletSize: React.PropTypes.func,
	tabletSizeX: React.PropTypes.number,
	tabletSizeY: React.PropTypes.number,
};

export default injectSheet(styles)(Editor);
