import { ActionCableProvider } from '@thrash-industries/react-actioncable-provider';
import classNames from 'classnames';
import ContactDialog from 'components/common/ContactDialog';
import MapInputSwitch from 'components/common/MapInputSwitch';
import NewMatch from 'components/common/NewMatch';
import { tabs } from 'components/common/Tabs';
import TargetMap from 'components/common/TargetMap';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { selectAuth } from 'services/auth/auth';
import { selectTab } from 'state/slices/tabSlice';
import './styles.scss';

const Home = () => {
  const { homeTab, showMapMobile } = useSelector(selectTab);
  const { authenticated, user } = useSelector(selectAuth);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });

  const actionCableUrl = useMemo(() => {
    if (authenticated) {
      let url = process.env.REACT_APP_ACTIONCABLE_URL;
      url = `${url}?access-token=${user.token}&client=${user.client}&uid=${user.uid}`;
      return url;
    }
    return undefined;
  }, [user, authenticated]);

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
        <ActionCableProvider url={actionCableUrl}>{tabs[homeTab]}</ActionCableProvider>
      </div>
      <div className={classNames('home__map', isTabletOrMobile && showMapMobile ? 'block' : '')}>
        <TargetMap />
        {showMapMobile && <MapInputSwitch />}
      </div>
    </div>
  );
};

export default Home;
