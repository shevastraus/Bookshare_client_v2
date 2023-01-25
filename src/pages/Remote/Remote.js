import { Component } from "react";
import axios from "axios";
import RemoteBookCard from "../../Components/RemoteBookCard/RemoteBookCard";
import LoginError from "../../Components/LoginError/LoginError";
import Loading from "../../Components/Loading/Loading";
import Hero from "../../Components/Hero/Hero";
import remoteBookshelfPhoto from "../../assets/images/remote_bookshelf_photo.png";

class Remote extends Component {
  state = {
    user: null,
    failedAuth: false,

    remoteBookshelvesData: null,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return this.setState({ failedAuth: true });
    }

    let { bookshelf_id } = this.props.match.params;
    axios
      .get(`${process.env.REACT_APP_SERVER}bookshelves/${bookshelf_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          remoteBookshelvesData: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    if (this.state.failedAuth) {
      return <LoginError />;
    }

    if (!this.state.remoteBookshelvesData) {
      return <Loading />;
    }
    const { books } = this.state.remoteBookshelvesData;

    return (
      <main className="my-bookshelf">
        <Hero imgHero={remoteBookshelfPhoto} altText="my bookshelf" />
        <article className="my-bookshelf__container">
          <h2 className="my-bookshelf__title">Your neighbour's bookshelf</h2>
          <h3 className="my-bookshelf__subtitle">
            This is your neighbour's collection of books that he or she is
            offering to share. Click on an available title to send a message
            requesting to borrow.
          </h3>

          <ul className="my-bookshelf__book-list">
            {books[0] ? (
              books.map((book) => (
                <li className="my-bookshelf__book-card" key={book.title}>
                  <RemoteBookCard
                    image={book.image}
                    title={book.title}
                    author={book.author}
                    genre={book.genre}
                    available={book.available}
                    bookshelfId={this.props.match.params.bookshelf_id}
                  />
                </li>
              ))
            ) : (
              <li className="my-bookshelf__no-books">
                This user doesn't have any books on his or her bookshelf yet.
                Check back soon!
              </li>
            )}
          </ul>
        </article>
      </main>
    );
  }
}

export default Remote;
