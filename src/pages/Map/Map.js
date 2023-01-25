import "./Map.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import MapPin from "../../Components/MapPin/MapPin";
import GoogleMapReact from "google-map-react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import { GoogleMap, MarkerClusterer, Marker } from "@react-google-maps/api";
import Loading from "../../Components/Loading/Loading";
import LoginError from "../../Components/LoginError/LoginError";

// So here's the issue: I can either get custom pins to work, OR clustering to work. Never both. And since custom pins are more important, I'm gonna leave it as-is and work on this some other time.

function Map() {
  // state hooks:
  const [user, setUser] = useState();
  const [failedAuth, setFailedAuth] = useState(false);
  const [localBookshelves, setLocalBookshelves] = useState([]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    axios
      .get(`${process.env.REACT_APP_SERVER}users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUser(response.data);

        axios
          .get(`${process.env.REACT_APP_SERVER}bookshelves`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setLocalBookshelves(response.data);
          })
          .catch((error) => {
            console.log("Axios Bookshelves GET request error: ", error);
          });
      })
      .catch((error) => {
        setFailedAuth(true);
      });
  }, []);

  if (failedAuth) {
    return <LoginError />;
  }

  if (!user) {
    return <Loading />;
  }

  const latLong = {
    lat: user.foundBookshelf.latitude,
    lng: user.foundBookshelf.longitude,
  };
  //map cluster stuff

  function handleApiLoaded(map, maps) {
    const markers = [];
    const locations = [];

    localBookshelves.forEach((bookshelf) => {
      locations.push({
        lat: bookshelf.latitude,
        lng: bookshelf.longitude,
      });
    });

    locations.forEach((location) => {
      markers.push(
        new maps.Marker({
          position: {
            lat: location.lat,
            lng: location.lng,
          },
          map,
        })
      );
    });

    new MarkerClusterer({ markers, map });
    console.log("markers: ", markers);
  }

  // end map cluster stuff

  return (
    <main className="maps">
      <article className="maps__container">
        <h2 className="maps__title">Neighbourhood Bookshelves</h2>
        <h3 className="maps__subtitle">
          All shared bookshelves that exist within apx. 1.5 km (1 mile) will
          appear on your neighbourhood map. Your bookshelf appears in blue.
          Select a neighbour's bookshelf to see its contents.
        </h3>
      </article>
      <div className="maps__map">
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${process.env.REACT_APP_MAPS_API_KEY}`,
          }}
          defaultCenter={latLong}
          defaultZoom={16}
          yesIWantToUseGoogleMapApiInternals
          // uncomment this to enable clustering:
          // onGoogleApiLoaded={({ map, maps }) => {
          //   handleApiLoaded(map, maps);
          // }}
          options={{ gestureHandling: "none" }}
        >
          <MapPin
            image="logo1"
            url="mybookshelf"
            lat={latLong.lat}
            lng={latLong.lng}
          />

          {localBookshelves.map((bookshelf) => (
            <MapPin
              key={bookshelf.bookshelf_id}
              image="logo2"
              url={`map/${bookshelf.bookshelf_id}`}
              lat={bookshelf.latitude}
              lng={bookshelf.longitude}
            />
          ))}
        </GoogleMapReact>
      </div>
    </main>
  );
}

export default Map;
