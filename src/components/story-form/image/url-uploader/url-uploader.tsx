import React, { ChangeEvent } from 'react';
import { TPropsClass } from '../../../../types/app.types';
import { isValidUrl, mergeClasses } from '../../../../utils';
import defaultClasses from './url-uploader.module.css';

type Props = {
  loadImage: (url: string) => void;
  classes?: TPropsClass;
};

const UrlUploader = ({ loadImage, classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const [imageUrl, setImageUrl] = React.useState('');

  const onChangeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    const url = event?.target?.value;
    setImageUrl(url);
  };

  const onLoadImage = () => {
    if (imageUrl?.trim().length > 0 && isValidUrl(imageUrl)) {
      loadImage(imageUrl);
    }
  };

  return (
    <div className={classes.imageForm}>
      <input type='text' onChange={onChangeUrl} />
      <button onClick={onLoadImage}>Load Image</button>
    </div>
  );
};

export default React.memo(UrlUploader);
