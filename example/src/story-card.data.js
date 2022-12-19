import { EStoryType } from 'facebook-story';

export const data = [
  {
    type: EStoryType.Text,
    content: JSON.stringify({
      background: '#faf',
      fontFamily: 'Arial',
      text: 'Hello world',
    }),
  },
  {
    type: EStoryType.Text,
    content: JSON.stringify({
      background: '#faf',
      fontFamily: 'Arial',
      text: "I'm Rikikudo",
    }),
  },
  {
    type: EStoryType.Image,
    content: JSON.stringify({
      objects: {
        version: '5.2.4',
        objects: [
          {
            type: 'image',
            version: '5.2.4',
            originX: 'left',
            originY: 'top',
            left: -187.13,
            top: 0,
            width: 1380,
            height: 614,
            fill: 'rgb(0,0,0)',
            stroke: null,
            strokeWidth: 0,
            strokeDashArray: null,
            strokeLineCap: 'butt',
            strokeDashOffset: 0,
            strokeLineJoin: 'miter',
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 0.49,
            scaleY: 0.49,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: '',
            fillRule: 'nonzero',
            paintFirst: 'fill',
            globalCompositeOperation: 'source-over',
            skewX: 0,
            skewY: 0,
            cropX: 0,
            cropY: 0,
            src: 'https://img.freepik.com/free-vector/asian-rice-field-terraces-morning-mountains-landscape-paddy-plantation-cascades-farm-mount-water-channel-with-growing-plants-scenery-meadow-with-green-grass-cartoon-vector-illustration_107791-10452.jpg?w=1380&t=st=1665631231~exp=1665631831~hmac=30067ea2a18dfda2f6f0703c50b97d11a6ffd93e15fc70f5f43f480ec55007a5',
            crossOrigin: null,
            filters: [],
          },
          {
            type: 'textbox',
            version: '5.2.4',
            originX: 'left',
            originY: 'top',
            left: 112,
            top: 89,
            width: 108.95,
            height: 48.82,
            fill: '#000',
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: 'butt',
            strokeDashOffset: 0,
            strokeLineJoin: 'miter',
            strokeUniform: false,
            strokeMiterLimit: 4,
            scaleX: 1,
            scaleY: 1,
            angle: 0,
            flipX: false,
            flipY: false,
            opacity: 1,
            shadow: null,
            visible: true,
            backgroundColor: '',
            fillRule: 'nonzero',
            paintFirst: 'fill',
            globalCompositeOperation: 'source-over',
            skewX: 0,
            skewY: 0,
            fontFamily: 'Arial',
            fontWeight: 'normal',
            fontSize: 20,
            text: 'Type something...',
            underline: false,
            overline: false,
            linethrough: false,
            textAlign: 'left',
            fontStyle: 'normal',
            lineHeight: 1.16,
            textBackgroundColor: '',
            charSpacing: 0,
            styles: [],
            direction: 'ltr',
            path: null,
            pathStartOffset: 0,
            pathSide: 'left',
            pathAlign: 'baseline',
            minWidth: 20,
            splitByGrapheme: false,
          },
        ],
      },
      width: 300,
      height: 300,
    }),
  },
];
