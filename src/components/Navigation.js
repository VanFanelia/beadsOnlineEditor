import React from 'react';
import { Link } from 'react-router';

import beadsLogoBlack from '../graphics/BeadsLogoBlackBackground.svg';
import injectSheet from '../utils/injectSheet';
import grid from '../utils/grid';
import transition from '../style/transition';
import { textRatioFontSize, textRatioLineHeight } from '../utils/fontRatio';
import { jssSheet } from '../utils/propTypes';
import { darkGrayBackground, lightFontColor } from '../style/colors';


const styles = {
	wrapper: {
		overflow: 'hidden',
		background: darkGrayBackground,
		color: lightFontColor,
		height: grid('xl'),
	},
	list: {
		margin: '0',
		padding: `0 0 0 ${grid('xxl')}`,
		height: '100%',
		listStyle: 'none',
		display: 'flex',
		alignItems: 'center',
	},
	item: {},
	anchor: {
		color: lightFontColor,
		textDecoration: 'none',
		fontWeight: 'bold',
		padding: grid('xs'),
		fontSize: textRatioFontSize('s'),
		lineHeight: textRatioLineHeight('s'),
		border: '2px solid transparent',
		transition: transition(),
		height: '100%',
		'&:hover': {
			background: 'rgba(255,255,255,0.15)',
			border: '2px solid rgba(255,255,255,0.3)',
		},
	},
	logo: {
		height: grid('l'),
		width: 'auto',
		margin: `${grid('xs')} 0 0 ${grid('xs')}`,
		position: 'absolute',
	},
};

const menuItems = [
	{
		path: '/',
		label: 'Home',
	},
	{
		path: '/beads-editor',
		label: 'Beads Editor',
	},
	{
		path: '/about',
		label: 'About',
	},
	{
		path: '/logo',
		label: 'Logo Colors',
	},
];

const languageKeys = {
	logoAltDescription: 'Logo beads editor',
};

const Navigation = ({ sheet: { classes } }) => (
	<nav className={classes.wrapper}>
		<img
			src={beadsLogoBlack}
			className={classes.logo}
			alt={languageKeys.logoAltDescription}
		/>
		<ul className={classes.list}>
			{
				menuItems.map(({ path, label }) => (
					<li key={`wrapper-${path}`} className={classes.item}>
						<Link
							className={classes.anchor}
							to={path}
						>
							{ label }
						</Link>
					</li>
				))
			}
		</ul>
	</nav>
);

Navigation.propTypes = {
	sheet: jssSheet.isRequired,
};

export default injectSheet(styles)(Navigation);

