import "../BookCard/BookCard.scss";
import "./RemoteBookCard.scss";
import { Link } from "react-router-dom";

function RemoteBookCard(props) {
  const { image, title, author, genre, available, bookshelfId, loadingError, clickable } = props;

  return (

    <Link to={`/map/Borrow/${title}/${bookshelfId}`} className={`book-card remote-book-card--${available} ${clickable}`}>
      {available ? (
        <div className="book-card__image-container">
          <img src={image} alt="book cover" className="book-card__image" />
        </div>
      ) : (
        <div className="book-card__image-container">
          <img
            src={image}
            alt="book cover"
            className="book-card__image--unavailable"
          />
          <div className="book-card__unavailable-text">
            Currently Unavailable
          </div>
        </div>
      )}
      <ul className="book-card__book-info-container">
        <li className="book-card__title">{title}</li>
        <li className="book-card__author">by {author}</li>
        <li className="book-card__genre">genre: {genre}</li>
        <li className={`remote-book-card__available--${available}`}>Not available at this time. Check back soon!</li>
        <li className="remote-book-card__error">{loadingError}</li>
      </ul>
    </Link>
  );
}

export default RemoteBookCard;