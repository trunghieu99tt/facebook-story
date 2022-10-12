# Facebook Story

Simplified React implementation of Facebook story

## Features

| Done | Name                                 |
| :--: | ------------------------------------ |
|  ✅  | Create text-based story              |
|  ✅  | Create image-based story             |
|  ✅  | View text-based story                |
|  ✅  | View image-based story               |
| ⬜️  | Story card (with countdown)          |
| ⬜️  | Background music in text/image story |

## Installation

Install my-project with npm

```bash
npm install facebook-story
# or
yarn add facebook-story
```

## Demo

You can find the demo [here](https://codesandbox.io/s/facebook-story-demo-915i8e)

## Component References

#### Text story form

```js
<TextStoryForm
  onCancel={reset}
  onSubmit={onSubmit}
  maxLength={100}
  onExceedMaxLength={() => alert('Exceed max length')}
  labels={{
    addTextLabel: 'Add text',
    cancelBtnLabel: 'Cancel',
    changeColorLabel: 'Change color',
    previewLabel: 'Preview',
    saveBtnLabel: 'Save',
  }}
/>
```

| prop                | Type                               | Description                                                               |
| :------------------ | :--------------------------------- | :------------------------------------------------------------------------ |
| `onCancel`          | `function: () => void`             | **Required**. Function to handle cancellation logic for story text form   |
| `onSubmit`          | `function: (text: string) => void` | **Required**. Function to call when submitting story text form            |
| `labels`            | `TLables`                          | Custom heading labels for parts of text story form                        |
| `maxLength`         | `number`                           | Maximum number of characters of text story form                           |
| `onExceedMaxLength` | `function: () => void`             | Function to call when input text exceeds the maximum number of characters |

```js
TLabels;
```

| key                | Type     | Description                                            |
| :----------------- | :------- | :----------------------------------------------------- |
| `addTextLabel`     | `string` | Label of add text secion (Default: Add your text here) |
| `previewLabel`     | `string` | Label of preview section (Default: Preview)            |
| `saveBtnLabel`     | `string` | Label of save button (submit button)                   |
| `cancelBtnLabel`   | `string` | Label of cancellation button                           |
| `changeColorLabel` | `string` | Label of change background color section               |
| `changeFontLabel`  | `string` | Label of change text font family                       |

#### Image Story Form

```js
<ImageStoryForm
  onCancel={reset}
  onSubmit={onSubmit}
  uploadType="file"
  uploadFunction={uploadMediaFunction}
  width={300}
  height={300}
  labels={{
    addTextBtnLabel: 'Add text',
    cancelBtnLabel: 'Cancel',
    deleteSelectionsBtnLabel: 'Delete selections',
    saveBtnLabel: 'Save',
    textColorLabel: 'Text color',
  }}
  textProperties={{
    name: 'text',
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Arial',
    fontWeight: 'bold',
    placeHolder: 'Enter text',
    textAlign: 'center',
  }}
/>
```

| prop             | Type                               | Description                                                                                                                      |
| :--------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `onCancel`       | `function: () => void`             | **Required**. Function to handle cancellation logic for story text form                                                          |
| `onSubmit`       | `function: (text: string) => void` | **Required**. Function to call when submitting story text form                                                                   |
| `textProperties` | `TTextProperties`                  | Custom text properties of text object in image story                                                                             |
| `labels`         | `TLabels`                          | Custom heading labels for parts of image story form                                                                              |
| `width`          | `number`                           | **Required**. Width of the cavas holds the image story view                                                                      |
| `height`         | `number`                           | **Required**. Height of the cavas holds the image story view                                                                     |
| `uploadType`     | `link \| file`                     | **Required**. Type of uploading image, you can choose between link of uploaded image or upload your own image from your computer |
| `uploadFunction` | `(file: File) => Promise<string>`  | **Required of uploadType = 'file'**. Upload function of image uploaded from your computer. Should returns a link                 |

```js
TTextProperties;
```

| key           | Type                                 | Description                                                              |
| :------------ | :----------------------------------- | :----------------------------------------------------------------------- |
| `placeHolder` | `string`                             | Default text when adding new text to image story                         |
| `color`       | `string`                             | Text color                                                               |
| `fontSize`    | `number`                             | Font-size of text                                                        |
| `fontFamily`  | `string`                             | Font family of text (make sure you imported that font into your project) |
| `fontWeight`  | `string`                             | Font weight of text                                                      |
| `textAlign`   | `left \| center \| right \| justify` | Alignment of text                                                        |
| `name`        | `string`                             | Name of object holds the text                                            |

```js
TLabels;
```

| key                        | Type     | Description                                            |
| :------------------------- | :------- | :----------------------------------------------------- |
| `addTextLabel`             | `string` | Label of add text secion (Default: Add your text here) |
| `textColorLabel`           | `string` | Label of changing text color input section             |
| `deleteSelectionsBtnLabel` | `string` | Label of deleting selected objects button)             |
| `saveBtnLabel`             | `string` | Label of submit button                                 |
| `cancelBtnLabel`           | `string` | Label of cancellation button                           |

#### Image Story Viewer

```js
const data = {
    objects: Object[]; // see more in fabric.Object
    width: 500,
    height: 500
}

<ImageStoryViewer data={data} height={300} width={300}/>
```

| prop     | Type     | Description                                                                  |
| :------- | :------- | :--------------------------------------------------------------------------- |
| `data`   | `TData`  | **Required**. Data of image story                                            |
| `width`  | `number` | **Required**. Width of current canvas holds rendering field for image story  |
| `height` | `number` | **Required**. Height of current canvas holds rendering field for image story |

```js
TData;
```

| key       | Type              | Description                                                                              |
| :-------- | :---------------- | :--------------------------------------------------------------------------------------- |
| `objects` | `fabric.Object[]` | **Required**.Data of fabric objects to be rendered in canvas                             |
| `width`   | `number`          | **Required**.Width of canvas holds rendering field for image story in image story form   |
| `height`  | `number`          | **Required**. Height of canvas holds rendering field for image story in image story form |

#### Text Story Viewer

```js
const data = {
    background: '#000',
    fontFamily: 'Arial',
    text: 'This is a text story'
}

<TextStoryViewer data={data}/>
```

| prop   | Type    | Description                      |
| :----- | :------ | :------------------------------- |
| `data` | `TData` | **Required**. Data of text story |

```js
TData;
```

| key          | Type     | Description                             |
| :----------- | :------- | :-------------------------------------- |
| `background` | `string` | **Required**. Background of text story  |
| `fontFamily` | `string` | **Required**. Font family of text story |
| `text`       | `string` | **Required**. Content of text story     |

## License

[MIT](https://choosealicense.com/licenses/mit/)
