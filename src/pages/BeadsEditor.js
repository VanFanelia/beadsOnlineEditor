import React from 'react';

import BeadsEditor from '../components/container/BeadsEditor';

const BeadsEditorContainer = (routeParams) => {
	const presetImage = routeParams.match.params.img;
	const width = routeParams.match.params.width;
	const height = routeParams.match.params.height;
	return (<BeadsEditor
		presetImage={presetImage}
		presetImageWidth={width ? parseInt(width, 10) : 0}
		presetImageHeight={height ? parseInt(height, 10) : 0}
	/>);
};

export default BeadsEditorContainer;
