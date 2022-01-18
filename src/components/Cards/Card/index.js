import React from 'react';
import PropTypes from 'prop-types';

//style
import './card.scss'

const Card = ({image, description, title}) => {
  return (
    <div className='card'>
      <img className='card__img' src={image} alt={title}/>
      <h3 className='card__title'>{title}</h3>
      <p className='card__description'>{description}</p>
    </div>
  );
};

//proptypes
Card.propTypes = {
  image: PropTypes.string.isRequired,
  description:  PropTypes.string.isRequired,
  title:  PropTypes.string.isRequired
}

export default Card;
