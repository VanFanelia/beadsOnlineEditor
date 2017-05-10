import React from 'react';
import PropTypes from 'prop-types';

const HtmlWrapper = (props) => {
	// eslint-disable-next-line react/no-danger
	const content = (<div id="content" dangerouslySetInnerHTML={{ __html: props.appContent }} />);
	const htmlAttributes = props.head.htmlAttributes.toComponent();

	return (
		<html lang="en" {...htmlAttributes}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				{props.head.title.toComponent()}
				{props.head.meta.toComponent()}
				{props.head.link.toComponent()}
				<style id={props.appStyleId} type="text/css">
					{props.appStyle}
				</style>
			</head>
			<body>
				<div id="root">
					{ content }
				</div>
				<script src={`/static/js/main.${props.buildHash}.js`} type="text/javascript" charSet="utf-8" />
			</body>
		</html>
	);
};

HtmlWrapper.propTypes = {
	appContent: PropTypes.node.isRequired,
	appStyle: PropTypes.string.isRequired,
	appStyleId: PropTypes.string.isRequired,
	buildHash: PropTypes.string.isRequired,
	head: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default HtmlWrapper;
