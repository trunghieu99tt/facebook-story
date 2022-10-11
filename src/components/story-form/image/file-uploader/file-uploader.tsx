import React, { ChangeEvent } from 'react';
import { BsCardImage } from 'react-icons/bs';
import './file-uploader.css';

type Props = {
  uploadText?: string;
  onFileChange: (file: File) => void;
};

const FileUploader = ({ onFileChange, uploadText }: Props): JSX.Element => {
  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file?.type?.match(/image.*/)) {
      onChangeFile && typeof onChangeFile === 'function' && onFileChange(file);
    }
    event.target.value = '';
  };

  return (
    <div className="fs-fileUploader-root">
      <input
        type="file"
        onChange={onChangeFile}
        className="fs-fileUploader-input"
        style={{
          display: 'none',
        }}
        id="imageFormInput"
      />
      <label htmlFor="imageFormInput" className="fs-fileUploader-label">
        <BsCardImage />
        <p>{uploadText}</p>
      </label>
    </div>
  );
};

export default React.memo(FileUploader);
