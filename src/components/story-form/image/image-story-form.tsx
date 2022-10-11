import { fabric } from 'fabric';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { DEFAULT_TEXT_ATTRIBUTES } from '../../../constants';
import { EImageFormUploadType } from '../../../enum/form.enum';
import FileUploader from './file-uploader/file-uploader';
import UrlUploader from './url-uploader/url-uploader';

import './image-story-form.css';

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

type Props = {
  onCancel?: () => void;
  onSubmit: (text: string) => void;
  textProperties?: TTextProperties;
  labels?: TLabels;
  width: number;
  height: number;
};

export const ImageStoryForm = (
  props: Props & (TImageFormWithFileUploader | TImageFormWithUrlUploader),
): JSX.Element => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [textBoxCounter, setTextBoxCounter] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isLoadedImage = useRef<boolean>(false);

  const { editor, onReady } = useFabricJSEditor();

  const deleteSelections = () => {
    let deletedTextBoxCounter = 0;
    editor?.canvas.getActiveObjects().forEach((object) => {
      deletedTextBoxCounter += object?.type === 'textbox' ? 1 : 0;
      editor?.canvas.remove(object);
    });
    setTextBoxCounter(Math.max(0, textBoxCounter - deletedTextBoxCounter));
  };

  const onAddText = () => {
    try {
      editor?.canvas.add(
        new fabric.Textbox(
          `${props?.textProperties?.placeHolder ?? 'Type something...'}`,
          {
            fill: props?.textProperties?.color || DEFAULT_TEXT_ATTRIBUTES.fill,
            fontSize:
              props?.textProperties?.fontSize ||
              DEFAULT_TEXT_ATTRIBUTES.fontSize,
            fontFamily:
              props?.textProperties?.fontFamily ||
              DEFAULT_TEXT_ATTRIBUTES.fontFamily,
            fontWeight:
              props?.textProperties?.fontWeight ||
              DEFAULT_TEXT_ATTRIBUTES.fontWeight,
            textAlign:
              props?.textProperties?.textAlign ||
              DEFAULT_TEXT_ATTRIBUTES.textAlign,
            name: props?.textProperties?.name,
          },
        ),
      );
      setTextBoxCounter((v) => v + 1);
      editor?.canvas.renderAll();
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeFile = (file: File) => {
    setFile(file);
    isLoadedImage.current = false;
  };

  const onChangeTextColor = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e?.target?.value;
    editor?.canvas.getActiveObjects().forEach((object) => {
      if (object.type === 'textbox') {
        object.set('fill', color);
      }
    });
    editor?.canvas.renderAll();
  };

  const saveObjects = () => {
    const objects = editor?.canvas.toJSON();
    if (objects) {
      const data = {
        objects,
        width: props.width,
        height: props.height,
      };
      props.onSubmit(JSON.stringify(data));
    }
  };

  const onSubmit = async () => {
    if (props.uploadType === EImageFormUploadType.File) {
      if (!file) return;
      const image = await props.uploadFunction(file);
      if (!image) {
        return;
      }
      const obj = editor?.canvas.getObjects();
      obj?.forEach((o: any) => {
        if (o.type === 'image') {
          o.setSrc(image, () => {
            saveObjects();
          });
        }
      });
      return;
    }
    saveObjects();
  };

  const onChangeImage = useCallback(
    (url: string) => {
      if (url === imageUrl) return;
      setImageUrl(url);
      isLoadedImage.current = false;
    },
    [imageUrl],
  );

  useEffect(() => {
    if (editor && (imageUrl || file) && !isLoadedImage.current) {
      let url = imageUrl;
      if (file) {
        url = URL.createObjectURL(file);
      }

      fabric.Image.fromURL(url, (img) => {
        editor?.canvas.setWidth(props.width);
        editor?.canvas.setHeight(props.height);
        editor?.canvas.add(img);
        const obj = editor?.canvas.getObjects();
        obj?.forEach((o) => {
          if (o.type === 'image') {
            o.scaleToHeight(props.width);
            o.scaleToHeight(props.height);
          }
        });

        editor?.canvas.centerObject(img);
        isLoadedImage.current = true;
        setIsSubmitted(true);
      });
    }
  }, [editor, imageUrl, file, props.width, props.height]);

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
