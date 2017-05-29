import Jimp from 'jimp';
import { BEAD_PLATE_WIDTH, BEAD_PLATE_HEIGHT } from './constants';
import { beadList } from './beadColors';
import { RESIZE_OPTION_SCALE_MAX_SPACE } from './scaleOptions';


export const calculateResizeCubic = (
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

export const calculateResizeMaxSpace = (
	width,
	height,
	widthLimit = BEAD_PLATE_WIDTH,
	heightLimit = BEAD_PLATE_HEIGHT,
) => {
	if (!(typeof width === 'number') || !(typeof height === 'number')) {
		return null;
	}

	if (width <= 0 || height <= 0) {
		return null;
	}

	const differenceWidth = width - widthLimit;
	const differenceHeight = height - heightLimit;

	if (differenceWidth >= differenceHeight) {
		return {
			width: Math.round(widthLimit),
			height: Math.round(height * Math.abs(widthLimit / width)),
		};
	}
	return {
		width: Math.round(width * Math.abs(heightLimit / height)),
		height: Math.round(heightLimit),
	};
};

/**
 * Calculate the difference between 2 colors with a fast algorithmus.
 * It's function is explained on http://www.compuphase.com/cmetric.htm
 * The Distance is not the standard distance in the RGB Color palette, its
 * also based on the humans ability to see colors.
 * The distance is not just an Euclidean distance. Its an weighted Euclidean distance.
 *
 * @param colorA the base color
 * @param colorB the color to compare with
 * @return the distance between the colors a and b
 */
export const getDistanceBetween2Colors = (colorA, colorB) => {
	const redColorFactor = (colorA.red + colorB.red) / 2;
	const deltaRed = colorA.red - colorB.red;
	const deltaGreen = colorA.green - colorB.green;
	const deltaBlue = colorA.blue - colorB.blue;

	/* eslint-disable no-bitwise */
	return Math.sqrt(
		(((512 + redColorFactor) * deltaRed * deltaRed) >> 8)
		+ (4 * deltaGreen * deltaGreen)
		+ (((767 - deltaRed) * deltaBlue * deltaBlue) >> 8),
	);
	/* eslint-enable not-bitwise */
};


export const getNearestColor = (color, availableColors) => {
	if (color.alpha === 0) {
		return beadList.H19;
	}

	const distance = {};
	Object.keys(availableColors).forEach((key) => {
		distance[key] = getDistanceBetween2Colors(color, availableColors[key]);
	});

	let minDistance = { name: 'unknown', distance: Number.MAX_SAFE_INTEGER };

	Object.keys(distance).forEach((key) => {
		if (distance[key] < minDistance.distance) {
			minDistance = { name: key, distance: distance[key] };
		}
	});

	return beadList[minDistance.name];
};

export const colorImageInBeadColors = (image, beads) => {
	for (let x = 0; x < image.bitmap.width; x += 1) {
		for (let y = 0; y < image.bitmap.height; y += 1) {
			const color = Jimp.intToRGBA(image.getPixelColor(x, y));
			const currentPixel = { red: color.r, green: color.g, blue: color.b, alpha: color.a };
			const nearestColor = getNearestColor(currentPixel, beads);
			image.setPixelColor(Jimp.rgbaToInt(
				nearestColor.red,
				nearestColor.green,
				nearestColor.blue,
				nearestColor.alpha), x, y);
		}
	}
	return image;
};

const convert = (
	image,
	selectedAlgorithm,
	maxWidth,
	maxHeight,
	usedBeadTypes,
	selectedScaleOption) => {
	if (image === undefined || image.bitmap === undefined ||
			image.bitmap.width === undefined || image.bitmap.height === undefined
	) {
		console.error('not enough data to convert');
		return null;
	}

	let newImageSize;

	if (selectedScaleOption === RESIZE_OPTION_SCALE_MAX_SPACE) {
		newImageSize = calculateResizeMaxSpace(
			image.bitmap.width,
			image.bitmap.height,
			maxWidth * BEAD_PLATE_WIDTH,
			maxHeight * BEAD_PLATE_HEIGHT,
		);
	} else {
		newImageSize = calculateResizeCubic(
			image.bitmap.width,
			image.bitmap.height,
			maxWidth * BEAD_PLATE_WIDTH,
			maxHeight * BEAD_PLATE_HEIGHT,
		);
	}

	if (newImageSize == null) {
		return null;
	}

	// resize with algorithm
	let resizedImage = image.clone();
	console.log(selectedAlgorithm);
	resizedImage.resize(newImageSize.width, newImageSize.height, selectedAlgorithm);

	// TODO: filter beadList by using usedBeadTypes

	// color with beads
	resizedImage = colorImageInBeadColors(resizedImage, beadList);
	console.log(resizedImage.bitmap.width, resizedImage.bitmap.height);
	console.log(resizedImage.hash());
	return resizedImage;
};


export default convert;
