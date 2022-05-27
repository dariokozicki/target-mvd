import { useDispatch, useSelector } from 'react-redux';
import { selectTab, setShowMapMobile } from 'state/slices/tabSlice';
import pointerSwitch from 'assets/pointer-switch.png';
import pointerSwitchBlack from 'assets/pointer-switch-black.png';
import defaultProfile from 'assets/default-profile.png';
import classNames from 'classnames';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';

const MapInputSwitch = ({ black = false }) => {
  const { showMapMobile } = useSelector(selectTab);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 992px)' });
  const dispatch = useDispatch();

  if (!isTabletOrMobile) return null;

  const onClick = () => {
    dispatch(setShowMapMobile(!showMapMobile));
  };

  const chooseImage = isBlack => {
    if (showMapMobile) return defaultProfile;
    if (isBlack) return pointerSwitchBlack;
    return pointerSwitch;
  };

  return (
    <div className={classNames('map-switch', !showMapMobile && 'right-1')}>
      <div
        className="map-switch__container clickable noSelect"
        onKeyDown={onClick}
        role="button"
        tabIndex={0}
        onClick={onClick}
      >
        <img src={chooseImage(black)} alt="Map switch" className="map-switch__img" />
      </div>
    </div>
  );
};

export default MapInputSwitch;
