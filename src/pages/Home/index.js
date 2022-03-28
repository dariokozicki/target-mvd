import Intro from 'components/common/Intro';
import TargetMap from 'components/common/TargetMap';
import { useSelector } from 'react-redux';
import { selectTargets } from 'services/model/targets';
import './styles.scss';

const Home = () => {
  const { position } = useSelector(selectTargets);

  const onMapclicked = (_, _, clickEvent) => {
    console.log('clickevent', clickEvent.latLng.lat(), clickEvent.latLng.lng());
  };

  return (
    <div className="home">
      <div className="menu">
        <Intro />
      </div>
      {position && <TargetMap position={position} onMapClicked={onMapclicked} />}
    </div>
  );
};

export default Home;
