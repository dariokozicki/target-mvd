import React, { useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { selectTargets, useGetTargetsMutation } from 'services/model/targets';
import { selectTopics, useGetTopicsMutation } from 'services/model/topics';
import { useSelector } from 'react-redux';
import './styles.scss';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const TargetMap = ({ position, google, onMapClicked }) => {
  const { targets } = useSelector(selectTargets);
  const [getTargets] = useGetTargetsMutation();
  const { topics } = useSelector(selectTopics);
  const [getTopics] = useGetTopicsMutation();

  useEffect(() => {
    getTargets();
    getTopics();
  }, [getTargets, getTopics]);

  return (
    <Map
      zoom={14}
      google={google}
      style={mapStyles}
      initialCenter={{
        lat: position.lat,
        lng: position.lng,
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
