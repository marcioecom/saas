import React from 'react';

const Embeded = () => {
  // const [videoUrl, setVideoUrl] = useState('#')
  const baseUrl = process.env.REACT_APP_APP_URL

  return (
    <>
      <video
        width="600px"
        controls
        autoPlay
      >
        <source src={`${baseUrl}/stream`} type="video/mp4" />
      </video>
    </>
  );
}

export default Embeded;
