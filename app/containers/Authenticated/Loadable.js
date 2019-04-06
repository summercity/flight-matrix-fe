/**
 *
 * Asynchronously loads the component for Authenticated
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
