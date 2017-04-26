import React from 'react';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import { jssSheet } from '../utils/propTypes';
import { filterBlue, filterBrown, filterGray, filterGreen, filterOrange, filterPurple, filterRed, filterYellow } from '../style/colors';

const styles = {
	colorList: {
		margin: `0 0 ${grid('xs')} 0`,
		padding: 0,
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
	gray: { backgroundColor: filterGray },
	yellow: { backgroundColor: filterYellow },
	orange: { backgroundColor: filterOrange },
	red: { backgroundColor: filterRed },
	green: { backgroundColor: filterGreen },
	blue: { backgroundColor: filterBlue },
	purple: { backgroundColor: filterPurple },
	brown: { backgroundColor: filterBrown },
};

const ColorFilter = ({ sheet: { classes } }) => (
	<ul className={classes.colorList}>
		<li className={classes.filter}>
			<button className={classNames({ [classes.button]: true, [classes.gray]: true })}>
				&nbsp;
			</button>
			<button className={classNames({ [classes.button]: true, [classes.yellow]: true })}>
				&nbsp;
			</button>
			<button className={classNames({ [classes.button]: true, [classes.orange]: true })}>
				&nbsp;
			</button>
			<button className={classNames({ [classes.button]: true, [classes.red]: true })}>
				&nbsp;
			</button>
			<button className={classNames({ [classes.button]: true, [classes.green]: true })}>
				&nbsp;
			</button>
			<button className={classNames({ [classes.button]: true, [classes.blue]: true })}>
				&nbsp;
			</button>
			<button className={classNames({ [classes.button]: true, [classes.purple]: true })}>
				&nbsp;
			</button>
			<button className={classNames({ [classes.button]: true, [classes.brown]: true })}>
				&nbsp;
			</button>
		</li>
	</ul>
);

ColorFilter.propTypes = {
	sheet: jssSheet.isRequired,
};

ColorFilter.defaultProps = {
};

export default injectSheet(styles)(ColorFilter);
