import { useEffect, useState } from 'react';
import { MdFileUpload } from "react-icons/md"
import NavBar from '../../components/NavBar/NavBar';
import SideBar from '../../components/SideBar/SideBar';
import api from '../../services/api';

import "./videos.css"

interface IVideo {
  id: number;
  name: string;
  website: string;
}

const Videos = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/videos")

      setVideos(data)
    })()
  }, [])

  return (
    <>
      <NavBar />
      <div className="page">
        <SideBar />
        <div className="videos-content">
          <h2>Videos</h2>
          <div className="videos-main">
            <p className="text-center-upload">Faça o envio dos seus videos</p>
            <div className="upload-container">
              <label className="custom-file-upload">
                <input type="file" name="file" />
                <MdFileUpload color="white" size={20} />
                Escolher arquivo
              </label>
            </div>
            <div className="files-preview">
              <ul>
                {videos.map((video: IVideo) => (
                  <li key={video.id}>
                    {video.name} (video.website)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Videos;