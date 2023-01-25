import "./LogIn.scss";
import { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import Input from "../../Components/Input/Input";
import logoFull from "../../assets/images/logo-with-name.png";
import logo from "../../assets/images/logo1.png";

class LogIn extends Component {
  state = {
    error: "",
    success: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post(`${process.env.REACT_APP_SERVER}login`, {
        email: event.target.email.value,
        password: event.target.password.value,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        this.setState({ success: true });
      })
      .catch((error) => {
        this.setState({ error: error.response.data });
        // this.setState({ success: false, error: "Looks like we're having some trouble on our end. Please try again later" });
      });
  };

  render() {
    // If the error is due to the server being down, HTML gibberish gets return ed. This checks the error, and if it's HTML gibberish, it converts it to a human-readable error message
    this.state.error[0] === "<" &&
      this.setState({
        error: "Looks like our server is down. Please try again later.",
      });

    return (
      <main className="signup">
        <img src={logoFull} alt="BookShare" className="signup__logo" />
        <article className="signup__form-container">
          <h1 className="signup__form-title">Log in</h1>
          <form className="signup__form" onSubmit={this.handleSubmit}>
            <Input type="text" name="email" label="Email" />
            <Input type="password" name="password" label="Password" />

            <button type="submit" className="signup__button">
              <img src={logo} alt="" className="signup__button-image" />
              <span className="signup__button-text">Log in</span>
            </button>

            {this.state.error && (
              <div className="signup__message">{this.state.error}</div>
            )}
            {this.state.success && <Redirect to="/" />}

            <p>
              Haven't signed up yet?&nbsp;
              <Link to="/signup" className="signup__signin-link">
                Create an account
              </Link>
            </p>
          </form>
        </article>
      </main>
    );
  }
}

export default LogIn;
