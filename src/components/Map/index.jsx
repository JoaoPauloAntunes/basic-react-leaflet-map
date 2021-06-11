import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { useState, useEffect } from 'react';


import styles from './index.module.scss';
import LeafletMarker from '../LeafletMarker';

export default function Map() {
  const position = [-22.702959852402834, -47.6508851690044];
  const bounds = new LatLngBounds([-22.67422532958089, -47.694191054655036], [-22.789762031685466, -47.583489833625414]);
  const url = "http://www.lib.utexas.edu/maps/historical/newark_nj_1922.jpg";

  const [imageOverlayProps, setImageOverlayProps] = useState(null);

  useEffect(() => {
    console.log({"imageOverlayProps": imageOverlayProps});
    if (imageOverlayProps) {
      return;
    }

    fetch("https://qbyz6tll1a.execute-api.sa-east-1.amazonaws.com/default/teste-image-overlay")
    .then(async (response) => {
      console.log({"response": response});
      const data = await response.json();
      console.log({"data": data});

      // const {
      //   area,
      //   bounds,
      //   url,
      // } = data;

      setImageOverlayProps(data);
    });
  }, [imageOverlayProps]);
  
  return (
    <MapContainer
      className={styles.Map}
      center={position}
      zoom={17}
    >
      <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {imageOverlayProps & (
        <ImageOverlay
          url={imageOverlayProps?.url}
          bounds={imageOverlayProps?.bounds}
          opacity={0.5}
          zIndex={10}
        />
      )}
      <LeafletMarker position={[-22.70229075344503, -47.64773499552624]} />
    </MapContainer>
  )
}