/*
 * Terminals Messages
 *
 * This contains all the text for the Terminals component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Terminals';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Terminals component!',
  },
  terminals: {
    id: `${scope}.header`,
    defaultMessage: 'Terminal',
  },
});
