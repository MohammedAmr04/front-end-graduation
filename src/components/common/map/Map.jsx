import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css"; // Ensure you imported the Leaflet CSS
import styles from "./Map.module.css"; // Import your CSS Module

const position = [51.505, -0.09];

function Map() {
  return (
    <div className={styles.map}>
      {" "}
      {/* Use className instead of style */}
      <MapContainer
        center={position}
        zoom={5}
        scrollWheelZoom={true}
        className={styles.mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
