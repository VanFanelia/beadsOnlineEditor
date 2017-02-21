import { PropTypes } from 'react';

export const jssSheet = PropTypes.shape({
	classes: PropTypes.objectOf(PropTypes.string),
});

export const jssClasses = PropTypes.objectOf(PropTypes.string);

export default { jssSheet };
