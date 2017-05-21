import { BEAD_PLATE_WIDTH, BEAD_PLATE_HEIGHT } from './constants';

export const calculateResize = (
	width,
	height,
	widthLimit = BEAD_PLATE_WIDTH,
	heightLimit = BEAD_PLATE_HEIGHT) => {
	if (!(typeof width === 'number') || !(typeof height === 'number')) {
		return null;
	}

	if (width <= 0 || height <= 0) {
		return null;
	}

	let calculatedWidth = width;
	let calculatedHeight = height;
	while (calculatedWidth > widthLimit || calculatedHeight > heightLimit) {
		calculatedWidth /= 2;
		calculatedHeight /= 2;
	}

	return { width: calculatedWidth, height: calculatedHeight };
};

export const colorImageInBeadColors = (image, beadTypes) => {
	for (let x = 0; x < image.bitmap.width; x += 1) {
		for (let y = 0; y < image.bitmap.height; y += 1) {
			//image.setPixelColor(hex, x, y);
		}
	}
};


const convert = (image, selectedAlgorithm, maxWidth, maxHeight, usedBeadTypes) => {
	if (image === undefined || image.bitmap === undefined ||
			image.bitmap.width === undefined || image.bitmap.height === undefined
	) {
		console.error('not enough data to convert');
		return null;
	}

	console.log('converting...');

	const newImageSize = calculateResize(
		image.bitmap.width,
		image.bitmap.height,
		maxWidth * BEAD_PLATE_WIDTH,
		maxHeight * BEAD_PLATE_HEIGHT,
	);

	if (newImageSize == null) {
		return null;
	}

	// resize with algorithm
	const resizedImage = image.clone();
	resizedImage.resize(newImageSize.width, newImageSize.height, selectedAlgorithm);

	// color with beads
	colorImageInBeadColors(resizedImage, usedBeadTypes);
	return resizedImage;
};


export default convert;
