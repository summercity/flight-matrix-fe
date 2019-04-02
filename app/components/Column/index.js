/**
 *
 * Column
 *
 */

import React from 'react';
import PendingIcon from '@material-ui/icons/AirplanemodeActive';
import CancelledIcon from '@material-ui/icons/AirplanemodeInactive';
import OnSiteIcon from '@material-ui/icons/LocalGasStation';
import CompletedIcon from '@material-ui/icons/EventAvailable';

function Column({
  type,
  className,
  iconPending,
  iconCancelled,
  iconOnSite,
  iconCompleted,
}) {
  switch (type) {
    case '@blank':
      return <td className={className} />;
    case '@pending':
      return (
        <td className={className}>
          <PendingIcon className={iconPending} />
        </td>
      );
    case '@cancelled':
      return (
        <td className={className}>
          <CancelledIcon className={iconCancelled} />
        </td>
      );
    case '@on-site':
      return (
        <td className={className}>
          <OnSiteIcon className={iconOnSite} />
        </td>
      );
    case '@completed':
      return (
        <td className={className}>
          <CompletedIcon className={iconCompleted} />
        </td>
      );
    default:
      return null;
  }
}

Column.propTypes = {};

export default Column;
