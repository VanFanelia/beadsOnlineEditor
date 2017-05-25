import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import translate from '../utils/translate';

import { setConverterParameters, startConversion } from '../reducers/converter';
import { setMode, MODES } from '../reducers/global';

import { lightGrayBackground, borderGray } from '../style/colors';
import { BASIC_HAMA_COLORS, PASTEL_HAMA_COLORS, TRANSPARENT_HAMA_COLORS, METAL_HAMA_COLORS, IKEA_BEADS_COLORS } from '../utils/beadTypes';
import { jssSheet, jssClasses } from '../utils/propTypes';

const styles = {
	container: {
		backgroundColor: lightGrayBackground,
		padding: grid('s'),
		textAlign: 'center',
		borderBottom: `1px solid ${borderGray}`,
	},
	flexContainer: {
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
	checkbox: {
		background: 'lightblue',
	},
	convertButton: {
		height: grid('s'),
	},
};

class ConfigureParameterEditor extends React.Component {

	constructor(props) {
		super(props);
		this.sheet = props.sheet;
		this.classes = props.classes;
		this.state = {
			linkUrl: props.linkUrl,
			selectedAlgorithm: props.selectedAlgorithm,
			maxWidth: props.maxWidth,
			maxHeight: props.maxHeight,
			usedBeadTypes: props.usedBeadTypes,
		};
		this.handleOptionChange = this.handleOptionChange.bind(this);
		this.handleMaxWidthChange = this.handleMaxWidthChange.bind(this);
		this.handleMaxHeightChange = this.handleMaxHeightChange.bind(this);
		this.handleBeadsTypeChange = this.handleBeadsTypeChange.bind(this);
		this.handleTransformClick = this.handleTransformClick.bind(this);
	}

	handleOptionChange(changeEvent) {
		this.setState({
			selectedAlgorithm: changeEvent.target.value,
		}, () => {
			this.props.changeConverterParameters(
				this.state.selectedAlgorithm,
				this.state.maxWidth,
				this.state.maxHeight,
				this.state.usedBeadTypes,
			);
		});
	}

	handleMaxWidthChange(changeEvent) {
		const newValue = changeEvent.target.value;
		if (newValue >= 1 && newValue <= 5) {
			this.setState({
				maxWidth: newValue,
			}, () => {
				this.props.changeConverterParameters(
					this.state.selectedAlgorithm,
					this.state.maxWidth,
					this.state.maxHeight,
					this.state.usedBeadTypes,
				);
			});
		}
	}

	handleMaxHeightChange(changeEvent) {
		const newValue = changeEvent.target.value;
		if (newValue >= 1 && newValue <= 5) {
			this.setState({
				maxHeight: newValue,
			}, () => {
				this.props.changeConverterParameters(
					this.state.selectedAlgorithm,
					this.state.maxWidth,
					this.state.maxHeight,
					this.state.usedBeadTypes,
				);
			});
		}
	}

	handleBeadsTypeChange(changeEvent) {
		const value = changeEvent.target.value;
		if (changeEvent.target.checked) {
			this.setState({
				usedBeadTypes: this.state.usedBeadTypes.concat([value]),
			}, () => {
				this.props.changeConverterParameters(
					this.state.selectedAlgorithm,
					this.state.maxWidth,
					this.state.maxHeight,
					this.state.usedBeadTypes,
				);
			});
		} else {
			const indexOf = this.state.usedBeadTypes.indexOf(value);
			const newUsedBeadTypes = this.state.usedBeadTypes.slice();
			newUsedBeadTypes.splice(indexOf, 1);
			this.setState({
				usedBeadTypes: newUsedBeadTypes,
			}, () => {
				this.props.changeConverterParameters(
					this.state.selectedAlgorithm,
					this.state.maxWidth,
					this.state.maxHeight,
					newUsedBeadTypes,
				);
			});
		}
	}

	handleTransformClick() {
		this.props.startConversion();
	}

	render() {
		return (
			<div
				className={classNames({
					[this.classes.container]: true,
					[this.classes.containerHide]: !this.props.visible,
				})}
			>
				<div className={this.classes.flexContainer}>
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
										value={this.state.maxWidth}
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
										value={this.state.maxHeight}
										onChange={this.handleMaxHeightChange}
									/>
									{translate('PLATES')}
								</label>
							</li>
						</ul>
					</div>
					<div>
						<strong>{translate('CHOOSE_BEADS')}</strong>
						<ul className={this.classes.list}>
							<li>
								<label htmlFor={BASIC_HAMA_COLORS}>
									<input
										id={BASIC_HAMA_COLORS}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={BASIC_HAMA_COLORS}
										checked={this.state.usedBeadTypes.indexOf(BASIC_HAMA_COLORS) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(BASIC_HAMA_COLORS)}
								</label>
							</li>
							<li>
								<label htmlFor={PASTEL_HAMA_COLORS}>
									<input
										id={PASTEL_HAMA_COLORS}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={PASTEL_HAMA_COLORS}
										checked={this.state.usedBeadTypes.indexOf(PASTEL_HAMA_COLORS) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(PASTEL_HAMA_COLORS)}
								</label>
							</li>
							<li>
								<label htmlFor={TRANSPARENT_HAMA_COLORS}>
									<input
										id={TRANSPARENT_HAMA_COLORS}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={TRANSPARENT_HAMA_COLORS}
										checked={this.state.usedBeadTypes.indexOf(TRANSPARENT_HAMA_COLORS) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(TRANSPARENT_HAMA_COLORS)}
								</label>
							</li>
							<li>
								<label htmlFor={METAL_HAMA_COLORS}>
									<input
										id={METAL_HAMA_COLORS}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={METAL_HAMA_COLORS}
										checked={this.state.usedBeadTypes.indexOf(METAL_HAMA_COLORS) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(METAL_HAMA_COLORS)}
								</label>
							</li>
							<li>
								<label htmlFor={IKEA_BEADS_COLORS}>
									<input
										id={IKEA_BEADS_COLORS}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={IKEA_BEADS_COLORS}
										checked={this.state.usedBeadTypes.indexOf(IKEA_BEADS_COLORS) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(IKEA_BEADS_COLORS)}
								</label>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<button className={this.classes.convertButton} onClick={this.handleTransformClick}>{translate('CONVERT_PICTURE')}</button>
				</div>
			</div>
		);
	}
}

ConfigureParameterEditor.propTypes = {
	visible: PropTypes.bool.isRequired,
	classes: jssClasses.isRequired,
	sheet: jssSheet.isRequired,
	/* comes from connect() */
	linkUrl: PropTypes.string.isRequired,
	selectedAlgorithm: PropTypes.string.isRequired,
	maxWidth: PropTypes.number.isRequired,
	maxHeight: PropTypes.number.isRequired,
	usedBeadTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
	changeConverterParameters: PropTypes.func.isRequired,
	startConversion: PropTypes.func.isRequired,
};

ConfigureParameterEditor.defaultProps = {
	visible: false,
};

const mapStateToProps = state => ({
	linkUrl: state.converter.linkUrl,
	selectedAlgorithm: state.converter.selectedAlgorithm,
	maxWidth: state.converter.maxWidth,
	maxHeight: state.converter.maxHeight,
	usedBeadTypes: state.converter.usedBeadTypes,
});

const mapDispatchToProps = dispatch => ({
	changeConverterParameters: (selectedAlgorithm, maxWidth, maxHeight, usedBeadTypes) => {
		dispatch(setConverterParameters(selectedAlgorithm, maxWidth, maxHeight, usedBeadTypes));
	},
	startConversion: () => {
		dispatch(startConversion());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(injectSheet(styles)(ConfigureParameterEditor));
