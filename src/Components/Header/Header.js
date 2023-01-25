import "./Header.scss";
import logoFull from "../../assets/images/logo-with-name.png";
import { NavLink, Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__logo-container">
        <img src={logoFull} alt="BookShare" className="header__logo" />
      </Link>

      <nav className="header__nav">
        <NavLink
          to="/mybookshelf"
          className="header__nav-button"
          activeClassName="header__nav-button--active"
        >
          <span className="header__slider--top"></span>
          <span className="header__nav-text">My Bookshelf</span>
          <span className="header__slider--bottom"></span>
        </NavLink>
        <NavLink
          to="/map"
          className="header__nav-button"
          activeClassName="header__nav-button--active"
        >
          <span className="header__slider--top"></span>
          <span className="header__nav-text">My Neighbourhood</span>
          <span className="header__slider--bottom"></span>
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
