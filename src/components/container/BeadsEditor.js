import { connect } from 'react-redux';
import { createNewBeadsCanvas, changeTabletSize, changeZoom } from '../../actions/index';

import Editor from '../Editor';

const mapStateToProps = state => ({
	tabletSizeX: state.canvas.tabletSizeX,
	tabletSizeY: state.canvas.tabletSizeY,
	currentCanvasPictureData: state.canvas.currentCanvasPictureData,
	currentCanvasName: state.canvas.currentCanvasName,
	currentCanvasMode: state.canvas.currentCanvasMode,
	zoom: state.canvas.zoom,
});

const mapDispatchToProps = dispatch => ({
	onCreateCanvasClick: () => {
		dispatch(createNewBeadsCanvas());
	},
	onChangeTabletSize: () => {
		dispatch(changeTabletSize());
	},
	onChangeZoom: () => {
		dispatch(changeZoom());
	},
});

const BeadsEditor = connect(
	mapStateToProps,
	mapDispatchToProps,
)(Editor);

export default BeadsEditor;
