import React, { useState } from 'react';

import ImageStoryForm from './components/story-form/image';
import TextStoryForm from './components/story-form/text';
import ImageStoryViewer from './components/story-viewer/image';
import TextStoryViewer from './components/story-viewer/text';

import './App.css';
import { EImageFormUploadType } from './enum/form.enum';

const App = (): JSX.Element => {
  const [storyType, setStoryType] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  const showResultFromServer = () => {
    const json = localStorage.getItem('data');
    if (json) {
      const objects = JSON.parse(json);
      console.log(`objects`, objects);
      setData(objects);
    }
  };

  const reset = () => {
    setStoryType(null);
    setData(null);
    localStorage.setItem('data', '');
  };

  const onSubmit = (data: string) => {
    localStorage.setItem('data', data);
  };

  const storyView =
    data &&
    ((!data.type && <ImageStoryViewer data={data} />) || (data?.type === 'text' && <TextStoryViewer data={data} />));

  return (
    <div className='root'>
      <button onClick={showResultFromServer}>Show result from server</button>
      <button onClick={reset}>Reset</button>
      {!storyType && (
        <React.Fragment>
          <button onClick={() => setStoryType('text')}>Text story</button>
          <button onClick={() => setStoryType('image')}> Image story </button>
        </React.Fragment>
      )}
      <div className='main'>
        {(storyType === 'text' && <TextStoryForm onCancel={reset} onSubmit={onSubmit} />) ||
          (storyType === 'image' && (
            <ImageStoryForm onCancel={reset} onSubmit={onSubmit} uploadType={EImageFormUploadType.Link} />
          ))}
        <div
          style={{
            width: '100px',
            height: '100px',
          }}
        >
          {storyView}
        </div>
      </div>
    </div>
  );
};

export default App;
