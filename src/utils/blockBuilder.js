import { sortByBlocks } from '../utils/sortFunctions/sortByBlock';

const onlyUnique = (value, index, self) => (
	self.indexOf(value) === index
);

export const blockBuilder = (tableSizeX, tableSizeY, pixels) => {
	const data = [];
	for (let blockY = 0; blockY < tableSizeY; blockY += 1) {
		for (let blockX = 0; blockX < tableSizeX; blockX += 1) {
			for (let x = 0; x < 29; x += 1) {
				for (let y = 0; y < 29; y += 1) {
					const xAbsolute = (29 * blockX) + x;
					const yAbsolute = (29 * blockY) + y;
					let beadData = {};
					const index = pixels.findIndex(element => (
						element.x === xAbsolute && element.y === yAbsolute
					));
					if (index > -1) {
						beadData = pixels[index];
					}
					data.push({
						blockY,
						blockX,
						row: y,
						col: x,
						key: `x${xAbsolute}y${yAbsolute}`,
						x: xAbsolute,
						y: yAbsolute,
						beadData,
					});
				}
			}
		}
	}

	return {
		data,
		blocksY: data.map(entry => (
			entry.blockY
		)).filter(onlyUnique).sort(sortByBlocks),

		blocksX: data.map(entry => (
			entry.blockX
		)).filter(onlyUnique).sort(sortByBlocks),
	};
};

export default blockBuilder;
