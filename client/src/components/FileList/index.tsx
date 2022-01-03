import * as React from 'react';
import { useFiles } from '../../hooks/useFiles';

import { MdError } from "react-icons/md"
import { BiTrash } from "react-icons/bi"
import { CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';

const FileList = () => {
  const { uploadedFiles: files, deleteFile } = useFiles()

  return (
    <tbody>
      {files.map((video) => (
        <tr key={video.id}>
          <td>{video.name}</td>
          <td>
            <a href={`/embeded/${video.id}`}>
              Ver Player
            </a>
          </td>
          <td>{video.readableSize}</td>
          <td>
            {new Date(Date.parse(video.created_at)).toLocaleDateString()}
          </td>
          <td>
            {!video.uploaded && !video.error && (
              <CircularProgressbar
                styles={{
                  root: { width: 24 },
                  path: { stroke: '#7159c1'}
                }}
                strokeWidth={15}
                value={video.progress || 0}
              />
            )}

            { !!video.url && (
              <button 
                style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
                onClick={(e) => deleteFile(video.id)}
              >
                <BiTrash
                  color="#e33"
                  size={24}
                />
              </button>
            ) }

            { video.error && <MdError size={24} color="#e57878" /> }
          </td>
        </tr>
      ))}
    </tbody>
  )
}
 
export default FileList;