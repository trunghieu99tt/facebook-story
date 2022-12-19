import cn from 'classnames';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { EStoryType } from '../../types';
import { safeCallFn } from '../../utils';
import './story-card.css';
import StoryViewer from './story-viewer';

enum EDirection {
  Left = 'Left',
  Right = 'Right',
}

export type TStoryCardData = {
  type: EStoryType;
  content: string;
};

type Props = {
  data: Array<TStoryCardData>;
  header?: JSX.Element;
  footer?: JSX.Element;
  onPrev?: () => void;
  onNext?: () => void;
  width: number;
  height: number;
};

export const StoryCard = ({
  data,
  header,
  onPrev,
  onNext,
  width,
  height,
}: Props) => {
  const [activeStoryId, setActiveStoryId] = useState<number>(0);

  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  const onStoryChange = useCallback(
    (direction: EDirection) => {
      const nextActiveStoryId =
        direction === EDirection.Left ? activeStoryId - 1 : activeStoryId + 1;
      if (nextActiveStoryId < 0) {
        safeCallFn(onPrev);
        return;
      }

      if (nextActiveStoryId >= data.length) {
        safeCallFn(onNext);
        return;
      }
      setActiveStoryId(nextActiveStoryId);
    },
    [activeStoryId, data, onPrev, onNext],
  );

  useEffect(() => {
    const removeAnimation = (item: HTMLDivElement) => {
      item.classList.remove('active');
      item.classList.add('passed');
    };

    const items = itemsRef.current;

    items.forEach((item: HTMLDivElement | null, idx) => {
      if (item) {
        item.addEventListener('animationend', () => {
          const nextIdx = idx + 1;
          if (idx < itemsRef.current.length) {
            itemsRef.current[nextIdx]?.classList.add('active');
          }
          removeAnimation(item);
          onStoryChange(EDirection.Right);
        });
      }
    });

    return () => {
      items.forEach((item: HTMLDivElement | null) => {
        if (item) {
          item.removeEventListener('animationend', () => {
            removeAnimation(item);
          });
        }
      });
    };
  }, [itemsRef, onStoryChange]);

  const hasPrevButton = activeStoryId > 0 || onPrev;
  const hasNextButton = activeStoryId < data?.length - 1 || onNext;
  const dataLength = data?.length || 0;
  const activeStory = data?.[activeStoryId];

  const storyProgressBars = useMemo(() => {
    return [...Array(dataLength)].map((_, idx: number) => {
      return (
        <div
          className={cn('fs-storyCard-progressBarItem', {
            active: idx === activeStoryId,
          })}
          ref={(el) => (itemsRef.current[idx] = el)}
          key={`progress-bar-${idx}`}
        />
      );
    });
  }, [dataLength, activeStoryId]);

  let viewer = null;

  switch (activeStory.type) {
    case EStoryType.Image:
      viewer = (
        <StoryViewer
          data={activeStory.content}
          type={activeStory.type}
          width={200}
          height={200}
        />
      );
      break;
    case EStoryType.Text:
      viewer = (
        <StoryViewer data={activeStory.content} type={activeStory.type} />
      );
      break;
  }

  return (
    <div
      className="fs-storyCard"
      style={{
        width,
        height,
      }}
    >
      {hasPrevButton && (
        <button
          onClick={() => onStoryChange(EDirection.Left)}
          className={cn('fs-storyCard-arrow', 'fs-storyCard-arrow--left')}
        >
          <AiFillLeftCircle />
        </button>
      )}
      <div className="fs-storyCard-progressBarContainer">
        {storyProgressBars}
      </div>
      {header}
      {viewer}
      {hasNextButton && (
        <button
          onClick={() => onStoryChange(EDirection.Right)}
          className={cn('fs-storyCard-arrow', 'fs-storyCard-arrow--right')}
        >
          <AiFillRightCircle />
        </button>
      )}
    </div>
  );
};
