import React from 'react';
import injectSheet from '../utils/injectSheet';
import { jssSheet } from '../utils/propTypes';
import grid from '../utils/grid';

import Bead from '../components/Bead';
import StartupEditorChooser from '../components/StartupEditorChooser';
import MenuBar from '../components/MenuBar';

const styles = {
	row: {
		height: grid('xs'),
		width: `${(29 * grid('xs', false))}px`,
	},
	block: {
		border: '3px solid black',
		borderRadius: '10px',
		padding: '0 5px 5px 5px',
		display: 'inline-block',
	},
	blockRow: {
		backgroundColor: 'transparent',
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
	console.log(blocks);
	return blocks;
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
