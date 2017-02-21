import React from 'react';
import SimpleHeader from '../components/SimpleHeader';
import SimpleIntro from '../components/SimpleIntro';

const Home = () => (
	<div>
		<SimpleHeader>Welcome to the homepage</SimpleHeader>
		<SimpleIntro>
			<p>It is beautiful here, isn&lsquo;t it?</p>
		</SimpleIntro>
	</div>
);

export default Home;
