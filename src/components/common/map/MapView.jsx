import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import PropTypes from "prop-types";
import "leaflet/dist/leaflet.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick"; // 📦 Slider
import styles from "./Map.module.css";
import BookPopup from "./bookpopup/BookPopup";
import { useEffect, useMemo } from "react";

// Component to fit bounds
function FitBounds({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (bounds?.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [50, 50] });
      } catch (error) {
        console.error("Error fitting bounds:", error);
      }
    }
  }, [bounds, map]);

  return null;
}

FitBounds.propTypes = {
  bounds: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
};

function MapView({ requests }) {
  const defaultPosition = useMemo(
    () => ({ lat: 30.033333, lng: 31.233334 }),
    []
  ); // Cairo

  //   try {
  //     return {
  //       lat: parseFloat(req.latitude),
  //       lng: parseFloat(req.longitude),
  //     };
  //   } catch (error) {
  //     console.error("Error parsing coordinates:", error);
  //     return null;
  //   }
  // }, []);

  const { finalPosition, bounds, groupedRequests } = useMemo(() => {
    if (!Array.isArray(requests) || requests.length === 0) {
      return {
        finalPosition: defaultPosition,
        bounds: [],
        groupedRequests: new Map(),
      };
    }

    const validRequests = requests.filter(
      (req) => req.latitude && req.longitude
    );

    if (validRequests.length === 0) {
      return {
        finalPosition: defaultPosition,
        bounds: [],
        groupedRequests: new Map(),
      };
    }

    const avgLat =
      validRequests.reduce((sum, req) => sum + parseFloat(req.latitude), 0) /
      validRequests.length;
    const avgLng =
      validRequests.reduce((sum, req) => sum + parseFloat(req.longitude), 0) /
      validRequests.length;

    const bounds = validRequests.map((req) => [
      parseFloat(req.latitude),
      parseFloat(req.longitude),
    ]);

    const grouped = new Map();
    validRequests.forEach((req) => {
      const key = `${parseFloat(req.latitude).toFixed(5)},${parseFloat(
        req.longitude
      ).toFixed(5)}`;
      if (!grouped.has(key)) {
        grouped.set(key, []);
      }
      grouped.get(key).push(req);
    });

    return {
      finalPosition: { lat: avgLat, lng: avgLng },
      bounds,
      groupedRequests: grouped,
    };
  }, [requests, defaultPosition]);

  const sliderSettings = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className={styles.map}>
      <div className={styles.requestCount}>
        Total Requests: {requests?.length || 0}
      </div>
      <MapContainer
        center={finalPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.mapContainer}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds bounds={bounds} />

        {Array.from(groupedRequests.entries()).map(([key, group], index) => {
          const [lat, lng] = key.split(",").map(Number);
          return (
            <Marker key={index} position={{ lat, lng }}>
              <Popup>
                <Slider {...sliderSettings}>
                  {group.map((request) => (
                    <div key={request.id}>
                      <BookPopup
                        title={request.bookTitle}
                        author={request.authorName}
                        senderProfilePhoto={request.senderProfilePhoto}
                        senderUserId={request.senderId}
                        senderUserName={request.senderUserName}
                        requestDate={request.requestDate}
                        onAccept={() => {
                          console.log("Accepted book exchange!", request);
                        }}
                      />
                    </div>
                  ))}
                </Slider>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

MapView.propTypes = {
  requests: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      bookTitle: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
      latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

MapView.defaultProps = {
  requests: [],
};

export default MapView;
