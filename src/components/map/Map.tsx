import * as React from 'react'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { coordinatesReducer, MapCoordinateState } from './hooks/useCoordinatesReducer'

export const Map = (props: MapCoordinateState) => {
  const [state]: [MapCoordinateState, React.Dispatch<any>] = React.useReducer(coordinatesReducer, props)

  let mapRef = React.useRef(null)
  let map: mapboxgl.Map
  React.useEffect(() => {
    // eslint-disable-next-line
    map = new mapboxgl.Map({
      container: mapRef.current!,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [state.lng, state.lat],
      zoom: state.zoom
    })

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
    const locateMeGeocoder = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    })

    const inputGeoCoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl
      })

    // Add geolocate control to the map.
    map.addControl(locateMeGeocoder);
    locateMeGeocoder.on('geolocate', setUserLocation);
    locateMeGeocoder.on('trackuserlocationstart', setUserLocation);
    locateMeGeocoder.on('error', (e: Error) => console.error(e))

    // Add input control to map
    map.addControl(inputGeoCoder) 

  }, [props.lat, props.lng])

  function setUserLocation(e: any) {
    (map.getSource('single-point') as any).setData(e.data);
  }

  return (
    <div>
      <div id='map-container' ref={mapRef} className='mapContainer' />
    </div>
  )
}
