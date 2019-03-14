/**
 *
 * Asynchronously loads the component for Terminals
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
