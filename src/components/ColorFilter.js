import React from 'react';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import { jssSheet } from '../utils/propTypes';
import { transparent } from '../style/colors';
import blankBead from '../graphics/BlankBead.svg';

const styles = {
	colorList: {
		padding: 0,
		margin: 0,
		listStyleType: 'none',
		display: 'flex',
		justifyContent: 'space-between',
	},
	filter: {
		display: 'block',
	},
	button: {
		width: grid('s'),
		height: grid('s'),
	},
	gray: { backgroundColor: 'gray' },
	yellow: { backgroundColor: 'yellow' },
	orange: { backgroundColor: 'orange' },
	red: { backgroundColor: 'red' },
	green: { backgroundColor: 'green' },
	blue: { backgroundColor: 'blue' },
	purple: { backgroundColor: 'purple' },
	brown: { backgroundColor: 'brown' },
};

const ColorFilter = ({ sheet: { classes }, ...props }) => (
	<ul className={classes.colorList}>
		<li className={classes.filter}>
			<button className={classNames({ [classes.button]: true, [classes.gray]: true })}>&nbsp;</button>
			<button className={classNames({ [classes.button]: true, [classes.yellow]: true })}>&nbsp;</button>
			<button className={classNames({ [classes.button]: true, [classes.orange]: true })}>&nbsp;</button>
			<button className={classNames({ [classes.button]: true, [classes.red]: true })}>&nbsp;</button>
			<button className={classNames({ [classes.button]: true, [classes.green]: true })}>&nbsp;</button>
			<button className={classNames({ [classes.button]: true, [classes.blue]: true })}>&nbsp;</button>
			<button className={classNames({ [classes.button]: true, [classes.purple]: true })}>&nbsp;</button>
			<button className={classNames({ [classes.button]: true, [classes.brown]: true })}>&nbsp;</button>
		</li>
	</ul>
);

ColorFilter.propTypes = {
	sheet: jssSheet,
};

ColorFilter.defaultProps = {
};

export default injectSheet(styles)(ColorFilter);
