import "./SignUp.scss";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import Input from "../../Components/Input/Input";
import SignUpConfirmModal from "../../Components/SignUpConfirmModal/SignUpConfirmModal";
import { customStyles } from "../../utils/modal-settings.js";
import logoFull from "../../assets/images/logo-with-name.png";
import logo from "../../assets/images/logo1.png";

function SignUp() {
  // state hooks:
  const [error, setError] = useState();
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();

  // modal settings:
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  Modal.setAppElement("#root");

  // Validation before modal is opened:
  const checkForm = (event) => {
    event.preventDefault();
    console.log("checkForm() triggered!");

    // Data to validate:

    let isPassword = false;
    let isPassword2 = false;
    let passwordMatch;
    let passwordLength = event.target.password.value.length;
    let isAddress = false;
    let isLatitude = false;

    if (event.target.password.value) {
      isPassword = true;
    }
    if (event.target.password2.value) {
      isPassword2 = true;
    }

    if (event.target.password.value === event.target.password2.value) {
      passwordMatch = true;
    } else {
      passwordMatch = false;
    }
    if (event.target.address.value) {
      isAddress = true;
    }

    // Validate address with Google Maps, responds with latitude and longitude, which is set into state and passed into the post request for validation

    console.log("Sending request to Google API...");

    axios
      .get(
        `${process.env.REACT_APP_SERVER}geolocation/${event.target.address.value}`
      )
      .then((response) => {
        console.log("Google Maps request successful!");
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
        if (response.data.latitude) {
          isLatitude = true;
        }

        // chaining the post request:
        axios
          .post(`${process.env.REACT_APP_SERVER}checksignup`, {
            email: event.target.email.value,
            passwordMatch,
            isPassword,
            isPassword2,
            passwordLength,
            user_name: event.target.user_name.value,
            isAddress,
            isLatitude,
          })
          .then(() => {
            setError("");
            setName(event.target.user_name.value);
            setEmail(event.target.email.value);
            setPassword(event.target.password.value);
            setAddress(event.target.address.value);
          })
          .then(() => {
            openModal();
          })
          .catch((error) => {
            error.response.data[0] === "<"
              ? setError(
                  "Looks like our server is temporarily down. Please try again later"
                )
              : setError(error.response.data);
          });
      })
      .catch((error) => {
        console.log(
          "checkForm catch runs.",
          error.response.data[0],
          typeof error.response.data
        );
        error.response.data[0] === "<"
          ? setError(
              "Looks like our server is temporarily down. Please try again later"
            )
          : setError(error.response.data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // POST request to create a new account:
    axios
      .post(`${process.env.REACT_APP_SERVER}signup`, {
        email,
        password,
        user_name: name,
        latitude,
        longitude,
      })
      .then(() => {
        // setSuccess(true);
        setError("");

        // automatically log in and redirect to home page
        login();
      })
      .catch((error) => {
        closeModal();
        error.response.data[0] === "<"
          ? setError(
              "Looks like our server is temporarily down. Please try again later"
            )
          : setError(error.response.data);
      });
  };

  function login() {
    axios
      .post(`${process.env.REACT_APP_SERVER}login`, {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        setSuccess(true);
      })
      .catch((error) => {
        closeModal();
        error.response.data[0] === "<"
          ? setError(
              "Looks like our server is temporarily down. Please try again later"
            )
          : setError(error.response.data);
      });
  }

  return (
    <main className="signup">
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Confirm account information"
      >
        <SignUpConfirmModal
          name={name}
          email={email}
          address={address}
          latitude={latitude}
          longitude={longitude}
          handleSubmit={handleSubmit}
          closeModal={closeModal}
        />
      </Modal>
      <img src={logoFull} alt="BookShare" className="signup__logo" />
      <article className="signup__form-container">
        <h1 className="signup__form-title">Create an account</h1>
        <form className="signup__form" onSubmit={checkForm}>
          <Input type="text" name="user_name" label="Name" />
          <Input type="email" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <Input type="password" name="password2" label="Re-enter password" />
          <Input type="textarea" name="address" label="Full address" />
          <p className="signup__aside">
            You must input your full address, including city, province/state,
            and postal code/zip code.
          </p>
          <button type="submit" className="signup__button">
            <img src={logo} alt="" className="signup__button-image" />
            <span className="signup__button-text">Create account</span>
          </button>

          {success && (
            <div className="signup__message">
              Signed up! You will be redirected to your account.
            </div>
          )}
          {success && <Redirect to="/" />}

          {error && <div className="signup__message">{error}</div>}
          <p className="signup__aside">
            Already signed up?{" "}
            <Link to="/login" className="signup__signin-link">
              Log in
            </Link>
          </p>
        </form>
      </article>
    </main>
  );
}

export default SignUp;
