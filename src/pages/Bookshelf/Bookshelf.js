import "./Bookshelf.scss";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import BookCard from "../../Components/BookCard/BookCard";
import DeleteConfirmationModal from "../../Components/DeleteConfirmationModal/DeleteConfirmationModal";
import { customStyles } from "../../utils/modal-settings.js";
import logo from "../../assets/images/logo1.png";
import Loading from "../../Components/Loading/Loading";
import LoginError from "../../Components/LoginError/LoginError";
import Hero from "../../Components/Hero/Hero";
import bookshelfPhoto from "../../assets/images/bookshelf_photo.png";

function Bookshelf() {
  // state hooks:
  const [user, setUser] = useState();
  const [failedAuth, setFailedAuth] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [editError, setEditError] = useState("");
  const [modalData, setModalData] = useState({ title: null, image: null });
  const [update, setUpdate] = useState(false);

  // modal settings:
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    axios
      .get(`${process.env.REACT_APP_SERVER}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch(() => {
        setFailedAuth(true);
      });
  }, [update]);

  function convertString(str) {
    if (str === "true") {
      return true;
    } else return false;
  }

  function handleAvailabilityChange(event) {
    event.preventDefault();

    const changedBookIndex = user.foundBookshelf.books.findIndex(
      (book) => book.title === event.target.name
    );
    const updatedUser = user;
    updatedUser.foundBookshelf.books[changedBookIndex].available =
      convertString(event.target.value);
    const { bookshelf_id, books } = updatedUser.foundBookshelf;

    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    axios
      .put(
        `${process.env.REACT_APP_SERVER}book/${bookshelf_id}&${books[changedBookIndex].title}`,
        {
          available: books[changedBookIndex].available,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setUpdate(!update);
      })
      .catch((error) => {
        setEditError("Server failure. Please try again");
      });
  }

  function handleDelete(event) {
    event.preventDefault();
    setModalData({
      title: event.target.title,
      image: event.target.getAttribute("img"),
    });
    openModal();
  }

  function confirmDelete(event) {
    const { bookshelf_id } = user.foundBookshelf;
    const token = sessionStorage.getItem("token");

    axios
      .delete(
        `${process.env.REACT_APP_SERVER}book/${bookshelf_id}&${event.target.title}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const updatedUser = user;
        updatedUser.foundBookshelf = response.data;
        setUser(updatedUser);
        closeModal();
      })
      .catch((error) => {
        setDeleteError("Delete failed. Please try again later");
      });
  }

  if (failedAuth) {
    return <LoginError />;
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <main className="my-bookshelf">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirm delete"
      >
        <DeleteConfirmationModal
          image={modalData.image}
          title={modalData.title}
          delError={deleteError}
          confirmDelete={confirmDelete}
          closeModal={closeModal}
        />
      </Modal>
      <Hero imgHero={bookshelfPhoto} altText="my bookshelf" />
      <article className="my-bookshelf__container">
        <h2 className="my-bookshelf__title">My bookshelf</h2>
        <h3 className="my-bookshelf__subtitle">
          A place to keep all your books that you would like to lend out to your
          neighbours. Don't forget to mark books as unavailable if they are
          currently being borrowed.
        </h3>
        <Link to="mybookshelf/add" className="my-bookshelf__add-button">
          <img src={logo} alt="" className="my-bookshelf__button-image" />
          <span className="my-bookshelf__button-text">Add a book</span>
        </Link>
        <ul className="my-bookshelf__book-list">
          {user?.foundBookshelf?.books[0] ? (
            user?.foundBookshelf?.books?.map((book) => (
              <li className="my-bookshelf__book-card" key={book.title}>
                <BookCard
                  image={book.image}
                  title={book.title}
                  author={book.author}
                  genre={book.genre}
                  available={book.available}
                  onChange={handleAvailabilityChange}
                  handleDelete={handleDelete}
                  // delError={deleteError}
                  changeError={editError}
                />
              </li>
            ))
          ) : (
            <li className="my-bookshelf__no-books">
              You don't have any books on your bookshelf yet.&nbsp;
              <Link
                to="/mybookshelf/add"
                className="my-bookshelf__no-books--link"
              >
                Add a book
              </Link>
              &nbsp;to start sharing!
            </li>
          )}
        </ul>
        {user.foundBookshelf.books.length > 2 ? (
          <Link to="mybookshelf/add" className="my-bookshelf__add-button">
            <img src={logo} alt="" className="my-bookshelf__button-image" />
            <span className="my-bookshelf__button-text">Add a book</span>
          </Link>
        ) : null}
      </article>
    </main>
  );
}

export default Bookshelf;
