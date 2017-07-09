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
import { sortByPosition } from '../../utils/sortFunctions/sortByPosition';

import grid from '../../utils/grid';

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

const CanvasContainer = ({ sheet: { classes }, ...props }) => (
	<div
		className={classNames({ [classes.canvasContainer]: true,
			[classes.hide]: !props.visible })}
	>
		<MenuBar
			tabletSizeX={props.tabletSizeX}
			tabletSizeY={props.tabletSizeY}
			zoom={props.zoom}
			currentMode={props.currentMode}
			currentCanvasPictureData={props.currentCanvasPictureData}
		/>

		<ColorBar
			visible={props.currentMode === MODES.EDITOR}
			setCurrentCanvasColor={props.setCurrentCanvasColor}
			setColorFilter={props.setColorFilter}
			colorFilter={props.colorFilter}
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
					props.blockData.blocksY.map(row => (
						<div className={classes.blockRow} key={`blockRow${row}`}>
							{ props.blockData.blocksX.map(col => (
								<div className={classes.block} key={`block-${row}-${col}`}>
									{
										[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
											11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
											21, 22, 23, 24, 25, 26, 27, 28].map(rowInBlock => (
												<div className={classes.row} key={`block-${row}-${col}-${rowInBlock}`}>
													{ props.blockData.data.filter(entry => (
														entry.blockY === row && entry.blockX === col && entry.row === rowInBlock
													)).sort(sortByPosition).map(bead => (
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
			blockData={props.blockData}
		/>
	</div>
);

CanvasContainer.propTypes = {
	sheet: jssSheet.isRequired,
	setBead: PropTypes.func.isRequired,
	setColorFilter: PropTypes.func.isRequired,
	colorFilter: PropTypes.string.isRequired,
	tabletSizeX: PropTypes.number,
	tabletSizeY: PropTypes.number,
	visible: PropTypes.bool,
	zoom: PropTypes.number,
	currentCanvasPictureData: PropTypes.objectOf(PropTypes.any).isRequired,
	setCurrentCanvasColor: PropTypes.func.isRequired,
	currentCanvasBead: PropTypes.string.isRequired,
	currentMode: PropTypes.string.isRequired,
	blockData: PropTypes.objectOf(PropTypes.any).isRequired,
};

CanvasContainer.defaultProps = {
	visible: false,
	tabletSizeX: 1,
	tabletSizeY: 1,
	zoom: 100,
};

export default connect()(injectSheet(styles)(CanvasContainer));
