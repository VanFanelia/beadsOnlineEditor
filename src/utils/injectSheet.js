/* eslint import/no-named-default:0 */
import { create } from 'jss';
import preset from 'jss-preset-default';
import { create as createInjectSheet } from 'react-jss';

const jss = create(preset());
const injectSheet = createInjectSheet(jss);

export default injectSheet;
