import Jimp from 'jimp';
import { getBeadIdData, colorToHexCode, beadList } from '../utils/beadColors';
import { colorImageInBeadColors } from '../utils/converter';

export const calculateBase64Image = (pixels, sizeX, sizeY) => (
	new Promise((resolve, reject) => {
		// eslint-disable-next-line no-unused-vars
		const image = new Jimp(
			sizeX,
			sizeY,
			0x00000000,
			(err, img) => {
				if (err) reject(err);

				pixels.forEach((pixel) => {
					const beadData = getBeadIdData(pixel.beadId);
					const colorString = colorToHexCode(
						beadData.red,
						beadData.green,
						beadData.blue,
						beadData.alpha,
					);
					img.setPixelColor(
						colorString,
						pixel.x,
						pixel.y,
					);
				});

				img.getBase64(Jimp.MIME_PNG, (err2, img2) => {
					if (err2) {
						reject(err2);
					} else {
						resolve(img2);
					}
				});
			},
		);
	})
);

export const calculateImageFromBase64String = (base64Image, width, height) => (
	new Promise((resolve, reject) => {
		// eslint-disable-next-line no-unused-vars
		const image = new Jimp(
			width,
			height,
			0xFFFFFF00,
			(err, jimpimage) => {
				if (err) reject(err);

				const img = document.createElement('img');
				img.style.width = width;
				img.style.height = height;
				img.onload = () => {
					const canvas = document.createElement('canvas');
					const ctx = canvas.getContext('2d');
					ctx.drawImage(img, 0, 0, width, height);

					for (let y = 0; y < height; y += 1) {
						for (let x = 0; x < width; x += 1) {
							const color = ctx.getImageData(x, y, 1, 1).data;
							jimpimage.setPixelColor(
								Jimp.rgbaToInt(color[0], color[1], color[2], color[3]),
								x,
								y,
							);
						}
					}
					resolve(colorImageInBeadColors(jimpimage, beadList));
				};

				img.src = base64Image;
			});
	})
);

export default calculateBase64Image;

