import React, { useEffect } from 'react';

type Props = {
  url: string;
  playing: boolean;
};

const AudioPlayer = ({ url, playing }: Props) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      audioRef.current.addEventListener('ended', () => {
        audioRef.current?.pause();
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [url, playing]);

  return (
    <audio
      src={url}
      ref={audioRef}
      style={{
        display: 'none',
      }}
    ></audio>
  );
};

export default AudioPlayer;
