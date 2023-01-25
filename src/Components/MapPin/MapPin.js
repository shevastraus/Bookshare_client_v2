import "./MapPin.scss";
import logo1 from "../../assets/images/logo1.png";
import logo2 from "../../assets/images/logo2.png";
import { Link } from "react-router-dom";

function MapPin(props) {
  const { image, url } = props;
  return (
    <Link to={`/${url}`}>
      {(image === "logo1") ? <img src={logo1} alt="my-pin" className="map-pin" /> : <img src={logo2} alt="pin" className="map-pin" />}
    </Link>
  );
}

export default MapPin;
