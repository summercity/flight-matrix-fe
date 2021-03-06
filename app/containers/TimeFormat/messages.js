/*
 * TimeFormat Messages
 *
 * This contains all the text for the TimeFormat container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.TimeFormat';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TimeFormat container!',
  },
  minutes: {
    id: `${scope}.header`,
    defaultMessage: 'EVERY 15 MINUTES',
  },
  hourly: {
    id: `${scope}.header`,
    defaultMessage: 'EVERY HOUR',
  },
});
