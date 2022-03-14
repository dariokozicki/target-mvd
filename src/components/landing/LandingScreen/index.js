import VideoContainer from '../VideoContainer';
import './styles.scss';

const LandingScreen = ({ children }) => {
  return (
    <div className="screen-container">
      <div className="main-container">{children}</div>
      <VideoContainer />
    </div>
  );
};

export default LandingScreen;
