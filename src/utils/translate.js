import keys from './languageKeys';

const translate = (key, lang = 'de_DE') => {
	if (lang in keys && key in keys[lang]) {
		return keys[lang][key];
	}

	console.log(`Warning: cannont find LK: ${key}`);
	return key;
};

export default translate;
