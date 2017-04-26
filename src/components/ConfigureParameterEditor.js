import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { setLinkUrl } from '../reducers/converter';
import { setMode, MODES } from '../reducers/global';

import { lightGrayBackground } from '../style/colors';
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
	containerHide: {
		display: 'none',
	},
};

class ConfigureParameterEditor extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.state = {
			linkUrl: props.linkUrl,
		};
	}

	render() {
		return (
			<div
				className={classNames({
					[this.classes.container]: true,
					[this.classes.containerHide]: !this.props.visible,
				})}
			>
				<h3>{translate('FOOOOO')}</h3>
			</div>
		);
	}
}

ConfigureParameterEditor.propTypes = {
	visible: React.PropTypes.bool.isRequired,
	linkUrl: React.PropTypes.string.isRequired,
	classes: jssClasses.isRequired,
	sheet: jssSheet.isRequired,
};

ConfigureParameterEditor.defaultProps = {
	visible: false,
};

const mapStateToProps = state => ({
	linkUrl: state.linkUrl,
});

const mapDispatchToProps = dispatch => ({
	setLinkUrl: (link) => {
		dispatch(setLinkUrl(link));
	},
	onClickChooseImageFromPreview: () => {
		dispatch(setMode(MODES.CHOOSE_PARAMETERS));
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(injectSheet(styles)(ConfigureParameterEditor));
