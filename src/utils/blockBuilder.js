const blockBuilder = (tableSizeX, tableSizeY, pixels) => {
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

export default blockBuilder;
