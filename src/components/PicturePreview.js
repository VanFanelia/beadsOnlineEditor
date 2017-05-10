import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';

import { black, lightGrayBackground } from '../style/colors';
import { jssSheet, jimpImage } from '../utils/propTypes';

import grid from '../utils/grid';
import translate from '../utils/translate';

const styles = {
	picturePreviewContainer: {
		backgroundColor: lightGrayBackground,
		textAlign: 'center',
		color: black,
		width: 'auto',
	},
	flexContainer: {
		height: grid('xxxl + xs + xs'),
		padding: grid('xs'),
		paddingTop: grid('xs'),
		maxWidth: grid('xxxl + xxxl + xxxl + xxxl + xxxl'),
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		margin: 'auto',
	},
	hide: {
		display: 'none',
	},
	headline: {
	},
	image: {
		height: '100%',
		width: 'auto',
	},
	dataSheet: {
		textAlign: 'left',
	},
};

/* eslint-disable no-underscore-dangle */
const PicturePreview = ({ sheet: { classes }, ...props }) =>
(
	<div
		className={classNames({
			[classes.picturePreviewContainer]: true,
			[classes.hide]: !props.visible,
		})}
	>
		<div className={classes.flexContainer}>
			<h3>{ translate('PREVIEW') }</h3>
			<img className={classes.image} src={props.linkUrl} alt="preview" />
			<div className={classes.dataSheet}>
				<ul>
					<li>
						{ translate('WIDTH')}: {props.image !== undefined ? props.image.bitmap.width : '?'} { translate('PIXEL')}
					</li>
					<li>
						{ translate('HEIGHT')}: {props.image !== undefined ? props.image.bitmap.height : '?'} { translate('PIXEL')}
					</li>
					<li>
						{ translate('TYPE')}: {props.image !== undefined ? props.image._originalMime : '?'}
					</li>
				</ul>
			</div>
		</div>
	</div>
);
/* eslint-enable no-underscore-dangle */

PicturePreview.propTypes = {
	sheet: jssSheet.isRequired,
	linkUrl: PropTypes.string,
	visible: PropTypes.bool,
	image: jimpImage,
};

PicturePreview.defaultProps = {
	visible: false,
	linkUrl: '',
	image: undefined,
};

export default injectSheet(styles)(PicturePreview);
