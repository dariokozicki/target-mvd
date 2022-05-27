import classNames from 'classnames';
import ContactDialog from 'components/common/ContactDialog';
import MapInputSwitch from 'components/common/MapInputSwitch';
import NewMatch from 'components/common/NewMatch';
import { tabs } from 'components/common/Tabs';
import TargetMap from 'components/common/TargetMap';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectTab } from 'state/slices/tabSlice';
import './styles.scss';

const Home = () => {
  const { homeTab, showMapMobile } = useSelector(selectTab);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
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
      <div className={classNames('home__map', isTabletOrMobile && showMapMobile ? 'block' : '')}>
        <TargetMap />
        {showMapMobile && <MapInputSwitch />}
      </div>
    </div>
  );
};

export default Home;
