import { fabric } from 'fabric';
import { useFabricJSEditor } from 'fabricjs-react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_TEXT_ATTRIBUTES } from '../../../constants';
import { EImageFormUploadType } from '../../../enum';
import { TImageStoryFormProps } from './image-story-form';

export const useImageStoryForm = (props: TImageStoryFormProps) => {
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

  return {
    isSubmitted,
    textBoxCounter,

    onReady,
    onSubmit,
    onAddText,
    onChangeFile,
    onChangeImage,
    deleteSelections,
    onChangeTextColor,
  };
};
