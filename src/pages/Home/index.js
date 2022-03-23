import TargetMap from 'components/common/TargetMap';
import { useState, useEffect } from 'react';
import { useGetTargetsMutation } from 'services/model/targets';
import useTargets from 'hooks/useTargets';
import './styles.scss';
import Intro from 'components/common/Intro';
import useTopics from 'hooks/useTopics';
import { useGetTopicsMutation } from 'services/model/topics';

const Home = () => {
  const [position, setPosition] = useState(null);
  const { targets } = useTargets();
  const [getTargets] = useGetTargetsMutation();
  const { topics } = useTopics();
  const [getTopics] = useGetTopicsMutation();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(setPosition);
    getTargets();
    getTopics();
  }, [getTargets, getTopics]);

  return (
    <div className="home">
      <div className="menu">
        <Intro />
      </div>
      {position && <TargetMap position={position} targets={targets} topics={topics} />}
    </div>
  );
};

export default Home;
