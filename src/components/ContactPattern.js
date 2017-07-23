import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import injectSheet from '../utils/injectSheet';
import { lightGrayBackground, white, lightBorderColor } from '../style/colors';
import { jssSheet, jssClasses } from '../utils/propTypes';

import grid from '../utils/grid';

const styles = {
	contact: {
		padding: `${grid('xl')} 0`,
	},
	containerFullWidth: {
		maxWidth: '100%',
		margin: 'auto',
	},
	backgroundColorGray: {
		backgroundColor: lightGrayBackground,
	},
	containerSmall: {
		maxWidth: '1040px',
		paddingLeft: grid('l'),
		paddingRight: grid('l'),
		margin: 'auto',
		position: 'relative',
	},
	headline: {
		width: '600px',
		textAlign: 'center',
		margin: `auto auto ${grid('xs')} auto`,
	},
	subline: {},
	figure: {
		display: 'flex',
		backgroundColor: white,
		borderRadius: '2px',
		overflow: 'hidden',
		marginTop: grid('l'),
		marginBottom: 0,
		border: `1px solid ${lightBorderColor}`,
		boxSizing: 'border-box',
	},
	imageWrapper: {
		width: '50%',
		height: '100%',
		maxWidth: '50%',
		flexBasis: '50%',
		borderRadius: '2px 0 0 2px',
		lineHeight: 0,
		verticalAlign: 'middle',
		display: 'block',
	},
	image: {
		margin: `${grid('l')} auto ${grid('l')} auto`,
		display: 'block',
		width: '60%',
		height: 'auto',

	},
	figcaption: {
		textAlign: 'center',
		display: 'flex',
		flexDirection: 'column',
		padding: grid('xs'),
		flexBasis: '50%',
		justifyContent: 'center',
	},
	clr: {
		clear: 'both',
		display: 'block',
	},
};

const ContactPattern = ({ sheet: { classes }, ...props }) => (
	<section className={classNames({
		[classes.contact]: true,
		[classes.containerFullWidth]: true,
		[classes.backgroundColorGray]: true,
	})}
	>
		<div className={classes.containerSmall}>
			{ props.headline && <h2 className={classes.headline}>{props.headline}</h2> }
			{ props.subline && <strong className={classes.subline}>{props.subline}</strong> }
			<figure className={classes.figure}>
				<div className={classes.imageWrapper}>
					<img
						src={props.image}
						alt={props.imageAlt}
						className={classes.image}
					/>
				</div>
				<figcaption className={classes.figcaption}>
					{props.children}
				</figcaption>
			</figure>
			<div className={classes.clr} />
		</div>
	</section>
);

ContactPattern.propTypes = {
	headline: PropTypes.string.isRequired,
	subline: PropTypes.string,
	image: PropTypes.string.isRequired,
	imageAlt: PropTypes.string,
	children: PropTypes.node.isRequired,
	classes: jssClasses.isRequired,
	sheet: jssSheet.isRequired,
};

ContactPattern.defaultProps = {
	subline: '',
	imageAlt: '',
};

export default injectSheet(styles)(ContactPattern);
