import React from 'react';
import SimpleIntro from '../components/SimpleIntro';
import StartupEditorChooser from '../components/StartupEditorChooser';

class BeadsEditor extends React.Component {

	constructor(props) {
		super(props);
		this.state = { mode: props.mode };
	}

	render() {
		return (
			<div>
				<StartupEditorChooser choice={this.state.mode === ''} />
				<SimpleIntro>
					<p>React Components make creating websites finally feel clean and productive.</p>
					<p>
						Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
						tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
					</p>
					<p>
						At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
						no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
						consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
						dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
						dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
						Lorem ipsum dolor sit amet.
					</p>
				</SimpleIntro>
			</div>
		);
	}
}

BeadsEditor.propTypes = {
	mode: React.PropTypes.string,
};

BeadsEditor.defaultProps = {
	mode: '',
};


export default BeadsEditor;
