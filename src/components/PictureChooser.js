import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import validUrl from 'valid-url';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { setLinkUrl } from '../reducers/converter';
import { lightGrayBackground, inputErrorColor } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

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
	},
	invalidLink: {
		backgroundColor: inputErrorColor,
	},
	ImageSourceContainer: {},
};

class PictureChooser extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.invalidLink = false;

		this.updateLinkUrl = this.updateLinkUrl.bind(this);
	}

	updateLinkUrl(e) {
		if (validUrl.is_uri(e.target.value)) {
			this.invalidLink = false;
			this.props.setLinkUrl(e.target.value);
		} else {
			this.invalidLink = true;
		}
		console.log(this.invalidLink);
		this.forceUpdate();
	}

	render() {
		return (
			<div
				className={classNames({
					[this.classes.container]: true,
					[this.classes.containerHide]: !this.props.visible,
				})}
			>
				<div className={this.classes.ImageSourceContainer}>
					<h3>{ translate('INSERT_LINK') }</h3>
					<input
						className={classNames({
							[this.classes.inputLink]: true,
							[this.classes.invalidLink]: this.invalidLink,
						})}
						type="text"
						name="LinkToExternalPicture"
						value={this.props.linkUrl}
						onChange={() => {}}
						onBlur={this.updateLinkUrl}
					/>
					<h3>{ translate('UPLOAD_IMAGE')}</h3>
					<input
						type="file"
						name="UploadedFile"
					/>
				</div>
			</div>
		);
	}
}

PictureChooser.propTypes = {
	visible: React.PropTypes.bool.isRequired,
	linkUrl: React.PropTypes.string,
	setLinkUrl: React.PropTypes.func,
	classes: jssClasses,
	sheet: jssSheet,
};

PictureChooser.defaultProps = {
	visible: true,
};

const mapStateToProps = state => ({
	linkUrl: state.linkUrl,
});

const mapDispatchToProps = dispatch => ({
	setLinkUrl: (link) => {
		dispatch(setLinkUrl(link));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(injectSheet(styles)(PictureChooser));
