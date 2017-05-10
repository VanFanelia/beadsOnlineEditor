import React from 'react';
import PropTypes from 'prop-types';
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
		padding: grid('s'),
		textAlign: 'center',
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-around',
	},
	containerHide: {
		display: 'none',
	},
	list: {
		listStyleType: 'none',
		margin: 0,
		padding: 0,
	},
	radio: {
		marginRight: grid('xs'),
	},
	numberInput: {
		width: grid('m'),
	},
};

class ConfigureParameterEditor extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.state = {
			linkUrl: props.linkUrl,
			selectedAlgorithm: '',
		};
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleMaxWidthChange = this.handleMaxWidthChange.bind(this);
		this.handleMaxHeightChange = this.handleMaxHeightChange.bind(this);
	}

	handleOptionChange(changeEvent) {
		this.setState({
			selectedAlgorithm: changeEvent.target.value,
		});
	}

	handleMaxWidthChange(changeEvent) {
		console.log(changeEvent);
		console.log(this.state);
	}

	handleMaxHeightChange(changeEvent) {
		console.log(changeEvent);
		console.log(this.state);
	}


	render() {
		return (
			<div
				className={classNames({
					[this.classes.container]: true,
					[this.classes.containerHide]: !this.props.visible,
				})}
			>
				<div>
					<strong>{translate('CHOOSE_ALGORITHM')}</strong>
					<ul className={this.classes.list}>
						<li>
							<label htmlFor="RESIZE_NEAREST_NEIGHBOR">
								<input
									id="RESIZE_NEAREST_NEIGHBOR"
									className={this.classes.radio}
									type="radio"
									value="RESIZE_NEAREST_NEIGHBOR"
									checked={this.state.selectedAlgorithm === 'RESIZE_NEAREST_NEIGHBOR'}
									onChange={this.handleOptionChange}
								/>
								{translate('RESIZE_NEAREST_NEIGHBOR')}
							</label>
						</li>
						<li>
							<label htmlFor="RESIZE_BILINEAR">
								<input
									id="RESIZE_BILINEAR"
									className={this.classes.radio}
									type="radio"
									value="RESIZE_BILINEAR"
									checked={this.state.selectedAlgorithm === 'RESIZE_BILINEAR'}
									onChange={this.handleOptionChange}
								/>
								{translate('RESIZE_BILINEAR')}
							</label>
						</li>
						<li>
							<label htmlFor="RESIZE_BICUBIC">
								<input
									id="RESIZE_BICUBIC"
									className={this.classes.radio}
									type="radio"
									value="RESIZE_BICUBIC"
									checked={this.state.selectedAlgorithm === 'RESIZE_BICUBIC'}
									onChange={this.handleOptionChange}
								/>
								{translate('RESIZE_BICUBIC')}
							</label>
						</li>
						<li>
							<label htmlFor="RESIZE_BEZIER">
								<input
									id="RESIZE_BEZIER"
									className={this.classes.radio}
									type="radio"
									value="RESIZE_BEZIER"
									checked={this.state.selectedAlgorithm === 'RESIZE_BEZIER'}
									onChange={this.handleOptionChange}
								/>
								{translate('RESIZE_BEZIER')}
							</label>
						</li>
						<li>
							<label htmlFor="RESIZE_HERMITE">
								<input
									id="RESIZE_HERMITE"
									className={this.classes.radio}
									type="radio"
									value="RESIZE_HERMITE"
									checked={this.state.selectedAlgorithm === 'RESIZE_HERMITE'}
									onChange={this.handleOptionChange}
								/>
								{translate('RESIZE_HERMITE')}
							</label>
						</li>
					</ul>
				</div>
				<div>
					<strong>{translate('CHOOSE_MAX_SIZE')}</strong>
					<ul className={this.classes.list}>
						<li>
							<label htmlFor="RESIZE_MAX_WIDTH">
								{translate('WIDTH')}:
								<input
									id="RESIZE_MAX_WIDTH"
									className={this.classes.numberInput}
									type="number"
									value="2"
									onChange={this.handleMaxWidthChange}
								/>
								{translate('PLATES')}
							</label>
						</li>
						<li>
							<label htmlFor="RESIZE_MAX_HEIGHT">
								{translate('HEIGHT')}:
								<input
									id="RESIZE_MAX_HEIGHT"
									className={this.classes.numberInput}
									type="number"
									value="2"
									onChange={this.handleMaxHeightChange}
								/>
								{translate('PLATES')}
							</label>
						</li>
					</ul>
				</div>
			</div>
		);
	}
}

ConfigureParameterEditor.propTypes = {
	visible: PropTypes.bool.isRequired,
	linkUrl: PropTypes.string.isRequired,
	classes: jssClasses.isRequired,
	sheet: jssSheet.isRequired,
};

ConfigureParameterEditor.defaultProps = {
	visible: false,
	linkUrl: '',
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
