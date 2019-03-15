/**
 *
 * Column
 *
 */

import React from 'react';
import PendingIcon from '@material-ui/icons/AirplanemodeActive';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

/* eslint-disable react/prefer-stateless-function */
// class Column extends React.Component {
//   render() {
//     return (
//       <td>HELLO {this.props.name}</td>
//     );
//   }
// }

function Column({ type, className, classIcon }) {
  switch (type) {
    case '@blank':
      return <td className={className}>x</td>;
    case '@pending':
      return (
        <td className={className}>
          <PendingIcon className={classIcon} />
        </td>
      );
    default:
      return null;
  }
}

Column.propTypes = {};

export default Column;
