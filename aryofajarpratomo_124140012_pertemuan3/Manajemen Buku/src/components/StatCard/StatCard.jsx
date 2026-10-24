import React from 'react';
import PropTypes from 'prop-types';
import './StatCard.css';

/** Kartu angka statistik dengan bar persentase opsional. */
function StatCard({ label, value, percent, variant = 'total' }) {
  return (
    <div className={`stat-card stat-${variant}`}>
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {percent !== undefined && (
        <>
          <div className="stat-bar" aria-hidden="true">
            <div className="stat-bar-fill" style={{ width: `${percent}%` }} />
          </div>
          <p className="stat-percent">{percent}% dari koleksi</p>
        </>
      )}
    </div>
  );
}

StatCard.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  percent: PropTypes.number,
  variant: PropTypes.oneOf(['total', 'milik', 'baca', 'beli']),
};

export default StatCard;
