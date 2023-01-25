import "./LoginError.scss";
import { Link } from "react-router-dom";
import loginAnimation from "../../assets/images/login_animation.gif";

function LoginError() {
  function timer() {
    setTimeout(
      () => (window.location = `/login`),
      1500
    );
  }

  return (
    <main className="login-error">
      <img src={loginAnimation} alt="login" className="login-error__image" />
      <p className="login-error__message">
        You must be logged in to see this page.
        <br /> You will be redirected...
      </p>
      <Link to="/login" className="login-error__link">
        Log in
      </Link>
      {timer()}
    </main>
  );
}

export default LoginError;
