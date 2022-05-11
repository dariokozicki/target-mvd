import React from 'react';
import i6 from 'assets/i6.png';
import appstoreButton from 'assets/appstore_button.png';
import play from 'assets/play.png';
import social from 'assets/Social.png';
import './styles.scss';

const VideoContainer = () => (
  <div className="video-container">
    <div className="play-container">
      <img src={play} alt="play" className="play clickable" />
      <img src={i6} alt="phone" className="phone" />
    </div>
    <img src={appstoreButton} alt="appstore" />
    <img src={social} alt="appstore" />
  </div>
);

export default VideoContainer;
