import React from 'react';
import SimpleHeader from '../components/SimpleHeader';

const LogoColorPalette = () => (
	<div>
		<SimpleHeader>Welcome to the homepage</SimpleHeader>
		<link rel="text/css" href="./logoColor.css" />
		<h1>Color Palette by Paletton.com</h1>
		<p>Palette URL: <a href="http://paletton.com/#uid=75-0X0kl1llm6e2lzhIktp3jXsI">http://paletton.com/#uid=75-0X0kl1llm6e2lzhIktp3jXsI</a></p>

		<table className="color-table">
			<tr>
				<th>Primary color:</th>
				<td className="sample sample-1 primary-1">
					<div className="white">#6C2129</div>
					<div className="black">#6C2129</div>
				</td>
				<td className="sample sample-2 primary-2">
					<div className="white">#882D35</div>
					<div className="black">#882D35</div>
				</td>
				<td className="sample sample-0 primary-0">
					<div className="white">#A43843</div>
					<div className="black">#A43843</div>
				</td>
				<td className="sample sample-3 primary-3">
					<div className="white">#C14651</div>
					<div className="black">#C14651</div>
				</td>
				<td className="sample sample-4 primary-4">
					<div className="white">#DD5360</div>
					<div className="black">#DD5360</div>
				</td>
			</tr>

			<tr>
				<th>Secondary color (1):</th>
				<td className="sample sample-1 secondary-1-1">
					<div className="white">#705423</div>
					<div className="black">#705423</div>
				</td>
				<td className="sample sample-2 secondary-1-2">
					<div className="white">#8D6B2E</div>
					<div className="black">#8D6B2E</div>
				</td>
				<td className="sample sample-0 secondary-1-0">
					<div className="white">#AA823A</div>
					<div className="black">#AA823A</div>
				</td>
				<td className="sample sample-3 secondary-1-3">
					<div className="white">#C89A48</div>
					<div className="black">#C89A48</div>
				</td>
				<td className="sample sample-4 secondary-1-4">
					<div className="white">#E5B256</div>
					<div className="black">#E5B256</div>
				</td>
			</tr>
			<tr>
				<th>Secondary color (2):</th>
				<td className="sample sample-1 secondary-2-1">
					<div className="white">#1C2D4A</div>
					<div className="black">#1C2D4A</div>
				</td>
				<td className="sample sample-2 secondary-2-2">
					<div className="white">#243A5E</div>
					<div className="black">#243A5E</div>
				</td>
				<td className="sample sample-0 secondary-2-0">
					<div className="white">#2E4671</div>
					<div className="black">#2E4671</div>
				</td>
				<td className="sample sample-3 secondary-2-3">
					<div className="white">#385484</div>
					<div className="black">#385484</div>
				</td>
				<td className="sample sample-4 secondary-2-4">
					<div className="white">#426298</div>
					<div className="black">#426298</div>
				</td>
			</tr>
			<tr>
				<th>Complement color:</th>
				<td className="sample sample-1 complement-1">
					<div className="white">#285D1D</div>
					<div className="black">#285D1D</div>
				</td>
				<td className="sample sample-2 complement-2">
					<div className="white">#347626</div>
					<div className="black">#347626</div>
				</td>
				<td className="sample sample-0 complement-0">
					<div className="white">#418E31</div>
					<div className="black">#418E31</div>
				</td>
				<td className="sample sample-3 complement-3">
					<div className="white">#4FA73C</div>
					<div className="black">#4FA73C</div>
				</td>
				<td className="sample sample-4 complement-4">
					<div className="white">#5DBF48</div>
					<div className="black">#5DBF48</div>
				</td>
			</tr>
		</table>

		<table className="color-table small">
			<tr>
				<th>Primary color:</th>
				<td className="sample sample-1 primary-1">&nbsp;</td>
				<td className="sample sample-2 primary-2">&nbsp;</td>
				<td className="sample sample-0 primary-0">&nbsp;</td>
				<td className="sample sample-3 primary-3">&nbsp;</td>
				<td className="sample sample-4 primary-4">&nbsp;</td>
			</tr>
			<tr>
				<th>Secondary color (1):</th>
				<td className="sample sample-1 secondary-1-1">&nbsp;</td>
				<td className="sample sample-2 secondary-1-2">&nbsp;</td>
				<td className="sample sample-0 secondary-1-0">&nbsp;</td>
				<td className="sample sample-3 secondary-1-3">&nbsp;</td>
				<td className="sample sample-4 secondary-1-4">&nbsp;</td>
			</tr>
			<tr>
				<th>Secondary color (2):</th>
				<td className="sample sample-1 secondary-2-1">&nbsp;</td>
				<td className="sample sample-2 secondary-2-2">&nbsp;</td>
				<td className="sample sample-0 secondary-2-0">&nbsp;</td>
				<td className="sample sample-3 secondary-2-3">&nbsp;</td>
				<td className="sample sample-4 secondary-2-4">&nbsp;</td>
			</tr>
			<tr>
				<th>Complement color:</th>
				<td className="sample sample-1 complement-1">&nbsp;</td>
				<td className="sample sample-2 complement-2">&nbsp;</td>
				<td className="sample sample-0 complement-0">&nbsp;</td>
				<td className="sample sample-3 complement-3">&nbsp;</td>
				<td className="sample sample-4 complement-4">&nbsp;</td>
			</tr>
		</table>

		<p>
			See the HTML source for more details.<br />
			Use the <em>Save / Save As...</em>
			command in your browser to store the document for latter use.
		</p>

		<hr />
		<p id="footer">Generated by <a href="http://paletton.com">Paletton.com</a> © 2002-2014</p>
	</div>
);

export default LogoColorPalette;
