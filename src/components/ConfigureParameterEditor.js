import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import { translate } from '../utils/translate';

import { setConverterParameters, startConversion } from '../reducers/converter';

import { lightGrayBackground, borderGray } from '../style/colors';
import { HAMA_BASIC, HAMA_PASTEL, HAMA_TRANSPARENT, HAMA_METAL, IKEA } from '../utils/beadTypes';
import { RESIZE_OPTION_SCALE_CUBIC, RESIZE_OPTION_SCALE_MAX_SPACE } from '../utils/scaleOptions';
import { RESIZE_BEZIER, RESIZE_BICUBIC, RESIZE_BILINEAR, RESIZE_HERMITE, RESIZE_NEAREST_NEIGHBOR } from '../utils/resizeAlgorithm';
import { jssSheet, jssClasses, jimpImage } from '../utils/propTypes';

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
	firstList: {
		marginBottom: grid('s'),
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
			selectedScaleOption: props.selectedScaleOption,
			convertedImage: props.convertedImage,
		};
		this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
		this.handleScaleOptionChange = this.handleScaleOptionChange.bind(this);
		this.handleMaxWidthChange = this.handleMaxWidthChange.bind(this);
		this.handleMaxHeightChange = this.handleMaxHeightChange.bind(this);
		this.handleBeadsTypeChange = this.handleBeadsTypeChange.bind(this);
		this.handleTransformClick = this.handleTransformClick.bind(this);
	}

	handleAlgorithmChange(changeEvent) {
		this.setState({
			selectedAlgorithm: changeEvent.target.value,
		}, () => {
			this.props.changeConverterParameters(
				this.state.selectedAlgorithm,
				this.state.maxWidth,
				this.state.maxHeight,
				this.state.usedBeadTypes,
				this.state.selectedScaleOption,
			);
		});
	}

	handleScaleOptionChange(changeEvent) {
		this.setState({
			selectedScaleOption: changeEvent.target.value,
		}, () => {
			this.props.changeConverterParameters(
				this.state.selectedAlgorithm,
				this.state.maxWidth,
				this.state.maxHeight,
				this.state.usedBeadTypes,
				this.state.selectedScaleOption,
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
					this.state.selectedScaleOption,
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
					this.state.selectedScaleOption,
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
					this.state.selectedScaleOption,
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
					this.state.selectedScaleOption,
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
								<label htmlFor={RESIZE_NEAREST_NEIGHBOR} >
									<input
										id={RESIZE_NEAREST_NEIGHBOR}
										className={this.classes.radio}
										type="radio"
										value={RESIZE_NEAREST_NEIGHBOR}
										checked={this.state.selectedAlgorithm === RESIZE_NEAREST_NEIGHBOR}
										onChange={this.handleAlgorithmChange}
									/>
									{translate(RESIZE_NEAREST_NEIGHBOR)}
								</label>
							</li>
							<li>
								<label htmlFor={RESIZE_BILINEAR}>
									<input
										id={RESIZE_BILINEAR}
										className={this.classes.radio}
										type="radio"
										value={RESIZE_BILINEAR}
										checked={this.state.selectedAlgorithm === RESIZE_BILINEAR}
										onChange={this.handleAlgorithmChange}
									/>
									{translate(RESIZE_BILINEAR)}
								</label>
							</li>
							<li>
								<label htmlFor={RESIZE_BICUBIC}>
									<input
										id={RESIZE_BICUBIC}
										className={this.classes.radio}
										type="radio"
										value={RESIZE_BICUBIC}
										checked={this.state.selectedAlgorithm === RESIZE_BICUBIC}
										onChange={this.handleAlgorithmChange}
									/>
									{translate(RESIZE_BICUBIC)}
								</label>
							</li>
							<li>
								<label htmlFor={RESIZE_BEZIER}>
									<input
										id={RESIZE_BEZIER}
										className={this.classes.radio}
										type="radio"
										value={RESIZE_BEZIER}
										checked={this.state.selectedAlgorithm === RESIZE_BEZIER}
										onChange={this.handleAlgorithmChange}
									/>
									{translate(RESIZE_BEZIER)}
								</label>
							</li>
							<li>
								<label htmlFor={RESIZE_HERMITE}>
									<input
										id={RESIZE_HERMITE}
										className={this.classes.radio}
										type="radio"
										value={RESIZE_HERMITE}
										checked={this.state.selectedAlgorithm === RESIZE_HERMITE}
										onChange={this.handleAlgorithmChange}
									/>
									{translate(RESIZE_HERMITE)}
								</label>
							</li>
						</ul>
					</div>
					<div>
						<strong>{translate('CHOOSE_MAX_SIZE')}</strong>
						<ul
							className={classNames({
								[this.classes.list]: true,
								[this.classes.firstList]: true,
							})}
						>
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
						<strong>{translate('CHOOSE_SCALE_OPTION')}</strong>
						<ul className={this.classes.list}>
							<li>
								<label htmlFor={RESIZE_OPTION_SCALE_CUBIC}>
									<input
										id={RESIZE_OPTION_SCALE_CUBIC}
										className={this.classes.radio}
										type="radio"
										name="RESIZE_OPTION"
										value={RESIZE_OPTION_SCALE_CUBIC}
										checked={this.state.selectedScaleOption === RESIZE_OPTION_SCALE_CUBIC}
										onChange={this.handleScaleOptionChange}
									/>
									{translate(RESIZE_OPTION_SCALE_CUBIC)}
								</label>
							</li>
							<li>
								<label htmlFor={RESIZE_OPTION_SCALE_MAX_SPACE}>
									<input
										id={RESIZE_OPTION_SCALE_MAX_SPACE}
										className={this.classes.radio}
										type="radio"
										name="RESIZE_OPTION"
										value={RESIZE_OPTION_SCALE_MAX_SPACE}
										checked={this.state.selectedScaleOption === RESIZE_OPTION_SCALE_MAX_SPACE}
										onChange={this.handleScaleOptionChange}
									/>
									{translate(RESIZE_OPTION_SCALE_MAX_SPACE)}
								</label>
							</li>
						</ul>
					</div>
					<div>
						<strong>{translate('CHOOSE_BEADS')}</strong>
						<ul className={this.classes.list}>
							<li>
								<label htmlFor={HAMA_BASIC}>
									<input
										id={HAMA_BASIC}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={HAMA_BASIC}
										checked={this.state.usedBeadTypes.indexOf(HAMA_BASIC) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(HAMA_BASIC)}
								</label>
							</li>
							<li>
								<label htmlFor={HAMA_PASTEL}>
									<input
										id={HAMA_PASTEL}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={HAMA_PASTEL}
										checked={this.state.usedBeadTypes.indexOf(HAMA_PASTEL) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(HAMA_PASTEL)}
								</label>
							</li>
							<li>
								<label htmlFor={HAMA_TRANSPARENT}>
									<input
										id={HAMA_TRANSPARENT}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={HAMA_TRANSPARENT}
										checked={this.state.usedBeadTypes.indexOf(HAMA_TRANSPARENT) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(HAMA_TRANSPARENT)}
								</label>
							</li>
							<li>
								<label htmlFor={HAMA_METAL}>
									<input
										id={HAMA_METAL}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={HAMA_METAL}
										checked={this.state.usedBeadTypes.indexOf(HAMA_METAL) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(HAMA_METAL)}
								</label>
							</li>
							<li>
								<label htmlFor={IKEA}>
									<input
										id={IKEA}
										className={this.classes.checkbox}
										type="checkbox"
										name="BEAD_TYPES"
										value={IKEA}
										checked={this.state.usedBeadTypes.indexOf(IKEA) >= 0}
										onChange={this.handleBeadsTypeChange}
									/>
									{translate(IKEA)}
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
	selectedScaleOption: PropTypes.string.isRequired,
	convertedImage: jimpImage,
};

ConfigureParameterEditor.defaultProps = {
	visible: false,
	convertedImage: null,
};

const mapStateToProps = state => ({
	linkUrl: state.converter.linkUrl,
	selectedAlgorithm: state.converter.selectedAlgorithm,
	maxWidth: state.converter.maxWidth,
	maxHeight: state.converter.maxHeight,
	usedBeadTypes: state.converter.usedBeadTypes,
	selectedScaleOption: state.converter.selectedScaleOption,
	convertedImage: state.converter.convertedImage,
});

const mapDispatchToProps = dispatch => ({
	changeConverterParameters: (
		selectedAlgorithm,
		maxWidth,
		maxHeight,
		usedBeadTypes,
		selectedScaleOption) => {
		dispatch(setConverterParameters(
			selectedAlgorithm,
			maxWidth,
			maxHeight,
			usedBeadTypes,
			selectedScaleOption),
		);
	},
	startConversion: () => {
		dispatch(startConversion());
	},
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(injectSheet(styles)(ConfigureParameterEditor));
