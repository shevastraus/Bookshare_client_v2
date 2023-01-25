import "./BookCard.scss";
import bin from "../../assets/images/delete_outline_black_24dp.svg";

function BookCard(props) {
  let {
    image,
    title,
    author,
    genre,
    available,
    onChange,
    handleDelete,
    delError,
    changeError,
  } = props;

  return (
    <article className="book-card">
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
        <li>
          <select
            name={title}
            onChange={onChange}
            defaultValue={available}
            className="book-card__drop-down-menu"
          >
            <option value={true}>Available</option>
            <option value={false}>Not available</option>
          </select>
        </li>
        <li>
          <button
            onClick={handleDelete}
            className="book-card__delete"
            title={title}
            img={image}
          >
            <img src={bin} alt="delete" />
            Delete book
          </button>
        </li>
        <li className="book-card__delete-error">{delError}</li>
        <li className="book-card__delete-error">{changeError}</li>
      </ul>
    </article>
  );
}

export default BookCard;
