import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_LABEL } from '../../utils/bookUtils';
import './StatusBadge.css';

/** Label status berwarna. Dipakai di kartu buku dan halaman statistik. */
function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{STATUS_LABEL[status]}</span>;
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
};

export default StatusBadge;
