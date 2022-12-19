import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { AVAILABLE_FONTS, BACKGROUND_LIST } from '../../../constants';
import { TTextStoryData } from '../../../types';
import Selector from '../../shared/selector';

import './text-story-form.css';

type Prop = {
  onCancel: () => void;
  onSubmit: (text: string) => void;

  labels?: TLabels;
  maxLength?: number;
  onExceedMaxLength?: () => void;
};

type TLabels = {
  addTextLabel?: string;
  previewLabel?: string;
  saveBtnLabel?: string;
  cancelBtnLabel?: string;
  changeColorLabel?: string;
  changeFontLabel?: string;
};

export const TextStoryForm = ({
  labels,
  maxLength = 200,

  onCancel,
  onSubmit,
  onExceedMaxLength,
}: Prop): JSX.Element => {
  const [text, setText] = useState('');
  const [background, setBackground] = useState('#000');
  const [fontFamily, setFontFamily] = useState('Arial');
  const [audioUrl, setAudioUrl] = useState('');

  const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (maxLength) {
      if (text.length > maxLength) {
        onExceedMaxLength && onExceedMaxLength();
        return;
      }
    }
    setText(text);
  };

  const saveToServer = () => {
    if (text.trim().length > 0) {
      const data: { type: string } & TTextStoryData = {
        type: 'text',
        background,
        fontFamily,
        text,
        audioUrl,
      };
      onSubmit(JSON.stringify(data));
    }
  };

  const fontOptions = useMemo(() => {
    return AVAILABLE_FONTS.map((font) => ({
      label: font,
      value: font,
      id: font,
    }));
  }, []);

  const renderChosenFontFamily = useCallback(
    (value: string) => (
      <div className="fs-textStoryForm-textConfig__fontPickerValue">
        <span>{value}</span>
        <MdKeyboardArrowDown />
      </div>
    ),
    [],
  );

  return (
    <div className="fs-textStoryForm-root">
      <div className="fs-textStoryForm-form">
        <aside className="fs-textStoryForm-textConfig">
          <p className="fs-textStoryForm-textConfig__label">
            {labels?.addTextLabel ?? 'Add your text here'}
          </p>
          <textarea
            className="fs-textStoryForm-textConfig__textArea"
            onChange={onChangeText}
            rows={7}
          />

          <p className="fs-textStoryForm-textConfig__label">
            {labels?.changeFontLabel ?? 'Change font'}
          </p>
          <div className="fs-textStoryForm-textConfig__fontPicker">
            <Selector<string>
              options={fontOptions}
              onChange={setFontFamily}
              value={fontFamily}
              renderValue={renderChosenFontFamily}
            />
          </div>

          <p className="fs-textStoryForm-textConfig__label">
            {labels?.changeColorLabel ?? 'Change color'}
          </p>
          <ul className="fs-textStoryForm-textConfig__backgroundList">
            {BACKGROUND_LIST.map((color: string) => {
              return (
                <ColorOption
                  color={color}
                  isActive={color === background}
                  onClick={setBackground}
                  key={color}
                />
              );
            })}
          </ul>
        </aside>
        <div className="fs-textStoryForm-preview">
          <p className="fs-textStoryForm-preview__label">
            {labels?.previewLabel ?? 'Preview'}
          </p>

          <div
            className="fs-textStoryForm-preview__wrapper"
            style={{
              background,
            }}
          >
            <p
              className="fs-textStoryForm-preview__text"
              style={{
                fontFamily,
              }}
            >
              {text}
            </p>
          </div>
        </div>
      </div>
      <div className="fs-textStoryForm-actionBtnGroup">
        <button
          className="fs-textStoryForm-actionBtnGroup__saveBtn"
          onClick={saveToServer}
        >
          {labels?.saveBtnLabel ?? 'save'}
        </button>
        <button
          className="fs-textStoryForm-actionBtnGroup__cancelBtn"
          onClick={onCancel}
        >
          {labels?.cancelBtnLabel ?? 'cancel'}
        </button>
      </div>
    </div>
  );
};

const ColorOption = React.memo(
  ({
    onClick,
    isActive,
    color,
  }: {
    onClick: (color: string) => void;
    isActive: boolean;
    color: string;
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClickColor = (color: string) => (_event: any) => {
      onClick(color);
    };

    return (
      <li
        onClick={onClickColor(color)}
        style={{
          background: color,
          cursor: 'pointer',
          outline: `${isActive ? '2px solid blue' : ''} `,
        }}
      ></li>
    );
  },
);
