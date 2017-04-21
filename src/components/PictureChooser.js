import React from 'react';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { lightGrayBackground } from '../style/colors';
import { jssSheet } from '../utils/propTypes';

const styles = {
	container: {
		backgroundColor: lightGrayBackground,
		height: grid('xxxl + xxxl'),
		padding: grid('s'),
		textAlign: 'left',
		display: 'flex',
	},
	containerHide: {
		display: 'none',
	},
	inputLink: {
		width: grid('xxxl + xxxl + xxxl'),

		'@media (min-width: 140px)': {
			backgroundColor: 'pink',
		},
	},
	ImageSourceContainer: {

	},
};

const PictureChooser = ({ sheet: { classes }, ...props }) => (
	<div
		className={classNames({
			[classes.container]: true,
			[classes.containerHide]: !props.visible },
		)}
	>
		<div className={classes.ImageSourceContainer}>
			<h3>{ translate('INSERT_LINK') }</h3>
			<input
				className={classes.inputLink}
				type="text"
				name="LinkToExternalPicture"
				onBlur={() => { console.log(this.value); }}
			/>
			<h3>{ translate('UPLOAD_IMAGE') }</h3>
			<input
				type="file"
				name="UploadedFile"
				onBlur={() => { console.log(this.value); }}
			/>
		</div>
	</div>
);

PictureChooser.propTypes = {
	visible: React.PropTypes.bool,
	sheet: jssSheet,
};

export default injectSheet(styles)(PictureChooser);
