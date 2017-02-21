import hash from 'murmurhash-js/murmurhash3_gc';

const getAnimationIdentifier = name => (`animation${hash(name)}`);

export const spin = getAnimationIdentifier('spin');

export default {
	[`@keyframes ${spin}`]: {
		from: { transform: 'rotate(0deg)' },
		to: { transform: 'rotate(360deg)' },
	},
};
