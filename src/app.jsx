import { useEffect, useState } from 'react';
import $ from 'jquery';

import styles from './app.module.scss';
import Map from './components/Map';


function App() {
  const [markersData, setMarkersData] = useState(null);

  useEffect(() => {
    if (markersData) {
      console.log(markersData);
      return;
    }

    const response = $.get('https://cartovis-server.herokuapp.com/hospitales');
    response.done(data => {
      console.log(data);
      setMarkersData(data);
    });
    response.catch(data => {
      console.log(data);
      console.log(data.responseText);
    })
  }, [markersData]);

  return (
    <div className={styles.App}>
      <Map />
    </div>
  );
}

export default App;
