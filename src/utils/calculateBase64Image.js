import Jimp from 'jimp';
import { getBeadIdData, colorToHexCode } from '../utils/beadColors';

export const calculateBase64Image = (pixels, sizeX, sizeY) => (
	new Promise((resolve, reject) => {
		const image = new Jimp(
			sizeX,
			sizeY,
			0x00000000,
			(err) => {
				if (err) reject(err);
			},
		);

		pixels.forEach((pixel) => {
			const beadData = getBeadIdData(pixel.beadId);
			const colorString = colorToHexCode(
				beadData.red,
				beadData.green,
				beadData.blue,
				beadData.alpha,
			);
			image.setPixelColor(
				colorString,
				pixel.x,
				pixel.y,
			);
		});

		image.getBase64(Jimp.MIME_PNG, (err, img) => {
			if (err) {
				reject(err);
			} else {
				resolve(img);
			}
		});
	})
);

export default calculateBase64Image;

