import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';

// Latihan Mandiri (Components & Props): wadah berbingkai yang menampilkan props.children
function Card({ children, title }) {
  return (
    <section className="card">
      {title && <h2 className="card-title">{title}</h2>}
      {children}
    </section>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
};

export default Card;
