import { tabs } from 'components/common/Tabs';
import TargetMap from 'components/common/TargetMap';
import { useSelector } from 'react-redux';
import { selectTab } from 'state/slices/tabSlice';
import './styles.scss';

const Home = () => {
  const { homeTab } = useSelector(selectTab);

  return (
    <div className="home">
      <div className="menu">{tabs[homeTab]}</div>
      <TargetMap />
    </div>
  );
};

export default Home;
