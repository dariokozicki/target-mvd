import React, { useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, Circle } from 'google-maps-react';
import { selectTargets, useGetTargetsMutation } from 'services/model/targets';
import { selectTopics, useGetTopicsMutation } from 'services/model/topics';
import { useDispatch, useSelector } from 'react-redux';
import { fillCreationTarget } from 'state/slices/targetSlice';
import useTranslation from 'hooks/useTranslation';
import './styles.scss';
import { setHomeTab } from 'state/slices/tabSlice';
import { tabsEnum } from '../Tabs';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const radiusColor = '#FF0000';

const TargetMap = ({ google }) => {
  const t = useTranslation();
  const { targets, creation } = useSelector(selectTargets);
  const [getTargets] = useGetTargetsMutation();
  const { topics } = useSelector(selectTopics);
  const [getTopics] = useGetTopicsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    getTargets();
    getTopics();
  }, [getTargets, getTopics]);

  const onMapClicked = (_, __, { latLng }) => {
    dispatch(fillCreationTarget({ lat: latLng.lat(), lng: latLng.lng(), radius: 200 }));
    dispatch(setHomeTab(tabsEnum.create));
  };

  const getTopicUrl = topicId =>
    topics.map(topic => topic.topic).find(topic => topic.id === topicId)?.icon ||
    '/empty-target.png';

  return (
    <Map
      zoom={14}
      google={google}
      style={mapStyles}
      centerAroundCurrentLocation
      onClick={onMapClicked}
    >
      <Marker
        onClick={() => {}}
        name={t('target.position')}
        icon={{
          url: '/current-position-marker.png',
          anchor: new google.maps.Point(16, 16),
          scaledSize: new google.maps.Size(32, 42),
        }}
      />
      {creation && (
        <Marker
          position={{ lat: creation.lat, lng: creation.lng }}
          name={t('target.creation')}
          icon={{
            url: getTopicUrl(creation.topic),
            anchor: new google.maps.Point(16, 16),
            scaledSize: new google.maps.Size(32, 32),
          }}
        />
      )}
      {creation?.radius && (
        <Circle
          center={{ lat: creation.lat, lng: creation.lng }}
          onClick={onMapClicked}
          radius={creation.radius}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor={radiusColor}
          fillOpacity={0.2}
        />
      )}
      {targets.map(({ lat, lng, target: { topic_id } }) => (
        <Marker
          position={{ lat, lng }}
          icon={{
            url: getTopicUrl(topic_id),
          }}
        />
      ))}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(TargetMap);
