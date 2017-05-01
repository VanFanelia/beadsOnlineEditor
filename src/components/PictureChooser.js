import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validUrl from 'valid-url';
import jimp from 'jimp';
import request from 'request';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { setLinkUrl, setImage } from '../reducers/converter';
import { setMode, MODES } from '../reducers/global';

import { lightGrayBackground, inputErrorColor } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

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
		width: grid('xxxl + xxxl'),
		height: 'auto',
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
			invalidLink: false,
			linkUrl: props.linkUrl,
			error: undefined,
			image: undefined,
		};
		this.updateLinkUrl = this.updateLinkUrl.bind(this);
		this.chooseImage = this.chooseImage.bind(this);
		this.handleLinkChange = this.handleLinkChange.bind(this);
		this.handleLinkError = this.handleLinkError.bind(this);
	}

	handleLinkChange(event) {
		this.setState({ linkUrl: event.target.value });
	}

	updateLinkUrl(e) {
		const url = e.target.value;
		if (validUrl.is_uri(url)) {
			const that = this;
			request.head({ url: e.target.value }, (error, resp) => {
				if (error || resp.statusCode !== 200) {
					this.handleLinkError();
				} else {
					that.setState({ linkUrl: url, error: false, invalidLink: false });
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
		jimp.read(this.state.linkUrl, (err, image) => {
			if (err !== null && err !== undefined) {
				that.setState({ error: true });
			} else {
				that.setState({ error: false });
				that.props.onClickChooseImageFromPreview(image);
			}
		});
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
							[this.classes.hide]: this.props.linkUrl === '' || this.state.error === true || this.state.invalidLink === true,
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
	visible: React.PropTypes.bool.isRequired,
	linkUrl: React.PropTypes.string.isRequired,
	setLinkUrl: React.PropTypes.func.isRequired,
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
