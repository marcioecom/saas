import * as React from 'react';

import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar';
import Upload from '../../components/Upload';
import FileList from '../../components/FileList';

import "./videos.css"

const Videos = () => {
  return (
    <div className="page">
      <NavBar />
      <div className="video-main-content">
        <SideBar />
        <div className="videos-content">
          <h2>Videos</h2>

          <div className="videos-main">
            <p className="text-center-upload">Faça o envio dos seus videos</p>
            <Upload />

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

                <FileList />
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Videos;
