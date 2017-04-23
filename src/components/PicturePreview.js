import React from 'react';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';

import { black, lightGrayBackground } from '../style/colors';
import { jssSheet } from '../utils/propTypes';

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
};

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
		</div>
	</div>
);

PicturePreview.propTypes = {
	sheet: jssSheet,
	linkUrl: React.PropTypes.string,
	visible: React.PropTypes.bool,
};

PicturePreview.defaultProps = {
	linkUrl: '',
	visible: false,
};

export default injectSheet(styles)(PicturePreview);
