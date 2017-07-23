import React from 'react';
import SimpleHeader from '../components/SimpleHeader';
import SimpleIntro from '../components/SimpleIntro';
import beadsLogo from '../graphics/BeadsLogo.svg';
import injectSheet from '../utils/injectSheet';

import { translate } from '../utils/translate';
import { jssSheet } from '../utils/propTypes';

const styles = {
	paragraph: {
		maxWidth: '600px',
		textAlign: 'center',
		margin: 'auto',
	},
};

const Home = ({ sheet: { classes } }) => (
	<div>
		<SimpleHeader logo={beadsLogo}>Beads Online Editor</SimpleHeader>
		<SimpleIntro>
			<p className={classes.paragraph}>{translate('HOME_INTRODUCTION')}</p>
		</SimpleIntro>
	</div>
);

Home.propTypes = {
	sheet: jssSheet.isRequired,
};

Home.defaultProps = {
};


export default injectSheet(styles)(Home);
