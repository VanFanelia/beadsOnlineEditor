import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from '../utils/injectSheet';
import { jssSheet, jssClasses } from '../utils/propTypes';

const styles = {
	circle: {
		display: 'block',
		fontWeight: 'bold',
	},
};

const Circle = ({ sheet: { classes }, ...props }) => (
	<span className={classes.circle} style={{ color: props.color, opacity: props.alpha / 255 }}>
		&#11044;
	</span>
);

Circle.propTypes = {
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	color: PropTypes.string,
	alpha: PropTypes.number,
};

Circle.defaultProps = {
	color: '#000000',
	alpha: '0',
};

export default injectSheet(styles)(Circle);
