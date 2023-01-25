import "./Borrow.scss";
import SendEmail from "../../Components/SendEmail/SendEmail";
import { Component } from "react";
import axios from "axios";
import LoginError from "../../Components/LoginError/LoginError";
import Loading from "../../Components/Loading/Loading";
import RemoteBookCard from "../../Components/RemoteBookCard/RemoteBookCard";
import emailjs from "emailjs-com";
import altCover from "../../assets/images/alt_cover.png";

class Borrow extends Component {
  state = {
    user: null,
    failedAuth: false,

    remoteBookData: null,

    error: "",
    loadError: "",
  };

  sendEmail = (event) => {
    event.preventDefault();
    if (!event.target.message.value) {
      this.setState({ error: "Please include a personal message" });
      return;
    }

    emailjs
      .sendForm(
        "default_service",
        "Bookshare_Email",
        event.target,
        "user_cQyAVFd7mhK4iJr7llm9U"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Message sent successfully!");
          this.props.history.push("/map");
        },
        (error) => {
          console.log(error.text);
          alert("Error. Message not sent. Please try again later.");
        }
      );
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return this.setState({ failedAuth: true });
    }
    let { bookshelf_id, title } = this.props.match.params;

    axios
      .get(`${process.env.REACT_APP_SERVER}book/${bookshelf_id}&${title}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.setState({
          remoteBookData: response.data,
        });
      })
      .catch((error) => {
        this.setState({
          loadError: "Failed to load book. Please try again",
        });
        console.log(error);
      });
    //new request
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

    if (!this.state.remoteBookData) {
      return <Loading />;
    }

    if (!this.state.user) {
      return <Loading />;
    }

    const { author, available, email, genre, image, title, user_name } =
      this.state.remoteBookData;

    return (
      <main className="borrow">
        <article className="borrow__container">
          <h1 className="borrow__title">Borrow request</h1>
          <h2 className="borrow__subtitle">
            Complete the form below to send an email requesting to borrow this
            book. Your account name and email address will be shared with the
            book's owner.
          </h2>

          {this.state.loadError ? (
            <RemoteBookCard
              image={altCover}
              title="(not available)"
              author="(not available)"
              genre="(not available)"
              available={available}
              loadingError={this.state.loadError}
              clickable="remote-book-card__no-click"
            />
          ) : <div>
          <RemoteBookCard
            image={image}
            title={title}
            author={author}
            genre={genre}
            available={available}
            clickable="remote-book-card__no-click"
          />
          <SendEmail
            ownerEmail={email}
            ownerUserName={user_name}
            title={title}
            author={author}
            borrowerUserName={this.state.user.user_name}
            borrowerEmail={this.state.user.email}
            onSubmit={this.sendEmail}
            errorMessage={this.state.error}
          />
        </div>}

        </article>
      </main>
    );
  }
}

export default Borrow;
