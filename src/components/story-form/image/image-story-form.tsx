import { FabricJSCanvas } from 'fabricjs-react';
import React, { useMemo } from 'react';
import { EImageFormUploadType } from '../../../enum';
import FileUploader from './file-uploader/file-uploader';
import UrlUploader from './url-uploader/url-uploader';

import './image-story-form.css';
import { useImageStoryForm } from './use-image-story-form';

type TImageFormWithFileUploader = {
  uploadType: EImageFormUploadType.File;
  uploadFunction: (file: File) => Promise<string>;
};

type TImageFormWithUrlUploader = {
  uploadType: EImageFormUploadType.Link;
};

type TTextProperties = {
  placeHolder?: string;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string | number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  name: string;
};

type TLabels = {
  addTextBtnLabel?: string;
  textColorLabel?: string;
  deleteSelectionsBtnLabel?: string;
  saveBtnLabel?: string;
  cancelBtnLabel?: string;
};

type TBaseImageStoryFormProps = {
  onCancel?: () => void;
  onSubmit: (text: string) => void;
  textProperties?: TTextProperties;
  labels?: TLabels;
  width: number;
  height: number;
};

export type TImageStoryFormProps = TBaseImageStoryFormProps &
  (TImageFormWithFileUploader | TImageFormWithUrlUploader);

export const ImageStoryForm = (props: TImageStoryFormProps): JSX.Element => {
  const {
    isSubmitted,
    textBoxCounter,

    onReady,
    onSubmit,
    onAddText,
    onChangeFile,
    onChangeImage,
    deleteSelections,
    onChangeTextColor,
  } = useImageStoryForm(props);

  const uploader = useMemo(() => {
    if (props.uploadType === EImageFormUploadType.File)
      return <FileUploader onFileChange={onChangeFile} />;
    return <UrlUploader changeImage={onChangeImage} />;
  }, [props.uploadType, onChangeImage]);

  return (
    <div className="fs-imageStoryForm-root">
      <div className="fs-imageStoryForm-top">
        {isSubmitted && (
          <aside className="fs-imageStoryForm-top__aside">
            <button
              className="fs-imageStoryForm-addTextBtn"
              onClick={onAddText}
            >
              {props.labels?.addTextBtnLabel ?? 'Add Text'}
            </button>
            <button
              className="fs-imageStoryForm-deleteTextsBtn"
              onClick={deleteSelections}
            >
              {props?.labels?.deleteSelectionsBtnLabel ?? 'Delete Selections'}
            </button>
            {textBoxCounter > 0 && (
              <div className="fs-imageStoryForm-textColorForm">
                <label
                  htmlFor="image-story-text-color"
                  className="fs-imageStoryForm-textColorForm__label"
                >
                  {props?.labels?.textColorLabel ?? 'Change Text Color'}
                </label>
                <input
                  className="fs-imageStoryForm-textColorForm__input"
                  type="color"
                  id="image-story-text-color"
                  onChange={onChangeTextColor}
                />
              </div>
            )}
          </aside>
        )}

        <div
          className="fs-imageStoryForm-main"
          style={{
            width: props.width,
            height: props.height,
          }}
        >
          {!isSubmitted && uploader}
          <FabricJSCanvas
            className="fs-imageStoryForm-canvas"
            onReady={onReady}
          />
        </div>
      </div>
      <div className="fs-imageStoryForm-actionBtnGroup">
        <button
          className="fs-imageStoryForm-actionBtnGroup__saveBtn"
          onClick={onSubmit}
          disabled={!isSubmitted}
        >
          {props?.labels?.saveBtnLabel ?? 'save'}
        </button>
        <button
          className="fs-imageStoryForm-actionBtnGroup__cancelBtn"
          onClick={props?.onCancel}
        >
          {props?.labels?.cancelBtnLabel ?? 'cancel'}
        </button>
      </div>
    </div>
  );
};
