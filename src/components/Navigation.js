import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { connect } from 'react-redux';

import beadsLogoBlack from '../graphics/BeadsLogoBlackBackground.svg';
import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import transition from '../style/transition';
import { textRatioFontSize, textRatioLineHeight } from '../utils/fontRatio';
import { jssSheet } from '../utils/propTypes';
import { darkGrayBackground, lightFontColor, white } from '../style/colors';
import { setMode, MODES } from '../reducers/global';


const styles = {
	wrapper: {
		overflow: 'hidden',
		background: darkGrayBackground,
		color: lightFontColor,
		height: grid('l'),
	},
	list: {
		margin: '0',
		padding: `0 0 0 ${grid('l')}`,
		height: '100%',
		listStyle: 'none',
		display: 'flex',
		alignItems: 'center',
	},
	item: {
		lineHeight: grid('l'),
	},
	anchor: {
		display: 'block',
		color: lightFontColor,
		textDecoration: 'none',
		fontWeight: 'bold',
		padding: `${grid('xs')} ${grid('xs')} ${grid('xs', false) - 2}px ${grid('xs')}`,
		borderBottom: '2px solid transparent',
		fontSize: textRatioFontSize('s'),
		lineHeight: textRatioLineHeight('s'),
		transition: transition(),
		'&:hover': {
			background: 'rgba(255,255,255,0.15)',
		},
	},
	current: {
		borderBottom: `2px solid ${white}`,
	},
	logo: {
		height: grid('m'),
		width: 'auto',
		margin: `${grid('xs', false) / 2}px 0 0 ${grid('xs', false) / 2}px`,
		position: 'absolute',
	},
};

const languageKeys = {
	logoAltDescription: 'Logo beads editor',
};

const Navigation = ({ sheet: { classes }, ...props }) => {
	const menuItems = [
		{
			path: '/',
			label: 'Home',
		},
		{
			path: '/beads-editor',
			label: 'Beads Editor',
			onClick: props.resetBeadsEditor,
		},
		{
			path: '/about',
			label: 'About',
		},
	];

	return (<nav className={classes.wrapper}>
		<img
			src={beadsLogoBlack}
			className={classes.logo}
			alt={languageKeys.logoAltDescription}
		/>
		<ul className={classes.list}>
			{
				menuItems.map(({ path, label, onClick }) => (
					<li
						key={`wrapper-${path}`}
						className={classNames({
							[classes.item]: true,
						})}
					>
						<NavLink
							className={classNames({
								[classes.anchor]: true,
							})}
							to={path}
							exact
							activeClassName={classes.current}
							onClick={onClick}
						>
							{ label }
						</NavLink>
					</li>
				))
			}
		</ul>
	</nav>);
};

Navigation.propTypes = {
	sheet: jssSheet.isRequired,
	currentPath: PropTypes.string,
	resetBeadsEditor: PropTypes.func.isRequired,
};

Navigation.defaultProps = {
	currentPath: '',
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
	resetBeadsEditor: () => {
		dispatch(setMode(MODES.INIT));
		return false;
	},
});

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps)(injectSheet(styles)(Navigation),
	),
);

