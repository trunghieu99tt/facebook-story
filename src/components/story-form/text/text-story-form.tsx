import React, { ChangeEvent, useState } from 'react';
import { BACKGROUND_LIST } from '../../../constants';
import { TPropsClass } from '../../../types/app.types';
import { mergeClasses } from '../../../utils';
import defaultClasses from './text-story.module.css';

type Prop = {
  onCancel: () => void;
  onSubmit: (text: string) => void;

  classes?: TPropsClass;
  maxLength?: number;
  onExceedMaxLength?: () => void;
  labels?: TLabels;
};

type TLabels = {
  addTextLabel?: string;
  changeColorLabel?: string;
  previewLabel?: string;
  saveBtnLabel?: string;
  cancelBtnLabel?: string;
};

const TextStoryForm = ({
  onCancel,
  onSubmit,
  onExceedMaxLength,
  maxLength,
  classes: propsClasses,
  labels,
}: Prop): JSX.Element => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const [text, setText] = useState('');
  const [background, setBackground] = useState('#000');

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
      const data = {
        type: 'text',
        background,
        text,
      };
      onSubmit(JSON.stringify(data));
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <aside className={classes.aside}>
          <p className={classes.label}>
            {labels?.addTextLabel ?? 'Add your text here'}
          </p>
          <textarea
            className={classes.textarea}
            onChange={onChangeText}
            rows={7}
          />
          <p className={classes.label}>
            {labels?.changeColorLabel ?? 'Change color'}
          </p>
          <ul className={classes.backgroundList}>
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
        <div className={classes.main}>
          <p className={classes.label}>{labels?.previewLabel ?? 'Preview'}</p>

          <div
            className={classes.textStoryPreview}
            style={{
              background,
            }}
          >
            <p className={classes.text}>{text}</p>
          </div>
        </div>
      </div>
      <div className={classes.btnGroup}>
        <button className={classes.saveBtn} onClick={saveToServer}>
          {labels?.saveBtnLabel ?? 'save'}
        </button>
        <button className={classes.cancelBtn} onClick={onCancel}>
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

export default TextStoryForm;
