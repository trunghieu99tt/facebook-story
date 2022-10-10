import { TPropsClass } from '../../../types/app.types';
import { mergeClasses } from '../../../utils';
import defaultClasses from './text-story-viewer.module.css';
import React from 'react';

interface Props {
  data: any;
  classes?: TPropsClass;
}

const TextStoryViewer = ({
  data,
  classes: propsClasses,
}: Props): JSX.Element => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const { background, text } = data;
  return (
    <div
      className={classes.root}
      style={{
        background: `${background}`,
      }}
    >
      <div className={classes.text}>{text}</div>
    </div>
  );
};

export default TextStoryViewer;
