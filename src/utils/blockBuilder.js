import { sortByBlocks } from '../utils/sortFunctions/sortByBlock';

const onlyUnique = (value, index, self) => (
	self.indexOf(value) === index
);

export const blockBuilder = (tableSizeX, tableSizeY, pixels) => {
	const data = [];
	const blockColorSums = [];
	const usedBeadIds = [];
	for (let blockY = 0; blockY < tableSizeY; blockY += 1) {
		for (let blockX = 0; blockX < tableSizeX; blockX += 1) {
			const blockColors = [];
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
						const counter = blockColors.find(entry => (entry.id === beadData.beadId));
						if (counter === undefined) {
							blockColors.push({ id: beadData.beadId, sum: 1 });
							usedBeadIds.push(beadData.beadId);
						} else {
							counter.sum += 1;
						}
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
			blockColorSums.push({ blockX, blockY, blockColors });
		}
	}

	const totalSums = usedBeadIds.filter(onlyUnique).map((beadId) => {
		const sumColor = blockColorSums.map((entry) => {
			const beadWithId = entry.blockColors.find(search => (search.id === beadId));
			return beadWithId === undefined ? 0 : beadWithId.sum;
		}).reduce((acc, val) => (
			acc + val
		), 0);
		return { id: beadId, sum: sumColor };
	});

	return {
		data,
		blockColorSums,
		totalSums,
		blocksY: data.map(entry => (
			entry.blockY
		)).filter(onlyUnique).sort(sortByBlocks),

		blocksX: data.map(entry => (
			entry.blockX
		)).filter(onlyUnique).sort(sortByBlocks),
	};
};

export default blockBuilder;
