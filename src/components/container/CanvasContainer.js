import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Bead from '../Bead';
import MenuBar from '../MenuBar';
import ColorBar from '../ColorBar';
import PrintPreview from '../PrintPreview';

import injectSheet from '../../utils/injectSheet';
import { jssSheet } from '../../utils/propTypes';
import { MODES } from '../../reducers/global';

import grid from '../../utils/grid';
import blockBuilder from '../../utils/blockBuilder';

const styles = {
	canvasContainer: {
		position: 'relative',
		height: '100%',
	},
	hide: {
		display: 'none',
	},
	canvas: {
		paddingRight: grid('xxxl + xxl'),
		paddingTop: grid('m'),
		maxHeight: `calc(100% - ${grid('xxl')} )`,
	},
	zoom: {
		overflow: 'auto',
	},
	row: {
		height: grid('xs'),
		width: `${(29 * grid('xs', false))}px`,
	},
	block: {
		border: '3px solid black',
		borderRadius: '10px',
		padding: '0 5px 5px 5px',
		margin: `0 ${grid('xs')} 0 0 `,
		display: 'inline-block',
		'&:last-child': {
			margin: 0,
		},
	},
	blockRow: {
		backgroundColor: 'transparent',
		whiteSpace: 'noWrap',
		margin: `0 0 ${grid('xs')} 0`,
		'&:last-child': {
			margin: 0,
		},
	},
};

const CanvasContainer = ({ sheet: { classes }, ...props }) => {
	const blockData = blockBuilder(
		props.tabletSizeX,
		props.tabletSizeY,
		props.currentCanvasPictureData.pixels);

	return (<div
		className={classNames({ [classes.canvasContainer]: true,
			[classes.hide]: !props.visible })}
	>
		<MenuBar
			tabletSizeX={props.tabletSizeX}
			tabletSizeY={props.tabletSizeY}
			zoom={props.zoom}
		/>

		<ColorBar
			visible={props.currentMode === MODES.EDITOR}
			setCurrentCanvasColor={props.setCurrentCanvasColor}
			currentCanvasBead={props.currentCanvasBead}
		/>
		<div
			className={classNames({
				[classes.canvas]: true,
				[classes.hide]: props.currentMode !== MODES.EDITOR,
			})}
		>
			<div className={classes.zoom} style={{ zoom: `${props.zoom / 100}` }} >
				{
					blockData.map((blockRow, blockRowCounter) => (
						// eslint-disable-next-line react/no-array-index-key
						<div className={classes.blockRow} key={`blockRow${blockRowCounter}`}>
							{ blockRow.map((block, blockCounter) => (
								// eslint-disable-next-line react/no-array-index-key
								<div className={classes.block} key={`blockCounter${blockCounter}`}>
									{ block.map((row, rowCounter) => (
										// eslint-disable-next-line react/no-array-index-key
										<div className={classes.row} key={`row${rowCounter}`}>
											{row.map(bead => (
												<Bead
													beadId={bead.key}
													x={bead.x}
													y={bead.y}
													key={bead.key}
													setBead={props.setBead}
													beadData={bead.beadData}
													currentCanvasBead={props.currentCanvasBead}
												/>
											))}
										</div>
									))}
								</div>
							))}
						</div>
					))
				}
			</div>
		</div>

		<PrintPreview
			visible={props.currentMode === MODES.PRINT_PREVIEW}
			blockData={blockData}
		/>
	</div>
	);
};

CanvasContainer.propTypes = {
	sheet: jssSheet.isRequired,
	setBead: PropTypes.func.isRequired,
	tabletSizeX: PropTypes.number,
	tabletSizeY: PropTypes.number,
	visible: PropTypes.bool,
	zoom: PropTypes.number,
	currentCanvasPictureData: PropTypes.objectOf(PropTypes.any).isRequired,
	setCurrentCanvasColor: PropTypes.func.isRequired,
	currentCanvasBead: PropTypes.string.isRequired,
	currentMode: PropTypes.string.isRequired,
};

CanvasContainer.defaultProps = {
	visible: false,
	tabletSizeX: 1,
	tabletSizeY: 1,
	zoom: 100,
};

export default connect()(injectSheet(styles)(CanvasContainer));
