import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import React, { useEffect } from 'react';

import './image-story-viewer.css';

interface Props {
  data: {
    objects: any;
    width: number;
    height: number;
  } | null;
  width: number;
  height: number;
}

export const ImageStoryViewer = ({
  data,
  width,
  height,
}: Props): JSX.Element => {
  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    if (data && editor) {
      editor?.canvas?.setWidth(width);
      editor?.canvas?.setHeight(height);
      editor?.canvas.loadFromJSON(data.objects, resizeObjectsToFitCanvas);
    }
  }, [editor, data]);

  const resizeObjectsToFitCanvas = () => {
    const objects = editor?.canvas.getObjects();
    if (!data || !objects) return;

    const { width: originalWidth, height: originalHeight } = data;
    const scaleWidth = width / originalWidth;
    const scaleHeight = height / originalHeight;

    objects?.forEach((obj: any) => {
      if (
        obj.scaleX !== undefined &&
        obj.scaleY !== undefined &&
        obj.left !== undefined &&
        obj.top !== undefined
      ) {
        obj.scaleX = obj.scaleX * scaleWidth;
        obj.scaleY = obj.scaleY * scaleHeight;
        obj.left = obj.left * scaleWidth;
        obj.top = obj.top * scaleHeight;
        obj.setCoords();
      }
    });
    editor?.canvas.requestRenderAll();
    editor?.canvas.renderAll();
    editor?.canvas.calcOffset();
  };

  return (
    <div
      style={{
        display: data ? 'block' : 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <FabricJSCanvas
        className="fs-imageStoryViewer-canvas"
        onReady={onReady}
      />
    </div>
  );
};
