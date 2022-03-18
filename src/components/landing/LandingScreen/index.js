import VideoContainer from '../VideoContainer';
import { node } from 'prop-types';
import './styles.scss';

const LandingScreen = ({ children }) => {
  return (
    <div className="screen-container">
      <div className="main-container">{children}</div>
      <VideoContainer />
    </div>
  );
};

LandingScreen.propTypes = {
  children: node.isRequired,
};

export default LandingScreen;
