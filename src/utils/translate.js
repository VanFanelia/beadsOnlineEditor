import keys from './languageKeys';

export const translate = (key, lang = 'de_DE') => {
	if (lang in keys && key in keys[lang]) {
		return keys[lang][key];
	}

	// eslint-disable-next-line no-console
	console.error(`Warning: cannot find LK: ${key}`);
	return key;
};

export default translate;
