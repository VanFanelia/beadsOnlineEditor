import React from 'react';
import Helmet from 'react-helmet';
import SimpleHeader from '../components/SimpleHeader';
import ContactPattern from '../components/ContactPattern';

import email from '../graphics/email.svg';
import reactLogo from '../graphics/ReactLogo.svg';

import { translate } from '../utils/translate';

const About = () => (
	<div>
		<Helmet
			title={'This is another page'}
			meta={[{
				name: 'description',
				content: 'This is the meta description of another page',
			}]}
		/>
		<SimpleHeader logo={reactLogo} animation >Created with react</SimpleHeader>
		<ContactPattern image={email} headline={translate('CONTACT')}>
			<a href="mailto:">beads[at]chaospott.de</a>
			<p>Ansprechpartner: <strong>Van</strong></p>
		</ContactPattern>
	</div>
);

export default About;
