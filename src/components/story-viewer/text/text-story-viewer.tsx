import React from 'react';
import { TTextStoryData } from '../../../types';
import './text-story-viewer.css';

interface Props {
  data: TTextStoryData;
}

export const TextStoryViewer = ({ data }: Props): JSX.Element => {
  const { background, text, fontFamily } = data;
  return (
    <div
      className="fs-textStoryViewer-root"
      style={{
        background,
        fontFamily,
      }}
    >
      <div className="fs-textStoryViewer-text">{text}</div>
    </div>
  );
};
