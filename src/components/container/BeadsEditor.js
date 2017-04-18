import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { createNewBeadsCanvas, setBead, setCurrentCanvasBead } from '../../actions/index';

import Editor from '../Editor';

const mapStateToProps = state => ({
	tabletSizeX: state.canvas.tabletSizeX,
	tabletSizeY: state.canvas.tabletSizeY,
	currentCanvasPictureData: state.canvas.currentCanvasPictureData,
	currentCanvasName: state.canvas.currentCanvasName,
	currentCanvasMode: state.canvas.currentCanvasMode,
	currentCanvasBead: state.canvas.currentCanvasBead,
	zoom: state.canvas.zoom,
});

const mapDispatchToProps = dispatch => ({
	onCreateCanvasClick: () => {
		dispatch(createNewBeadsCanvas());
	},
	setBead: (x, y, beadId) => {
		dispatch(setBead(x, y, beadId));
	},
	setCurrentCanvasBead: (beadId) => {
		dispatch(setCurrentCanvasBead(beadId));
	},
});

const BeadsEditor =
	DragDropContext(HTML5Backend)(
		connect(
			mapStateToProps,
			mapDispatchToProps,
		)(Editor));

export default BeadsEditor;
