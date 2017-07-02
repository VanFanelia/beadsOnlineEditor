import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import injectSheet from '../utils/injectSheet';

import { black, white, lightGrayBackground } from '../style/colors';
import { jssSheet } from '../utils/propTypes';
import { beadList, NO_BEAD } from '../utils/beadColors';

import grid from '../utils/grid';
import { textRatioLineHeight, textRatioFontSize } from '../utils/fontRatio';
import { translate } from '../utils/translate';
import ColorFilter from './ColorFilter';
import ColorBeadPanel from './ColorBeadPanel';

const styles = {
	colorBar: {
		backgroundColor: lightGrayBackground,
		position: 'absolute',
		height: `calc(100% - ${grid('xl + l')})`,
		marginTop: grid('l'),
		padding: grid('xs'),
		paddingTop: grid('s'),
		color: black,
		width: grid('xxxl + xxl'),
		right: 0,
		top: 0,
	},
	hide: {
		display: 'none',
	},
	hidden: {
		width: grid('xs'),
	},
	input: {
		width: grid('xxxl + xl'),
		display: 'block',
		height: grid('s'),
		lineHeight: textRatioLineHeight('s'),
		fontSize: textRatioFontSize('s'),
		margin: `0 0 ${grid('xs')} 0`,
	},
	colorList: {
		padding: `0 ${grid('s')} 0 0`,
		margin: 0,
		listStyleType: 'none',
		height: '100%',
		overflowY: 'auto',
	},
	colorFilter: {
		display: 'inline-block',
	},
};

const ColorBar = ({ sheet: { classes }, ...props }) =>
(
	<div className={classNames({ [classes.colorBar]: true, [classes.hide]: !props.visible })}>
		<ColorFilter setColorFilter={props.setColorFilter} colorFilter={props.colorFilter} />
		<input className={classes.input} type="text" value={''} placeholder={translate('SEARCH_PLACEHOLDER')} />
		<ul className={classes.colorList}>
			<ColorBeadPanel
				beadId={NO_BEAD}
				backgroundColor={lightGrayBackground}
				textColor={white}
				colorName={translate('NO_BEAD')}
				onClick={props.setCurrentCanvasColor}
				isSelected={props.currentCanvasBead === null}
			/>
			{ Object.values(beadList).map(bead => (
				<ColorBeadPanel
					key={`ColorPanel${bead.id}`}
					beadId={bead.id}
					backgroundColor={bead.color}
					colorName={translate(`${bead.id}_NAME`)}
					textColor={white}
					onClick={props.setCurrentCanvasColor}
					isSelected={props.currentCanvasBead === bead.id}
					visible={props.colorFilter === bead.category || props.colorFilter === ''}
				/>
				))
			}
		</ul>
	</div>
);

ColorBar.propTypes = {
	sheet: jssSheet.isRequired,
	setCurrentCanvasColor: PropTypes.func.isRequired,
	setColorFilter: PropTypes.func.isRequired,
	colorFilter: PropTypes.string.isRequired,
	currentCanvasBead: PropTypes.string.isRequired,
	visible: PropTypes.bool,
};

ColorBar.defaultProps = {
	visible: true,
};

export default connect()(injectSheet(styles)(ColorBar));
