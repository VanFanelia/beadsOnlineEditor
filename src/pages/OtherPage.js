import React from 'react';
import Helmet from 'react-helmet';
import SimpleHeader from '../components/SimpleHeader';
import SimpleIntro from '../components/SimpleIntro';
import beadsLogo from '../graphics/BeadsLogo.svg';
import beadsLogoBlack from '../graphics/BeadsLogoBlackBackground.svg';

const OtherPage = () => (
	<div>
		<Helmet
			title={'This is another page'}
			meta={[{
				name: 'description',
				content: 'This is the meta description of another page',
			}]}
		/>
		<SimpleHeader>Welcome to the other page</SimpleHeader>
		<SimpleIntro>
			<p>React Components make creating websites finally feel clean and productive.</p>
			<img src={beadsLogo} alt="foobar" />
			<img src={beadsLogoBlack} alt="foobar" />
		</SimpleIntro>
	</div>
);

export default OtherPage;
