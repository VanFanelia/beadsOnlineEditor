import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from '../utils/injectSheet';
import { jssSheet } from '../utils/propTypes';

const styles = {
	wrapper: {
		margin: '2em 1em',
		fontSize: 'large',
	},
};

const SimpleIntro = ({ sheet: { classes }, ...props }) => (
	<div className={classes.wrapper}>
		{ props.children }
	</div>
);

SimpleIntro.propTypes = {
	children: PropTypes.node.isRequired,
	sheet: jssSheet.isRequired,
};

export default injectSheet(styles)(SimpleIntro);
