import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

function Header({ title, description }) {
  return (
    <header className="header">
      <h1>{title}</h1>
      {/* Deskripsi hanya dirender jika dikirim oleh komponen induk */}
      {description && <p>{description}</p>}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Header;
