import * as React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { coordinatesReducer, MapCoordinateState } from './hooks/useCoordinatesReducer'

export const Map = (props: MapCoordinateState) => {
  const [state, dispatch]: [MapCoordinateState, React.Dispatch<any>] = React.useReducer(coordinatesReducer, props)

  let mapRef = React.useRef(null)
  let map: mapboxgl.Map
  React.useEffect(() => {
    map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [state.lng, state.lat],
      zoom: state.zoom
    })

    const marker = new mapboxgl.Marker() // initialize a new marker
      .setLngLat([state.lng, state.lat]) // Marker [lng, lat] coordinates
      .addTo(map); // Add the marker to the map

    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on('load', function () {
      map.addSource('single-point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      map.addLayer({
        id: 'point',
        source: 'single-point',
        type: 'circle',
        paint: {
          'circle-radius': 10,
          'circle-color': '#448ee4'
        }
      });
    })
    const geocoder = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    // Add geolocate control to the map.
    map.addControl(geocoder);
    geocoder.on('geolocate', setUserLocation);
    geocoder.on('trackuserlocationstart', setUserLocation);
    geocoder.on('error', (e: Error) => console.error(e))

    // Listen for the `result` event from the Geocoder
    // `result` event is triggered when a user makes a selection
    //  Add a marker at the result's coordinates

  }, [props.lat, props.lng])

  function setUserLocation(e: any) {
    console.log(e);
    console.log(typeof e);
    (map.getSource('single-point') as any).setData(e.data);
  }

  return (
    <div>
      <div id='map-container' ref={mapRef} className='mapContainer' />
    </div>
  )
}
