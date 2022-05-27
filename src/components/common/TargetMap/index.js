import { Circle, GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import useTranslation from 'hooks/useTranslation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTargets, useGetTargetsQuery } from 'services/model/targets';
import { useGetTopicsQuery } from 'services/model/topics';
import { setHomeTab, setShowMapMobile } from 'state/slices/tabSlice';
import { fillCreationTarget, resetCreationTarget, setSelected } from 'state/slices/targetSlice';
import { tabsEnum } from '../Tabs';
import currentPositionImg from 'assets/current-position-marker.png';
import emptyTargetImg from 'assets/empty-target.png';
import './styles.scss';

const mapStyles = {
  width: '100%',
  height: '100%',
};

const radiusColor = '#FF0000';

const TargetMap = ({ google }) => {
  const t = useTranslation();
  const { creation } = useSelector(selectTargets);
  const { data: targets } = useGetTargetsQuery();
  const { data: topics } = useGetTopicsQuery();
  const dispatch = useDispatch();

  const onMapClicked = (_, __, { latLng }) => {
    if (creation?.target) {
      dispatch(setHomeTab(tabsEnum.profile));
      dispatch(resetCreationTarget());
    } else {
      dispatch(fillCreationTarget({ lat: latLng.lat(), lng: latLng.lng(), radius: 200 }));
      dispatch(setHomeTab(tabsEnum.create));
      dispatch(setShowMapMobile(false));
    }
  };

  const getTopicById = id => topics.topics.map(topic => topic.topic).find(topic => topic.id === id);

  const getTopicUrl = topic => topic?.icon || emptyTargetImg;

  const onTargetClicked = target => {
    dispatch(setSelected(target));
    dispatch(setHomeTab(tabsEnum.editTarget));
    dispatch(setShowMapMobile(false));
    dispatch(resetCreationTarget());
  };

  return (
    <Map
      zoom={14}
      google={google}
      containerStyle={mapStyles}
      style={mapStyles}
      centerAroundCurrentLocation
      onClick={onMapClicked}
    >
      <Marker
        onClick={() => {}}
        name={t('target.position')}
        icon={{
          url: currentPositionImg,
          anchor: new google.maps.Point(16, 16),
          scaledSize: new google.maps.Size(32, 42),
        }}
      />
      {creation.target && (
        <Marker
          position={{ lat: creation.target.lat, lng: creation.target.lng }}
          name={t('target.creation')}
          icon={{
            url: getTopicUrl(creation.target.topic),
            anchor: new google.maps.Point(16, 16),
            scaledSize: new google.maps.Size(32, 32),
          }}
        />
      )}
      {creation.target?.radius && (
        <Circle
          center={{ lat: creation.target.lat, lng: creation.target.lng }}
          onClick={onMapClicked}
          radius={creation.target.radius}
          strokeColor="transparent"
          strokeOpacity={0}
          strokeWeight={5}
          fillColor={radiusColor}
          fillOpacity={0.2}
        />
      )}
      {targets &&
        topics &&
        targets.targets.map(({ target }) => {
          const { id, lat, lng, topic_id } = target;
          const topic = getTopicById(topic_id);
          return (
            <Marker
              title={topic?.title}
              key={id}
              position={{ lat, lng }}
              icon={{
                url: getTopicUrl(topic),
                anchor: new google.maps.Point(16, 16),
                scaledSize: new google.maps.Size(32, 32),
              }}
              onClick={() => onTargetClicked(target)}
            />
          );
        })}
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(TargetMap);
