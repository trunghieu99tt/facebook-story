import React, { useEffect } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';

import defaultClasses from './image-story-viewer.module.css';
import { mergeClasses } from '../../../utils';
import { TPropsClass } from '../../../types/app.types';

interface Props {
  data: any | null;
  classes?: TPropsClass;
}

const ImageStoryViewer = ({
  data,
  classes: propClasses,
}: Props): JSX.Element => {
  const classes = mergeClasses(defaultClasses, propClasses);

  const { editor, onReady } = useFabricJSEditor();

  useEffect(() => {
    if (data && editor) {
      editor?.canvas.loadFromJSON(data, () => {
        editor?.canvas.requestRenderAll();
        editor?.canvas.renderAll();
        editor?.canvas.calcOffset();
      });
    }
  }, [editor, data]);

  return (
    <div
      style={{
        display: data ? 'block' : 'none',
        width: '100%',
        height: '100%',
      }}
    >
      <FabricJSCanvas className={classes.canvas} onReady={onReady} />
    </div>
  );
};

export default ImageStoryViewer;
