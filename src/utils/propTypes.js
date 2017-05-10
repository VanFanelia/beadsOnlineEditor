import PropTypes from 'prop-types';

export const jssSheet = PropTypes.shape({
	classes: PropTypes.objectOf(PropTypes.string),
});

export const jssClasses = PropTypes.objectOf(PropTypes.string);

export const jimpImage = PropTypes.shape({
	bitmap: PropTypes.shape({
		data: PropTypes.object,
		height: PropTypes.number,
		width: PropTypes.number,
	}),
	_originalMime: PropTypes.string,
});

export default { jssSheet };
