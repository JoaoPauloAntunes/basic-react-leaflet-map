import L from 'leaflet';
import { useMap } from 'react-leaflet';

export default function LeafletMarker() {
  const map = useMap();
  const location = [-22.70229075344503, -47.64773499552624];

  const marker = new L.marker(location);
  marker.addTo(map);

  return null;
}