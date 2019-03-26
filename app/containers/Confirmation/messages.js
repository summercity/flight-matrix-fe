/*
 * Confirmation Messages
 *
 * This contains all the text for the Confirmation container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Confirmation';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Confirmation',
  },
  msg: {
    id: `${scope}.message`,
    defaultMessage: 'Are you sure that you wish to proceed? If so click "Yes".',
  },
});
