import React, { useState } from 'react';

import {
  ImageStoryForm,
  ImageStoryViewer,
  StoryCard,
  TextStoryForm,
  TextStoryViewer,
} from 'facebook-story';
import { data as storyCardData } from './story-card.data';

const App = () => {
  const [storyType, setStoryType] = useState(null);
  const [showStoryCardExample, setShowStoryCardExample] = useState(false);
  const [data, setData] = useState(null);

  const showResultFromServer = () => {
    const json = localStorage.getItem('data');
    if (json) {
      const objects = JSON.parse(json);
      setData(objects);
    }
  };

  const reset = () => {
    setStoryType(null);
    setData(null);
    localStorage.setItem('data', '');
  };

  const onSubmit = (data) => {
    localStorage.setItem('data', data);
  };

  const uploadMediaFunction = async (file) => {
    return URL.createObjectURL(file);
  };

  const storyView =
    data &&
    ((!data.type && (
      <ImageStoryViewer data={data} height={300} width={300} />
    )) ||
      (data?.type === 'text' && <TextStoryViewer data={data} />));

  return (
    <div className="root">
      <button onClick={showResultFromServer}>Show result from server</button>
      <button onClick={reset}>Reset</button>
      <button onClick={() => setShowStoryCardExample((prev) => !prev)}>
        Show story card example
      </button>
      {!storyType && (
        <React.Fragment>
          <button onClick={() => setStoryType('text')}>Text story</button>
          <button onClick={() => setStoryType('image')}> Image story</button>
        </React.Fragment>
      )}
      <div className="main">
        {(storyType === 'text' && (
          <TextStoryForm onCancel={reset} onSubmit={onSubmit} />
        )) ||
          (storyType === 'image' && (
            <ImageStoryForm
              onCancel={reset}
              onSubmit={onSubmit}
              uploadType="file"
              // uploadFunction={uploadMediaFunction}
              width={300}
              height={300}
            />
          ))}
        <div style={{ width: '300px', height: '300px' }}>{storyView}</div>
      </div>

      <div>
        <p> Story Card example </p>
        <StoryCard data={storyCardData} width={200} height={200} />
      </div>
    </div>
  );
};

export default App;
