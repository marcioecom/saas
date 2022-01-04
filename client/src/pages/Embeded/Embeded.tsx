import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import Plyr, { APITypes } from 'plyr-react';
import api from '../../services/api';

interface IEmbededParams {
  videoId: string;
}

const Embeded = () => {
  const ref = useRef<APITypes>(null)
  const [videoUrl, setVideoUrl] = useState('')
  const { videoId } = useParams<IEmbededParams>()

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/stream/${videoId}`)
      setVideoUrl(data.url)
    })()
  }, [videoId])

  return (
    <>
      <div className="video-wrapper">
        <Plyr
          ref={ref}
          source={{
            type: "video",
            sources: [{ src: videoUrl }]
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
