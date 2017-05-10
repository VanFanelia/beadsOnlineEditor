
const convert = (image, selectedAlgorithm, maxWidth, maxHeight, usedBeadTypes) => {

	if (image === undefined || image.bitmap === undefined ||
			image.bitmap.width === undefined || image.bitmap.height === undefined
	) {
		console.error('not enough data to convert');
		return undefined;
	}

	console.log('converting...');

	// calculate resize

	// resize with algorithm

	// color with beads

	console.log('converting done');
	return undefined;
};

export default convert;
