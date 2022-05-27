import { selectTab } from 'state/slices/tabSlice';
import { tabs } from 'components/common/Tabs';
import TargetMap from 'components/common/TargetMap';
import { useSelector } from 'react-redux';
import './styles.scss';
import ContactDialog from 'components/common/ContactDialog';
import NewMatch from 'components/common/NewMatch';

const Home = () => {
  const { homeTab } = useSelector(selectTab);

  const getDialogs = () => (
    <>
      <ContactDialog />
      <NewMatch />
    </>
  );

  return (
    <div className="home">
      <div className="menu">
        {getDialogs()}
        {tabs[homeTab]}
      </div>
      <TargetMap />
    </div>
  );
};

export default Home;
