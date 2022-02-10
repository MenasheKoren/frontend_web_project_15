import React                  from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardDelete, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes && card.likes.some((i) => i === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className="card__remove button button_hover_dark"
          onClick={handleDeleteClick}
        />
      )}
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <div className="card__caption">
        <h3 className="card__location ellipses">{card.name}</h3>
        <div className="likes-container">
          <button
            className={[
              'card__like button button_hover_light',
              isLiked ? 'button_filled' : 'button_empty',
            ].join(' ')}
            type="button"
            onClick={handleLikeClick}
          />

          <span className="card__likes-count">
            {card.likes ? card.likes.length : 0}
          </span>
        </div>
      </div>
    </li>
  );
}

export default Card;
