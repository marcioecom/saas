import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFiles } from "../../hooks/useFiles"

import './style.css'

const Upload = () => {
  const { handleUpload } = useFiles()

  const onDrop = useCallback(
    (files) => {
      handleUpload(files)
    },
    [handleUpload]
  )

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    accept: ["video/*", "image/*"],
    onDrop
  })

  const renderDragMessage = useCallback(() => {
    if(!isDragActive) {
      return (
        <span className="upload-message default">
          Arraste arquivos aqui...
        </span>
      )
    }

    if (isDragReject) {
      return (
        <span className="upload-message error">
          Tipo de arquivo não suportado
        </span>
      )
    }

    return <span className="upload-message success">Solte os arquivos aqui</span>
  }, [isDragActive, isDragReject])

  return (
    <div className="upload-container">
      <div
        className="dropzone"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {renderDragMessage()}
      </div>
    </div>
  );
};
export default Upload;