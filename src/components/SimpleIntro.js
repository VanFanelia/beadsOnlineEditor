import React from 'react';
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
	children: React.PropTypes.node,
	sheet: jssSheet,
};

export default injectSheet(styles)(SimpleIntro);
