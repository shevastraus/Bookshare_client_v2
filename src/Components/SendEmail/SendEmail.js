import "./SendEmail.scss";
import { Link } from 'react-router-dom';
import logo from "../../assets/images/logo1.png";

function SendEmail({ ownerEmail, ownerUserName, title, author, borrowerUserName, borrowerEmail, onSubmit, errorMessage }) {

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="contact-form__label">Name:
        <p className="contact-form__not-a-field">{borrowerUserName}</p>
      </div>
      <div className="contact-form__label">Email:
        <p className="contact-form__not-a-field">{borrowerEmail}</p>
      </div>

      <label className="contact-form__label contact-form__label--textarea">
        Message:
        <textarea
          name="message"
          className="contact-form__text-area"
          placeholder="Your message to this book's owner. Introduce yourself and suggest a convenient pickup time!"
        />
      </label>

      <input type="hidden" name="from_name" value={borrowerUserName} />
      <input type="hidden" name="reply_to" value={borrowerEmail} />


      <input type="hidden" name="to_name" value={ownerUserName} />
      <input type="hidden" name="to_email" value={ownerEmail} />
      <input type="hidden" name="book_title" value={title} />
      <input type="hidden" name="book_author" value={author} />

      <div className="contact-form__error">{errorMessage}</div>


      <button type="submit" className="contact-form__button">
        <img src={logo} alt="" className="contact-form__button-image" />
        <span className="contact-form__button-text">Send message</span>
      </button>
      <Link to="/map" className="add__cancel">return to map</Link>
    </form>
  );
}

export default SendEmail;
