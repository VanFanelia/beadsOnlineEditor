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
		<SimpleIntro className={classes.wrapper}>
			<p>React Components make creating websites finally feel clean and productive.</p>
			<p>
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
				tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
			</p>
			<p>
				At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
				no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
				consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
				dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
				Lorem ipsum dolor sit amet.
			</p>
		</SimpleIntro>
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
