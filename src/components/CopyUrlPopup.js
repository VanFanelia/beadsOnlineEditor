import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import md5 from 'md5';
import { connect } from 'react-redux';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';

import { hideUrlPopup } from '../reducers/canvas';
import { jssSheet } from '../utils/propTypes';
import { transparentOverlay, tooltipBackground, black } from '../style/colors';
import { translate } from '../utils/translate';


const styles = {
	overlay: {
		display: 'none',
		position: 'absolute',
		left: 0,
		top: 0,
		height: '100%',
		width: '100%',
		backgroundColor: `${transparentOverlay}`,
		zIndex: 10,
	},
	container: {
		display: 'none',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		position: 'absolute',
		height: grid('xxxl'),
		backgroundColor: tooltipBackground,
		borderRadius: '3px',
		border: `1px solid ${black}`,
		top: `calc(50% - ${grid('m')})`,
		width: grid('xxxl + xxxl + xxxl'),
		maxWidth: '100%',
		zIndex: 12,
		left: `calc(50% - ${grid('xxxl + l + xs')})`,
	},
	label: {
		display: 'block',
		margin: 0,
		padding: 0,
	},
	input: {
		display: 'block',
		width: '90%',
	},
	closeButton: {
		position: 'absolute',
		right: grid('xs'),
		top: grid('xs'),
		height: grid('s'),
		width: grid('s'),
		zIndex: 12,
	},
	visible: {
		display: 'block',
	},
	visibleFlex: {
		display: 'flex',
	},
};

const CopyUrlPopup = ({ dispatch, sheet: { classes }, ...props }) =>
(
	<div>
		<div
			role="button"
			tabIndex="-1"
			className={classNames({
				[classes.visible]: props.visible,
				[classes.overlay]: true })}
			onClick={() => dispatch(hideUrlPopup())}
		/>
		<div
			role="presentation"
			className={classNames({
				[classes.visibleFlex]: props.visible,
				[classes.container]: true })}
			onClick={() => {}}
		>
			<button
				className={classes.closeButton}
				onClick={() => {
					dispatch(hideUrlPopup());
				}}
			>
				X
			</button>
			<label htmlFor={`popup_${md5(props.url)}`} className={classes.label}>{translate('LINK_TO_SHARE_CANVAS')}</label>
			<input
				id={`popup_${md5(props.url)}`}
				className={classes.input}
				type="text"
				onClick={event => event.target.select()}
				readOnly="true"
				value={props.url}
			/>
		</div>
	</div>
);

CopyUrlPopup.propTypes = {
	sheet: jssSheet.isRequired,
	dispatch: PropTypes.func.isRequired,
	visible: PropTypes.bool,
	url: PropTypes.string,
};

CopyUrlPopup.defaultProps = {
	visible: false,
	url: '',
};

export default connect()(injectSheet(styles)(CopyUrlPopup));
