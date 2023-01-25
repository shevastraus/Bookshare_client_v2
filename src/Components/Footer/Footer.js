import "./Footer.scss";
import { Link } from "react-router-dom";




function Footer() {
  
    function handleLogout() {
        sessionStorage.removeItem("token");
      };

  return (
    <footer className="footer__container">
      <div className="footer">
      <Link to="/mybookshelf" className="footer__link">Bookshelf </Link>&nbsp;|&nbsp;
      <Link to="/map" className="footer__link"> Neighbourhood </Link> &nbsp;|&nbsp;
      <Link to="/login" onClick={handleLogout} className="footer__link"> Log out </Link> &nbsp;|&nbsp;
      <Link to="/support" className="footer__link"> Contact </Link>
      </div>

    </footer>
  );
}

export default Footer;
