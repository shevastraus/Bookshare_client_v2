import "./Add.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginError from "../../Components/LoginError/LoginError";
import logo from "../../assets/images/logo1.png";
import addImage from "../../assets/images/add_book_image.png";
import Loading from "../../Components/Loading/Loading";
import Hero from "../../Components/Hero/Hero";
import altCover from "../../assets/images/alt_cover.png";
const Books_API = "https://www.googleapis.com/books/v1/volumes?q=";

class Add extends Component {
  state = {
    // auth states:
    user: null,
    failedAuth: false,

    // form states:
    bookTitle: "",
    bookAuthor: "",
    error: "",

    // book info from Google Books API:
    bookImage: "",
    bookGenre: "",
    apiError: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid()) {
      axios
        .get(
          `${Books_API}intitle:${this.state.bookTitle}&inauthor:${this.state.bookAuthor}&key=${process.env.REACT_APP_BOOKS_API_KEY}`
        )
        .then((response) => {
          console.log(response.data.items[0].volumeInfo.categories);
          if (response.data.items[0].volumeInfo.imageLinks.thumbnail) {
            this.setState({
              bookImage: response.data.items[0].volumeInfo.imageLinks.thumbnail,
            });
          } else {
            this.setState({
              bookImage: altCover,
            });
          }

          if (response.data.items[0].volumeInfo.categories) {
            this.setState({
              bookGenre: response.data.items[0].volumeInfo.categories[0],
            });
          } else {
            this.setState({
              bookGenre: "---",
            });
          }

          // chaining the GET request
          axios
            .post(`${process.env.REACT_APP_SERVER}users`, {
              title: this.state.bookTitle,
              author: this.state.bookAuthor,
              image: this.state.bookImage,
              genre: this.state.bookGenre,
              bookshelf_id: this.state.user.foundBookshelf.bookshelf_id,
            })
            .then((response) => {
              window.location.href = "/mybookshelf";
            })
            .catch((error) => {
              console.log("Error adding book to bookshelf: ", error);
              this.setState({apiError: "Error adding book. Please try again",})
            });
          // end chaining the GET request
        })

        .catch((error) => {
          console.log("Error getting Books API data: ", error);
          this.setState({apiError: "Error finding book. Please check your spelling and try again",})
        });
    }
  };

  isFormValid = () => {
    if (!this.state.bookTitle || !this.state.bookAuthor) {
      // alert("You must provide a title and author for your book");
      this.setState({
        error:
          "You must provide both a full book title and the author's full name",
      });
      return;
    }
    return true;
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return this.setState({ failedAuth: true });
    }

    axios
      .get(`${process.env.REACT_APP_SERVER}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          user: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          failedAuth: true,
        });
      });
  }

  render() {
    if (this.state.failedAuth) {
      return <LoginError />;
    }

    if (!this.state.user) {
      return <Loading />;
    }

    return (
      <main className="add">
        <Hero imgHero={addImage} alt="Add a book" />
        <article className="add__container">
          <h2 className="add__title">Add a book to your public bookshelf</h2>
          <h3 className="add__subtitle">
            For best match, please ensure that all spelling is correct. Provide
            a complete book title and the author's full name.
          </h3>
          <form className="add__form" onSubmit={this.handleSubmit}>
            <label className="add__form-input-label">
              Book Title:
              <input
                className="add__form-field"
                type="text"
                name="bookTitle"
                value={this.state.bookTitle}
                onChange={this.handleChange}
                placeholder="Title"
              />
            </label>
            <label className="add__form-input-label">
              Book Author:
              <input
                className="add__form-field"
                type="text"
                name="bookAuthor"
                value={this.state.bookAuthor}
                onChange={this.handleChange}
                placeholder="Author"
              />
            </label>
            <div className="add__error">{this.state.error}</div>
            <div className="add__error">{this.state.apiError}</div>
            <button type="submit" className="add__add-button">
              <img src={logo} alt="" className="add__button-image" />
              <span className="add__button-text">Add a book</span>
            </button>
            <Link to="/mybookshelf" className="add__cancel">
              return to bookshelf
            </Link>
          </form>
        </article>
      </main>
    );
  }
}

export default Add;
