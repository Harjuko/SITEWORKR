import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';

const mapElement = document.getElementById('map');

const addressInput = document.getElementById('search2');
const addressInput2 = document.getElementById('user_address');
const addressInput3 = document.getElementById('job_location');

if (addressInput3) {
  const places = require('places.js');
  const placesAutocomplete = places({
    container: addressInput3
  });
}

if (addressInput2) {
  const places = require('places.js');
  const placesAutocomplete = places({
    container: addressInput2
  });
}

if (addressInput) {
  const places = require('places.js');
  const placesAutocomplete = places({
    container: addressInput
  });
}

if (mapElement) { // only build a map if there's a div#map to inject into
  mapboxgl.accessToken = process.env.MAPBOX_API_KEY; // API key from `.env`
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v10'
  });
//   if (mapElement) {
// // [ ... ]
  const markers = JSON.parse(mapElement.dataset.markers);

  markers.forEach((marker) => {
    console.log(marker)
    new mapboxgl.Marker()
      .setLngLat([marker.lng, marker.lat])
      .setPopup(new mapboxgl.Popup({ offset: 0 }) // add popups
      .setHTML(marker.infoWindow.content))
      .addTo(map);
  })
  if (mapElement) {
  // [ ... ]

    if (markers.length === 0) {
      map.setZoom(1);
    } else if (markers.length === 1) {
      map.setZoom(14);
      map.setCenter([markers[0].lng, markers[0].lat]);
    } else {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((marker) => {
        bounds.extend([marker.lng, marker.lat]);
      });
      map.fitBounds(bounds, { duration: 1000, padding: 75 })
    }
  }
}


