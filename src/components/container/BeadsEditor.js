import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { setBead, setCurrentCanvasBead } from '../../reducers/canvas';
import { setMode } from '../../reducers/global';

import Editor from '../Editor';

const mapStateToProps = state => ({
	tabletSizeX: state.canvas.tabletSizeX,
	tabletSizeY: state.canvas.tabletSizeY,
	currentCanvasPictureData: state.canvas.currentCanvasPictureData,
	currentCanvasName: state.canvas.currentCanvasName,
	mode: state.global.mode,
	currentCanvasBead: state.canvas.currentCanvasBead,
	zoom: state.canvas.zoom,
	linkUrl: state.converter.linkUrl,
	image: state.converter.image,
	convertedImage: state.converter.convertedImage,
});

const mapDispatchToProps = dispatch => ({
	setBead: (x, y, beadId) => {
		dispatch(setBead(x, y, beadId));
	},
	setCurrentCanvasBead: (beadId) => {
		dispatch(setCurrentCanvasBead(beadId));
	},
	setMode: (mode) => {
		dispatch(setMode(mode));
	},
});

const BeadsEditor =
	DragDropContext(HTML5Backend)(
		connect(
			mapStateToProps,
			mapDispatchToProps,
		)(Editor));

export default BeadsEditor;
