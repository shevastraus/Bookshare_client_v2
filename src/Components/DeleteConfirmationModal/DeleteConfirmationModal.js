import React from "react";

const DeleteConfirmationModal = ({
  image,
  title,
  //   author,
  //   genre,
  delError,
  confirmDelete,
  closeModal,
}) => {
  return (
    <div className="modal">
      <h6 className="modal__title">Confirm delete</h6>
      <section className="modal__delete-book">
        <img className="modal__delete-book-image" src={image} alt={title} />
        <p className="modal__delete-book-title">{title}</p>
      </section>
      <div className="modal__error">{delError}</div>
      <div className="modal__buttons">
        <button className="modal__cta" onClick={confirmDelete} title={title}>
          ✅ Delete this book
        </button>
        <button className="modal__cta" onClick={closeModal}>
          ❌ Don't delete
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
