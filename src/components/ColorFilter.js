import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';

import { jssSheet } from '../utils/propTypes';
import { filterBlue, filterMonochrome, filterGreen, filterRed, filterYellow, white } from '../style/colors';
import { translate } from '../utils/translate';


const styles = {
	colorList: {
		margin: `0 0 ${grid('xs')} 0`,
		padding: 0,
		listStyleType: 'none',
	},
	headline: {
		margin: ` 0 0 ${grid('xs')} 0`,
	},
	filter: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	button: {
		width: grid('s'),
		height: grid('s'),
	},
	active: {
	},
	white: { backgroundColor: white },
	gray: { backgroundColor: filterMonochrome },
	yellow: { backgroundColor: filterYellow },
	red: { backgroundColor: filterRed },
	green: { backgroundColor: filterGreen },
	blue: { backgroundColor: filterBlue },
};

const ColorFilter = ({ sheet: { classes }, ...props }) => (
	<div>
		<h4 className={classes.headline}>{ translate('FILTER_COLOR') }</h4>
		<ul className={classes.colorList}>
			<li className={classes.filter}>
				<button
					className={classNames({
						[classes.button]: true,
						[classes.white]: true,
						[classes.active]: props.colorFilter === '',
					})}
					onClick={() => props.setColorFilter('')}
				>
					&Oslash;
				</button>
				<button
					className={classNames({
						[classes.button]: true,
						[classes.gray]: true,
						[classes.active]: props.colorFilter === 'monochrome',
					})}
					onClick={() => props.setColorFilter('monochrome')}
				>
					&nbsp;
				</button>
				<button
					className={classNames({
						[classes.button]: true,
						[classes.yellow]: true,
						[classes.active]: props.colorFilter === 'yellow',
					})}
					onClick={() => props.setColorFilter('yellow')}
				>
					&nbsp;
				</button>
				<button
					className={classNames({
						[classes.button]: true,
						[classes.red]: true,
						[classes.active]: props.colorFilter === 'red',
					})}
					onClick={() => props.setColorFilter('red')}
				>
					&nbsp;
				</button>
				<button
					className={classNames({
						[classes.button]: true,
						[classes.green]: true,
						[classes.active]: props.colorFilter === 'green',
					})}
					onClick={() => props.setColorFilter('green')}
				>
					&nbsp;
				</button>
				<button
					className={classNames({
						[classes.button]: true,
						[classes.blue]: true,
						[classes.active]: props.colorFilter === 'blue',
					})}
					onClick={() => props.setColorFilter('blue')}
				>
					&nbsp;
				</button>
			</li>
		</ul>
	</div>
);

ColorFilter.propTypes = {
	setColorFilter: PropTypes.func.isRequired,
	colorFilter: PropTypes.string.isRequired,
	sheet: jssSheet.isRequired,
};

ColorFilter.defaultProps = {
};

export default injectSheet(styles)(ColorFilter);
