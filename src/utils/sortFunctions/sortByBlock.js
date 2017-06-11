export const sortByBlocks = (a, b) => {
	if (a.blockY < b.blockY) {
		return -1;
	}
	if (a.blockY > b.blockY) {
		return 1;
	}
	if (a.blockX < b.blockX) {
		return -1;
	}
	if (a.blockX > b.blockX) {
		return 1;
	}
	return 0;
};

export default sortByBlocks;
