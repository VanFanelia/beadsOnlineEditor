import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';

import { black, lightGrayBackground, borderGray } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

import grid from '../utils/grid';
import { translate } from '../utils/translate';

const styles = {
	container: {
		backgroundColor: lightGrayBackground,
		textAlign: 'center',
		color: black,
		width: 'auto',
		borderBottom: `1px solid ${borderGray}`,
		padding: `${grid('s')} 0`,
	},
	button: {
		color: 'black',
		height: grid('s'),
	},
	hide: {
		display: 'none',
	},
};

/* eslint-disable no-underscore-dangle */
const ActionBar = ({ sheet: { classes }, ...props }) => (
	<div
		className={classNames({
			[classes.container]: true,
			[classes.hide]: !props.visible,
		})}
	>
		<button className={classes.button} onClick={props.action} >{translate('TRANSFER_TO_EDITOR')}</button>
	</div>
);

/* eslint-enable no-underscore-dangle */

ActionBar.propTypes = {
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	visible: PropTypes.bool,
	action: PropTypes.func.isRequired,
};

ActionBar.defaultProps = {
	visible: false,
};

export default injectSheet(styles)(ActionBar);
