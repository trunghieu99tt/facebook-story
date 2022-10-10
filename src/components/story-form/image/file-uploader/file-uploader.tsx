import React, { ChangeEvent } from 'react';
import defaultClasses from './file-uploader.module.css';
import { BsCardImage } from 'react-icons/bs';
import { TPropsClass } from '../../../../types/app.types';
import { mergeClasses } from '../../../../utils';

type Props = {
  uploadText?: string;
  onFileChange: (file: File) => void;
  classes?: TPropsClass;
};

const FileUploader = ({
  onFileChange,
  uploadText,
  classes: propsClasses,
}: Props): JSX.Element => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (file?.type?.match(/image.*/)) {
      onChangeFile && typeof onChangeFile === 'function' && onFileChange(file);
    }
    event.target.value = '';
  };

  return (
    <div className={classes.form}>
      <input
        type="file"
        onChange={onChangeFile}
        className={classes.input}
        style={{
          display: 'none',
        }}
        id="imageFormInput"
      />
      <label htmlFor="imageFormInput" className={classes.label}>
        <BsCardImage />
        <p>{uploadText}</p>
      </label>
    </div>
  );
};

export default React.memo(FileUploader);
