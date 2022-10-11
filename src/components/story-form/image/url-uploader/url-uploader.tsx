import React, { ChangeEvent } from 'react';
import { isValidUrl } from '../../../../utils';
import './url-uploader.css';

type Props = {
  changeImage: (url: string) => void;
  loadImageLabel?: string;
};

const UrlUploader = ({ changeImage, loadImageLabel }: Props) => {
  const [imageUrl, setImageUrl] = React.useState('');

  const onChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event?.target?.value;
    setImageUrl(url);
  };

  const onLoadImage = () => {
    if (imageUrl?.trim().length > 0 && isValidUrl(imageUrl)) {
      changeImage(imageUrl);
    }
  };

  return (
    <div className="fs-urlUploader-root">
      <input
        type="text"
        onChange={onChangeUrl}
        className="fs-urlUploader-input"
      />
      <button onClick={onLoadImage} className="fs-urlUploader-btn">
        {loadImageLabel ?? 'Load Image'}
      </button>
    </div>
  );
};

export default React.memo(UrlUploader);
