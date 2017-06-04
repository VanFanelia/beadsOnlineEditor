import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Bead from '../Bead';
import MenuBar from '../MenuBar';
import ColorBar from '../ColorBar';

import injectSheet from '../../utils/injectSheet';
import { jssSheet } from '../../utils/propTypes';

import grid from '../../utils/grid';

const styles = {
	canvasContainer: {
		position: 'relative',
		height: '100%',
		display: 'none',
	},
	visible: {
		display: 'block',
	},
	canvas: {
		marginRight: grid('xxxl + xxl'),
		marginTop: grid('s'),
		overflow: 'scroll',
		maxHeight: `calc(100% - ${grid('xxl')} )`,
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

const buildBeadsForEditor = (tableSizeX, tableSizeY, pixels) => {
	const blocks = [];
	for (let blockY = 0; blockY < tableSizeY; blockY += 1) {
		blocks[blockY] = blocks[blockY] === undefined ? [] : blocks[blockY];
		for (let blockX = 0; blockX < tableSizeX; blockX += 1) {
			blocks[blockY][blockX] = blocks[blockY][blockX] === undefined ? [] : blocks[blockY][blockX];
			for (let x = 0; x < 29; x += 1) {
				for (let y = 0; y < 29; y += 1) {
					if (blocks[blockY][blockX][y] === undefined) {
						blocks[blockY][blockX][y] = [];
					}
					const xAbsolute = (29 * blockX) + x;
					const yAbsolute = (29 * blockY) + y;
					let beadData = {};
					const index = pixels.findIndex(element => (
						element.x === xAbsolute && element.y === yAbsolute
					));
					if (index > -1) {
						beadData = pixels[index];
					}
					blocks[blockY][blockX][y].push({ key: `x${xAbsolute}y${yAbsolute}`, x: xAbsolute, y: yAbsolute, beadData });
				}
			}
		}
	}
	return blocks;
};

const CanvasContainer = ({ sheet: { classes }, ...props }) => (
	<div
		className={classNames({ [classes.canvasContainer]: true,
			[classes.visible]: props.visible })}
	>
		<MenuBar
			tabletSizeX={props.tabletSizeX}
			tabletSizeY={props.tabletSizeY}
			zoom={props.zoom}
		/>

		<ColorBar
			setCurrentCanvasColor={props.setCurrentCanvasColor}
			currentCanvasBead={props.currentCanvasBead}
		/>
		<div className={classes.canvas} >
			<div style={{ zoom: `${props.zoom / 100}` }} >
				{
					buildBeadsForEditor(
						props.tabletSizeX,
						props.tabletSizeY,
						props.currentCanvasPictureData.pixels)
					.map((blockRow, blockRowCounter) => (
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
	</div>
);

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
};

CanvasContainer.defaultProps = {
	visible: false,
	tabletSizeX: 1,
	tabletSizeY: 1,
	zoom: 100,
};

export default connect()(injectSheet(styles)(CanvasContainer));
