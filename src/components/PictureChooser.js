import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { setLinkUrl } from '../reducers/converter';
import { lightGrayBackground } from '../style/colors';
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

		'@media (min-width: 140px)': {
			backgroundColor: 'pink',
		},
	},
	ImageSourceContainer: {

	},
};

class PictureChooser extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.updateLinkUrl = this.updateLinkUrl.bind(this);
	}

	updateLinkUrl(e) {
		this.props.setLinkUrl(e.target.value);
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
						className={this.classes.inputLink}
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
