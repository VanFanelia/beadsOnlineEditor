import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import injectSheet from '../utils/injectSheet';
import { jssSheet, jssClasses } from '../utils/propTypes';
import { getBeadIdData } from '../utils/beadColors';

const styles = {
	picturePreviewContainer: {
		width: 'auto',
	},
	hide: {
		display: 'none',
	},
	table: {
		background: 'yellow',
	}
};


const PrintPreview = ({ sheet: { classes }, ...props }) => {
	console.log(props.blockData);

	return (
		<div
			className={classNames({
				[classes.picturePreviewContainer]: true,
				[classes.hide]: !props.visible,
			})}
		>
			{
				props.blockData.map((blockRow, blockRowCounter) => (
					blockRow.map(block => (
						// eslint-disable-next-line react/no-array-index-key
						<table className={classes.table} key={`PrintPreviewblockRow${blockRowCounter}`}>
							<tbody> {
								block.map((row, rowCounter) => (
									// eslint-disable-next-line react/no-array-index-key
									<tr key={`PrintPreviewRow${rowCounter}`}>
										{row.map(bead => (
											<td>{
												Object.keys(bead.beadData).length !== 0
													? getBeadIdData(bead.beadData.beadId).id
													: ''
											}
											</td>
										))}
									</tr>
								))},
							</tbody>
						</table>
					))
				))}
		</div>
	);
};

PrintPreview.propTypes = {
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	blockData: PropTypes.arrayOf(PropTypes.array).isRequired,
	visible: PropTypes.bool,
};

PrintPreview.defaultProps = {
	visible: false,
};

export default injectSheet(styles)(PrintPreview);
