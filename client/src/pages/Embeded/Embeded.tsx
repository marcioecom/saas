import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css'

interface IEmbededParams {
  videoId: string;
}

const Embeded = () => {
  const { videoId } = useParams<IEmbededParams>()
  const baseUrl = process.env.REACT_APP_APP_URL
  // const videoSource = `${baseUrl}/stream/${videoId}`
  const videoSource = "https://vclick-raw-videos.s3.us-east-2.amazonaws.com/17c8a8acc751a1792d100a9df905dc51-video.mp4"

  useEffect(() => {
    new Plyr('#player', { 
      controls: [
        'play-large',
        'rewind',
        'play',
        'volume',
        'fullscreen'
      ] 
    });
  }, [])

  return (
    <>
      <div className="video-wrapper">
        <video
          src={videoSource}
          height="100%"
          width="100%"
          controls
          id="player"
        />
      </div>
    </>
  );
}

export default Embeded;
