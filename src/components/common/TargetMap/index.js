import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import './styles.scss';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const TargetMap = ({ position, targets, google, topics, onMapClicked }) => {
  return (
    <Map
      zoom={14}
      google={google}
      style={mapStyles}
      initialCenter={{
        lat: position?.coords?.latitude,
        lng: position?.coords?.longitude,
      }}
      onClick={onMapClicked}
    >
      <Marker
        onClick={() => {}}
        name={'Your Position'}
        icon={{
          url: '/current-position-marker.png',
        }}
      />
      {targets.map(({ lat, lng, target: { topic_id } }) => (
        <Marker
          position={{ lat, lng }}
          icon={{
            url: topics.map(topic => topic.topic).find(topic => topic.id === topic_id).icon,
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(TargetMap);
