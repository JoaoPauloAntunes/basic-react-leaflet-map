import 'leaflet/dist/leaflet.css';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { MapContainer, TileLayer, Marker, Popup, ImageOverlay } from 'react-leaflet';
import { LatLngBounds } from 'leaflet';
import { useState, useEffect } from 'react';


import styles from './index.module.scss';
import LeafletMarker from '../LeafletMarker';

export default function Map() {
  const [imageOverlayProps, setImageOverlayProps] = useState(null);

  const position = [-22.702959852402834, -47.6508851690044];

  useEffect(() => {
    console.log({"imageOverlayProps": imageOverlayProps});
    if (imageOverlayProps) {
      return;
    }

    fetch("https://qbyz6tll1a.execute-api.sa-east-1.amazonaws.com/default/teste-image-overlay")
    .then(async function(response) {
      console.log({"response": response});
      
      return response.json();
    })
    .then(function(data) {
      console.log({"data": data});

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
      {imageOverlayProps && (
        <ImageOverlay
          url={imageOverlayProps.url}
          bounds={imageOverlayProps.bounds}
          opacity={0.5}
          zIndex={10}
        />
      )}
      {/* <ImageOverlay
        url={"https://lh3.googleusercontent.com/proxy/zH2qNFf0kHKJGwXANMrYO-AOdVbRxq2J2Ylr_e5VcEAE6z9pq5c4E4tYytI_JvdYQ4z01XMFf2nFLxMqi8A-X1NJdy_51KzWv3VIxZqUwcB0XJJD0Plsmbe4CWNnnvpm5YeF7aIfVznrYHUaoQUarxjPWLF3u5Ly0ByBRw"}
        bounds={[[-22.115343, -48.260603], [-23.854831, -46.373387]]}
        opacity={0.5}
        zIndex={10}
      /> */}
      <LeafletMarker position={[-22.70229075344503, -47.64773499552624]} />
    </MapContainer>
  )
}