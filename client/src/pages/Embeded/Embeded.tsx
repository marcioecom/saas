import React from 'react';
import { useParams } from 'react-router';

import "./embeded.css"
interface IEmbededParams {
  videoId: string;
}

const Embeded = () => {
  // const [videoUrl, setVideoUrl] = useState('#')
  const baseUrl = process.env.REACT_APP_APP_URL
  const { videoId } = useParams<IEmbededParams>()

  const videoSource = `${baseUrl}/stream/${videoId}`
  return (
    <>
      <div className="video-wrapper">
        <video
          src={videoSource}
          height="100%"
          width="100%"
          controls
        />
        <div className="video-controls">
          
        </div>
      </div>
    </>
  );
}

export default Embeded;
