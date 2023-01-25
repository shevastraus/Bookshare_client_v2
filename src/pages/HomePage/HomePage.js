import "./HomePage.scss";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import singleBookshelf from "../../assets/images/single-bookshelf.png";
import mapBook from "../../assets/images/map-book.png";
import LoginError from "../../Components/LoginError/LoginError";
import Hero from "../../Components/Hero/Hero";
import homeHero from "../../assets/images/home_hero.png";

class HomePage extends Component {
  state = {
    user: null,
    failedAuth: false,
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
      <main className="home">
        <Hero imgHero={homeHero} altText="homepage" />
        <article className="home__container">
          <h1 className="home__title">Welcome, {this.state.user.user_name}!</h1>
          <article className="home__profile">
            {!this.state.user.foundBookshelf.books[0] ? (
              <p>You aren't sharing any books yet</p>
            ) : (
              <p>
                You are sharing {this.state.user.foundBookshelf.books.length}{" "}
                {this.state.user.foundBookshelf.books.length === 1 ? (
                  <span>book</span>
                ) : (
                  <span>books</span>
                )}
              </p>
            )}
          </article>
          <div className="home__link-container">
            <Link to="/mybookshelf" className="home__link">
              <img
                src={singleBookshelf}
                alt="go to your bookshelf"
                className="home__link-image"
              />
              <p className="home__link-text">YOUR BOOKSHELF</p>
            </Link>
            <Link to="/map" className="home__link">
              <img
                src={mapBook}
                alt="go to your bookshelf"
                className="home__link-image"
              />
              <p className="home__link-text">
                BROWSE NEIGHBOURHOOD BOOKSHELVES
              </p>
            </Link>
          </div>
        </article>
      </main>
    );
  }
}

export default HomePage;
