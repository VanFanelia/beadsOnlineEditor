import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validUrl from 'valid-url';
import jimp from 'jimp';
import request from 'request';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import { translate } from '../utils/translate';

import { setLinkUrl, setImage } from '../reducers/converter';
import { setMode, MODES } from '../reducers/global';

import { lightGrayBackground, inputErrorColor } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

import { calculateImageFromBase64String } from '../utils/calculateBase64Image';

const styles = {
	container: {
		backgroundColor: lightGrayBackground,
		minHeight: grid('xxxl + xxxl'),
		padding: grid('s'),
		textAlign: 'center',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	hide: {
		display: 'none',
	},
	inputLink: {
		width: grid('xxxl + xxxl + xxxl'),
	},
	invalidLink: {
		backgroundColor: inputErrorColor,
	},
	preview: {
		width: '50%',
	},
	previewImage: {
		maxWidth: grid('xxxl + xxxl'),
	},
	ImageSourceContainer: {
		width: '50%',
	},
};

class PictureChooser extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.state = {
			mode: 'link',
			invalidLink: false,
			linkUrl: props.linkUrl,
			error: undefined,
			tempImage: undefined,
			uploadDimensions: { width: 0, height: 0 },
			uploadedJimpImage: undefined,
		};
		this.updateLinkUrl = this.updateLinkUrl.bind(this);
		this.chooseImage = this.chooseImage.bind(this);
		this.handleLinkChange = this.handleLinkChange.bind(this);
		this.handleLinkError = this.handleLinkError.bind(this);
		this.onTempImgLoad = this.onTempImgLoad.bind(this);
	}

	onTempImgLoad({ target: img }) {
		calculateImageFromBase64String(this.state.tempImage, img.offsetWidth, img.offsetHeight)
		.then(result => this.setState({
			uploadDimensions: { width: img.offsetWidth, height: img.offsetHeight },
			uploadedJimpImage: result }))
		.catch(
			() => {
				this.handleLinkError();
			});
	}

	handleImageUploadChange(event) {
		event.preventDefault();

		const reader = new FileReader();
		const file = event.target.files[0];

		reader.onloadend = () => {
			this.setState({ tempImage: reader.result, mode: 'upload' });
		};

		reader.readAsDataURL(file);
	}

	handleLinkChange(event) {
		this.setState({ linkUrl: event.target.value, mode: 'link' });
	}

	updateLinkUrl(e) {
		const url = e.target.value;
		if (validUrl.is_uri(url)) {
			const that = this;
			request.head({ url: e.target.value }, (error, resp) => {
				if (error || resp.statusCode !== 200) {
					this.handleLinkError();
				} else {
					that.setState({ linkUrl: url, error: false, invalidLink: false, mode: 'link' });
					that.props.setLinkUrl(url);
				}
			});
		} else {
			this.handleLinkError();
		}
	}

	handleLinkError() {
		this.setState({ error: true, invalidLink: true });
		this.props.setLinkUrl('');
	}

	chooseImage() {
		const that = this;
		if (this.state.mode === 'link') {
			jimp.read(this.state.linkUrl, (err, image) => {
				if (err !== null && err !== undefined) {
					that.setState({ error: true });
				} else {
					that.setState({ error: false });
					that.props.onClickChooseImageFromPreview(image);
				}
			});
		} else {
			this.props.onClickChooseImageFromPreview(this.state.uploadedJimpImage);
		}
	}

	render() {
		return (
			<div
				className={classNames({
					[this.classes.container]: true,
					[this.classes.hide]: !this.props.visible,
				})}
			>
				<div className={this.classes.ImageSourceContainer}>
					<h3>{ translate('INSERT_LINK') }</h3>
					<input
						className={classNames({
							[this.classes.inputLink]: true,
							[this.classes.invalidLink]: this.state.invalidLink,
						})}
						type="text"
						name="LinkToExternalPicture"
						value={this.state.linkUrl}
						onChange={this.handleLinkChange}
						onBlur={this.updateLinkUrl}
					/>
					<button>-&gt;</button>
					<h3>{ translate('UPLOAD_IMAGE')}</h3>
					<input
						type="file"
						name="UploadedFile"
						onChange={e => this.handleImageUploadChange(e)}
					/>
				</div>
				<div className={this.classes.preview} >
					<h3>{translate('PREVIEW')}</h3>
					<h4
						className={classNames({
							[this.classes.hide]: this.state.error === undefined || this.state.error === false })}
					>
						{translate('PICTURE_ERROR')}
					</h4>
					<img
						className={classNames({
							[this.classes.previewImage]: true,
							[this.classes.hide]: this.state.mode !== 'upload' || this.state.tempImage === undefined,
						})}
						src={this.state.tempImage}
						onLoad={this.onTempImgLoad}
						alt="preview"
					/>
					<img
						className={classNames({
							[this.classes.previewImage]: true,
							[this.classes.hide]: this.state.mode !== 'link' || this.props.linkUrl === '' || this.state.error === true || this.state.invalidLink === true,
						})}
						src={this.props.linkUrl}
						alt="preview"
					/>
					<div>
						<button onClick={this.chooseImage}>{translate('USE_IMAGE')}</button>
					</div>
				</div>
			</div>
		);
	}
}

PictureChooser.propTypes = {
	visible: PropTypes.bool.isRequired,
	linkUrl: PropTypes.string.isRequired,
	setLinkUrl: PropTypes.func.isRequired,
	onClickChooseImageFromPreview: PropTypes.func.isRequired,
	classes: jssClasses.isRequired,
	sheet: jssSheet.isRequired,
};

PictureChooser.defaultProps = {
	visible: true,
};

const mapStateToProps = state => ({
	linkUrl: state.converter.linkUrl,
});

const mapDispatchToProps = dispatch => ({
	setLinkUrl: (link) => {
		dispatch(setLinkUrl(link));
	},
	onClickChooseImageFromPreview: (image) => {
		dispatch(setImage(image));
		dispatch(setMode(MODES.CHOOSE_PARAMETERS));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(PictureChooser));
