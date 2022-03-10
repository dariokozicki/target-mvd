import React from 'react';
import './styles.css';

const VideoContainer = () => (
  <div id="video" className="video-container">
    <div className="play-container">
      <img src="/play.png" alt="play" className="play clickable" />
      <img src="/i6.png" alt="phone" className="phone" />
    </div>
    <img src="/appstore_button.png" alt="appstore" />
    <img src="/Social.png" alt="appstore" />
  </div>
);

export default VideoContainer;
