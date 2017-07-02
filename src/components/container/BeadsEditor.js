import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { setBead, setCurrentCanvasBead, transferPreviewImageInToEditor, removeSurroundingTransparentBeadsAction, setColorFilter } from '../../reducers/canvas';
import { setMode } from '../../reducers/global';
import { blockBuilder } from '../../utils/blockBuilder';

import Editor from '../Editor';

const mapStateToProps = state => ({
	tabletSizeX: state.canvas.tabletSizeX,
	tabletSizeY: state.canvas.tabletSizeY,
	currentCanvasPictureData: state.canvas.currentCanvasPictureData,
	currentCanvasName: state.canvas.currentCanvasName,
	mode: state.global.mode,
	currentCanvasBead: state.canvas.currentCanvasBead,
	zoom: state.canvas.zoom,
	colorFilter: state.canvas.colorFilter,
	linkUrl: state.converter.linkUrl,
	image: state.converter.image,
	convertedImage: state.converter.convertedImage,
	blockData: blockBuilder(
		state.canvas.tabletSizeX,
		state.canvas.tabletSizeY,
		state.canvas.currentCanvasPictureData.pixels),
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
	usePreviewImageInEditor: (image, tabletSizeX, tabletSizeY) => {
		dispatch(transferPreviewImageInToEditor(image, tabletSizeX, tabletSizeY));
		dispatch(removeSurroundingTransparentBeadsAction(image));
	},
	setColorFilter: (category) => {
		dispatch(setColorFilter(category));
	},
});

const BeadsEditor =
	DragDropContext(HTML5Backend)(
		connect(
			mapStateToProps,
			mapDispatchToProps,
		)(Editor));

export default BeadsEditor;
