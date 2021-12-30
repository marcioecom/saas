import React, { useRef } from 'react';
// import { useParams } from 'react-router';
import Plyr, { APITypes } from 'plyr-react';

// interface IEmbededParams {
//   videoId: string;
// }

const Embeded = () => {
  const ref = useRef<APITypes>(null)
  // const { videoId } = useParams<IEmbededParams>()
  // const baseUrl = process.env.REACT_APP_APP_URL
  // const videoSource = `${baseUrl}/stream/${videoId}`
  const videoSource = "https://vclick-raw-videos.s3.us-east-2.amazonaws.com/17c8a8acc751a1792d100a9df905dc51-video.mp4"

  return (
    <>
      <div className="video-wrapper">
        <Plyr
          ref={ref}
          source={{
            type: "video",
            sources: [{ src: videoSource }]
          }}
          options={{
            controls: [
              'play-large',
              'rewind',
              'play',
              'fullscreen',
            ]}}
        />
      </div>
    </>
  );
}

export default Embeded;
