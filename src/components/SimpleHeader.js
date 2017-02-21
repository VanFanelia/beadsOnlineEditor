import React from 'react';
import injectSheet from '../utils/injectSheet';
import reactLogo from '../graphics/ReactLogo.svg';
import { white } from '../style/colors';
import { spin } from '../style/animations';
import { jssSheet, jssClasses } from '../utils/propTypes';

const styles = {
	wrapper: {
		backgroundColor: '#222',
		height: '150px',
		padding: '20px',
		color: white,
	},
	logo: {
		animation: `${spin} infinite 20s linear`,
		height: '80px',
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
			<div className={this.classes.wrapper}>
				{ this.state.showLogo &&
					<img src={reactLogo} className={this.classes.logo} alt={this.props.logoAlt} />
				}
				<h2>{ this.props.children }</h2>
			</div>);
	}
}

SimpleHeader.propTypes = {
	children: React.PropTypes.string.isRequired,
	logoAlt: React.PropTypes.string,
	showLogo: React.PropTypes.bool,
	classes: jssClasses,
	sheet: jssSheet,
};

SimpleHeader.defaultProps = {
	logoAlt: 'Logo',
	showLogo: true,
};

export default injectSheet(styles)(SimpleHeader);
