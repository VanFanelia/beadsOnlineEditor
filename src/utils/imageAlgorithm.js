import { NO_BEAD, transparentBead } from './beadColors';

export const orderCanvasData = (image, width) => {
	const result = {};

	image.forEach((element) => {
		const position = element.x + (element.y * width);
		result[position] = element.beadId;
	});

	return result;
};

export const convertToPixelNotation = (imageHash, width, height) => {
	const result = [];

	for (let x = 0; x < width; x += 1) {
		for (let y = 0; y < height; y += 1) {
			const key = x + (y * width);

			if (key in imageHash && imageHash[key] !== NO_BEAD) {
				result.push(
					{ x, y, beadId: imageHash[key] },
				);
			}
		}
	}

	return result;
};

export const removeTransparentBead = (imageHash, x, y, maxX, maxY) => {
	if (x > maxX || y > maxY || x < 0 || y < 0) {
		return imageHash;
	}
	const current = imageHash[x + (maxX * y)];

	// Allready done
	if (current === NO_BEAD || current !== transparentBead) {
		return imageHash;
	}

	let result = imageHash;
	result[x + (maxX * y)] = NO_BEAD;

	result = removeTransparentBead(result, x - 1, y, maxX, maxY); // left
	result = removeTransparentBead(result, x, y + 1, maxX, maxY); // bottom
	result = removeTransparentBead(result, x + 1, y, maxX, maxY); // right
	result = removeTransparentBead(result, x, y - 1, maxX, maxY); // top

	return result;
};

export const removeSurroundingTransparentBeads = (pixels, width, height) => {
	let imageHash = orderCanvasData(pixels, width, height);

	for (let n = 0; n < width; n += 1) {
		imageHash = removeTransparentBead(imageHash, n, 0, width - 1, height - 1); // top
		imageHash = removeTransparentBead(imageHash, n, height - 1, width - 1, height - 1); // bottom
		imageHash = removeTransparentBead(imageHash, 0, n, width - 1, height - 1); // left
		imageHash = removeTransparentBead(imageHash, width - 1, n, width - 1, height - 1); // right
	}

	return convertToPixelNotation(imageHash, width, height);
};

export default removeSurroundingTransparentBeads;

