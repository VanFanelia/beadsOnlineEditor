import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import { white } from '../style/colors';
import { spin } from '../style/animations';
import { jssSheet, jssClasses } from '../utils/propTypes';

const styles = {
	wrapper: {
		backgroundColor: '#222',
		padding: '20px',
		color: white,
	},
	logo: {
		height: '80px',
		margin: '0 auto',
		display: 'block',
	},
	animation: {
		animation: `${spin} infinite 20s linear`,
	},
	headline: {
		width: '80%',
		textAlign: 'center',
		marginLeft: 'auto',
		marginRight: 'auto',
	},
};

class SimpleHeader extends React.Component {

	constructor(props) {
		super(props);
		this.state = { showLogo: props.showLogo };
		this.sheet = props.sheet;
		this.classes = props.classes;
	}

	render() {
		return (
			<div className={classNames({ [this.classes.wrapper]: true })}>
				{ this.state.showLogo &&
					<img
						src={this.props.logo}
						className={classNames({
							[this.classes.logo]: true,
							[this.classes.animation]: this.props.animation,
						})}
						alt={this.props.logoAlt}
					/>
				}
				<h2 className={this.classes.headline}>{ this.props.children }</h2>
			</div>);
	}
}

SimpleHeader.propTypes = {
	children: PropTypes.string.isRequired,
	logo: PropTypes.string.isRequired,
	animation: PropTypes.bool,
	logoAlt: PropTypes.string,
	showLogo: PropTypes.bool,
	classes: jssClasses.isRequired,
	sheet: jssSheet.isRequired,
};

SimpleHeader.defaultProps = {
	logoAlt: 'Logo',
	showLogo: true,
	animation: false,
};

export default injectSheet(styles)(SimpleHeader);
