export type TPropsClass = {
  [key: string]: Record<string, any>;
};

export type TTextStoryData = {
  background: string;
  fontFamily: string;
  text: string;
  audioUrl: string;
};

export enum EStoryType {
  Image = 'Image',
  Text = 'Text',
  Unknown = 'Unknown',
}
