import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import injectSheet from '../utils/injectSheet';
import Circle from './Circle';
import { jssSheet, jssClasses } from '../utils/propTypes';
import { getBeadIdData } from '../utils/beadColors';
import { sortByPosition } from '../utils/sortFunctions/sortByPosition';
import { black } from '../style/colors';


const styles = {
	picturePreviewContainer: {
		width: 'auto',
	},
	page: {
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	hide: {
		display: 'none',
	},
	tablePearls: {
		flex: 1,
		flexBasis: '50%',
	},
	tableSum: {
		flex: 1,
		flexBasis: '50%',
	},
	tableCell: {
		border: `1px solid ${black}`,
	},
};

const PrintPreview = ({ sheet: { classes }, ...props }) => (
	<div
		className={classNames({
			[classes.picturePreviewContainer]: true,
			[classes.hide]: !props.visible,
		})}
	>
		{
			props.blockData.blocksY.map(row => (
				props.blockData.blocksX.map(col => (
					<div className={classes.page}>
						<table className={classes.tablePearls} key={`PrintPreviewTable-${row}-${col}`}>
							<tbody>
								{
									[1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
										11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
										21, 22, 23, 24, 25, 26, 27, 28, 29].map(rowInBlock => (
											<tr className={classes.row} key={`PrintPreviewTableRow-${row}-${col}-${rowInBlock}`}>
												{ props.blockData.data.filter(entry => (
													entry.blockY === row && entry.blockX === col && entry.row === rowInBlock
												)).sort(sortByPosition).map(bead => (
													<td key={`PrintPreviewTableCell-${bead.key}`} className={classes.tableCell}>
														<Circle
															key={`Circle-${bead.key}`}
															color={bead.beadData.beadId ?
																getBeadIdData(bead.beadData.beadId).color :
																'#000000'}
															alpha={bead.beadData.beadId ?
																getBeadIdData(bead.beadData.beadId).alpha :
																0}
														/>
													</td>
												))}
											</tr>
									))
								}
							</tbody>
						</table>
						<table className={classes.tableSum}>
							<tbody>
								<tr>
									<td>Foobar</td>
								</tr>
							</tbody>
						</table>
					</div>
				))
			))
		}
	</div>
);

PrintPreview.propTypes = {
	sheet: jssSheet.isRequired,
	classes: jssClasses.isRequired,
	blockData: PropTypes.objectOf(PropTypes.any).isRequired,
	visible: PropTypes.bool,
};

PrintPreview.defaultProps = {
	visible: false,
};

export default injectSheet(styles)(PrintPreview);
