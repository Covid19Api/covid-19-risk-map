import * as React from 'react'
import ReactDOMServer from 'react-dom/server';
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import { coordinatesReducer, MapCoordinateState } from './hooks/useCoordinatesReducer'
import * as riskLevelService from '../../services/risk-level-service';

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
    locateMeGeocoder.on('geolocate', setUserLocation);
    locateMeGeocoder.on('geolocate', queryRiskLevel)
    locateMeGeocoder.on('error', (e: Error) => console.error(e))
    map.addControl(locateMeGeocoder);

    // Add input control to map
    inputGeoCoder.on('result', setUserLocation)
    inputGeoCoder.on('result', (e: any) => queryRiskLevel({coords: {longitude: e.result.center[0], latitude: e.result.center[1]}}))
    map.addControl(inputGeoCoder)

  }, [props.lat, props.lng])

  async function setUserLocation(e: any) {
    (map.getSource('single-point') as any).setData(e.data);

  }

  async function queryRiskLevel(e: any) {

    const { latitude, longitude } =  e && e.coords ? e.coords : { latitude: 0, longitude: 0 }
    
    const riskLevel = await riskLevelService.riskLevelByGeoPos(latitude, longitude)

    
    if(riskLevel && riskLevel.city) {
      setPopup(latitude, longitude, JSON.stringify(riskLevel))
    }
  }
  function setPopup(lat: number, lng: number, data: any) {
    const labelHtml = riskLevelToLabel(data)
    new mapboxgl.Popup()
      .setLngLat({ lng, lat })
      .setHTML(ReactDOMServer.renderToString(labelHtml))
      .addTo(map)
  }

  return (
    <div>
      <div id='map-container' ref={mapRef} className='mapContainer' />
    </div>
  )
}

const riskLevelToLabel = (riskLevelJsonAsString: any) => {
  const riskLevel = JSON.parse(riskLevelJsonAsString)
  return (
    <dl className='riskLevel'>
      <dt>City:</dt><dd>{riskLevel.city}</dd>
      <dt>Risk level:</dt><dd>{riskLevel.detailedRiskByCity}</dd>
      <dt>Cases:</dt><dd>{riskLevel.currentCasesByCity}</dd>
    </dl>
  )
}

export const riskV4ToLabel = (riskLevelJsonAsString: any) => {
  const riskLevel = JSON.parse(riskLevelJsonAsString)
  return (
    <dl className='riskLevel'>
      <dt>County:</dt><dd>{riskLevel.county_name}</dd>
      <dt>Risk level:</dt><dd>{riskLevel.detailedRiskByCity}</dd>
      <dt>Cases:</dt><dd>{riskLevel.total_cases_by_county}</dd>
    </dl>
  )
}