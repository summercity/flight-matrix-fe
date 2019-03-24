/**
 *
 * Asynchronously loads the component for PagesData
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
