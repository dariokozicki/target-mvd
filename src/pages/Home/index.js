import TargetMap from 'components/common/TargetMap';
import { useState, useEffect } from 'react';
import { useGetTargetsMutation } from 'services/model/targets';
import useTargets from 'hooks/useTargets';
import './styles.scss';
import Intro from 'components/common/Intro';
import useTopics from 'hooks/useTopics';
import { useGetTopicsMutation } from 'services/model/topics';
import { setCreationTarget } from 'state/slices/targetSlice';

const Home = () => {
  const [position, setPosition] = useState(null);
  const { targets, creation } = useTargets();
  const [getTargets] = useGetTargetsMutation();
  const { topics } = useTopics();
  const [getTopics] = useGetTopicsMutation();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition);
    getTargets();
    getTopics();
  }, [getTargets, getTopics]);

  const onMapclicked = (_, _, clickEvent) => {
    console.log('clickevent', clickEvent.latLng.lat(), clickEvent.latLng.lng());
  };

  return (
    <div className="home">
      <div className="menu">
        <Intro />
      </div>
      {position && (
        <TargetMap
          position={position}
          targets={targets}
          topics={topics}
          onMapClicked={onMapclicked}
        />
      )}
    </div>
  );
};

export default Home;
