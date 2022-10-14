import React from 'react';
import { EStoryType } from '../../types';
import { ImageStoryViewer, TextStoryViewer } from '../story-viewer';

type TImageStoryProps = {
  type: EStoryType.Text;
};

type TTextStoryProps = {
  type: EStoryType.Image;
  width: number;
  height: number;
};

interface Props {
  data: string;
  type: EStoryType;
}

const StoryViewer = (props: Props & (TImageStoryProps | TTextStoryProps)) => {
  const contentData = JSON.parse(props.data);

  if (props.type === EStoryType.Text)
    return <TextStoryViewer data={contentData} />;

  return (
    <ImageStoryViewer
      data={contentData}
      width={props.width}
      height={props.height}
    />
  );
};

export default StoryViewer;
