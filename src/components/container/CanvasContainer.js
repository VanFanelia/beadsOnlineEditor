import React from 'react';
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

const buildBeadsForEditor = (tableSizeX, tableSizeY) => {
	const blocks = [];
	for (let blockX = 0; blockX < tableSizeX; blockX += 1) {
		blocks[blockX] = blocks[blockX] === undefined ? [] : blocks[blockX];
		for (let blockY = 0; blockY < tableSizeY; blockY += 1) {
			blocks[blockX][blockY] = blocks[blockX][blockY] === undefined ? [] : blocks[blockX][blockY];
			for (let x = 0; x < 29; x += 1) {
				for (let y = 0; y < 29; y += 1) {
					if (blocks[blockX][blockY][y] === undefined) {
						blocks[blockX][blockY][y] = [];
					}
					blocks[blockX][blockY][y].push({ key: `x${x}y${y}`, x, y });
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
			onChange={props.onChangeTabletSize}
		/>

		<ColorBar />
		<div className={classes.canvas} >
			<div style={{ zoom: `${props.zoom / 100}` }} >
				{
					buildBeadsForEditor(props.tabletSizeX, props.tabletSizeY)
					.map((blockRow, blockRowCounter) => (
						<div className={classes.blockRow} key={`blockRow${blockRowCounter}`}>
							{ blockRow.map((block, blockCounter) => (
								<div className={classes.block} key={`blockCounter${blockCounter}`}>
									{ block.map((row, rowCounter) => (
										<div className={classes.row} key={`row${rowCounter}`}>
											{row.map(bead => (
												<Bead beadId={bead.key} x={bead.x} y={bead.y} key={bead.key} />
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
	sheet: jssSheet,
	onChangeTabletSize: React.PropTypes.func,
	tabletSizeX: React.PropTypes.number,
	tabletSizeY: React.PropTypes.number,
	visible: React.PropTypes.bool,
	zoom: React.PropTypes.number,
};

CanvasContainer.defaultProps = {
	visible: false,
};

export default connect()(injectSheet(styles)(CanvasContainer));