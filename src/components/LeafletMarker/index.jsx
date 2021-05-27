import L from 'leaflet';
import { useMap } from 'react-leaflet';

export default function LeafletMarker({ position }) {
  const map = useMap();

  const marker = new L.marker(position);
  marker.addTo(map);

  return null;
}