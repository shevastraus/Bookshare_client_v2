import "./SignUpConfirmModal.scss";
import React from "react";
import GoogleMapReact from "google-map-react";
import MapPin from "../../Components/MapPin/MapPin";

function SignUpConfirmModal({
  name,
  email,
  address,
  latitude,
  longitude,
  handleSubmit,
  closeModal,
}) {
  const latLong = {
    lat: latitude,
    lng: longitude,
  };
  return (
    <div className="modal">
      <h6 className="modal__title">Confirm your information</h6>
      <section className="modal__account-info">
        <p>
          Name: <span className="modal__account-info-input">{name}</span>
        </p>
        <p>
          Email: <span className="modal__account-info-input">{email}</span>
        </p>
        <p>
          Address: <span className="modal__account-info-input">{address}</span>
        </p>
      </section>

      <div className="modal__map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${process.env.REACT_APP_MAPS_API_KEY}`,
          }}
          defaultCenter={latLong}
          defaultZoom={15.5}
        >
          <MapPin
            image="logo1"
            url="mybookshelf"
            lat={latLong.lat}
            lng={latLong.lng}
          />
        </GoogleMapReact>
      </div>
      <div className="modal__buttons">
        <button className="modal__cta" onClick={handleSubmit}>
          ✅ Looks good, create my account!
        </button>
        <button className="modal__cta" onClick={closeModal}>
          ❌ Cancel, I need to correct my information
        </button>
      </div>
    </div>
  );
}

export default SignUpConfirmModal;
