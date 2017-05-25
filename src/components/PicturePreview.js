import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Jimp from 'jimp';
import injectSheet from '../utils/injectSheet';

import { black, lightGrayBackground, borderGray } from '../style/colors';
import { jssSheet, jimpImage, jssClasses } from '../utils/propTypes';

import grid from '../utils/grid';
import translate from '../utils/translate';

const styles = {
	picturePreviewContainer: {
		backgroundColor: lightGrayBackground,
		textAlign: 'center',
		color: black,
		width: 'auto',
		borderBottom: `1px solid ${borderGray}`,
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
class PicturePreview extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.getImageSrc = this.getImageSrc.bind(this);
		this.state = {
			base64Image: null,
		};
	}

	componentWillUpdate(nextProps, nextState) {
		if (nextProps.image !== this.props.image) {
			console.log("reset base64 image");
			this.setState({ base64Image: null });
		}
	}

	getImageSrc() {
		if (this.props.image === null) {
			return this.props.linkUrl;
		}
		if (this.state.base64Image !== null) {
			return this.state.base64Image;
		}

		this.props.image.getBase64(Jimp.MIME_PNG, (error, base64code) => {
			if (!error) {
				this.setState({ base64Image: base64code });
			}
		});
		return '';
	}

	render() {
		return (
			<div
				className={classNames({
					[this.classes.picturePreviewContainer]: true,
					[this.classes.hide]: !this.props.visible,
				})}
			>
				<div className={this.classes.flexContainer}>
					<h3>{ translate('PREVIEW') }</h3>
					<img
						className={classNames({ [this.classes.image]: this.props.resizeImage })}
						src={this.getImageSrc()}
						alt="preview"
						width={this.props.image !== null ? this.props.image.bitmap.width : ''}
						height={this.props.image !== null ? this.props.image.bitmap.height : ''}
					/>
					<div className={this.classes.dataSheet}>
						<ul>
							<li>
								{ translate('WIDTH')}: {this.props.image !== null ? this.props.image.bitmap.width : '?'} { translate('PIXEL')}
							</li>
							<li>
								{ translate('HEIGHT')}: {this.props.image !== null ? this.props.image.bitmap.height : '?'} { translate('PIXEL')}
							</li>
							<li>
								{ translate('TYPE')}: {this.props.image !== null ? this.props.image._originalMime : '?'}
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}
/* eslint-enable no-underscore-dangle */

PicturePreview.propTypes = {
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	resizeImage: PropTypes.bool,
	linkUrl: PropTypes.string,
	visible: PropTypes.bool,
	image: jimpImage,
};

PicturePreview.defaultProps = {
	resizeImage: true,
	visible: false,
	linkUrl: '',
	image: null,
};

export default injectSheet(styles)(PicturePreview);
