import { ReactNode, useEffect, useState } from 'react';
import { MdFileUpload } from "react-icons/md";
import filesize from "filesize";

import { useAuth } from '../../hooks/useAuth';
// import { useFiles } from '../../hooks/useFiles';
import api from '../../services/api';

import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar';
import logo from "../../assets/images/play512.png"


import "./videos.css"

interface IVideo {
  id: string;
  key: string;
  name: string;
  size: number;
  url: string;
  created_at: string;
}

const Videos = () => {
  const [name, setName] = useState('');
  // const { handleUpload } = useFiles()
  const { setAuthenticated } = useAuth()
  const [videos, setVideos] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/videos")

        setVideos(data)
      } catch (error: any) {
        if (error.message === "Request failed with status code 401") {
          setAuthenticated(false)
        }
      }
    })()
  }, [setAuthenticated])

  useEffect(() => {
    (async () => {
      const { data } = await api.get("/profile")
      setName(data.name)
    })()
  }, []);

  const showVideos = (): ReactNode => {
    const videosElement = videos.map((video: IVideo) => (
      <tr key={video.id}>
        <td>{video.name}</td>
        <td>
          <a href={`/embeded/${video.id}`}>
            Ver Player
          </a>
        </td>
        <td>{filesize(video.size)}</td>
        <td>
          {new Date(Date.parse(video.created_at)).toLocaleDateString()}
        </td>
      </tr>
    ))
    return videosElement;
  }

  return (
    <div className="page">
      <NavBar />
      <header className="header-dashboard">
        <div className="header-logo">
          <img src={logo} alt="VClick Logo" />
          <p>VClick</p>
        </div>
        <div className="profile">
          Olá, {name}
        </div>
      </header>
      <div className="video-main-content">
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
              <table className="videos-table">
                <thead>
                  <tr>
                    <th>Nome do Arquivo</th>
                    <th>Embeded</th>
                    <th>Tamanho</th>
                    <th>Data de envio</th>
                  </tr>
                </thead>

                <tbody>
                  { showVideos() }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videos;
