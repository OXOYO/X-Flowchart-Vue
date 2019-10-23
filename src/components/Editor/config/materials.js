/**
 * Created by OXOYO on 2019/7/11.
 *
 * 物料数据
 */

/*
// FIXME 锚点、图形控制坐标系
(0, 0) ---------- (0.5, 0) ---------- (1, 0)
|                                          |
|                                          |
|                                          |
(0, 0.5)                            (1, 0.5)
|                                          |
|                                          |
|                                          |
(0, 1) ---------- (0.5, 1) ---------- (1, 1)
*/

const shapeControl = {
  // 控制器
  controllers: [
    [0, 0, 'nwse-resize'],
    [0, 0.5, 'ew-resize'],
    [0, 1, 'nesw-resize'],
    [0.5, 0, 'ns-resize'],
    [0.5, 1, 'ns-resize'],
    [1, 0, 'nesw-resize'],
    [1, 0.5, 'ew-resize'],
    [1, 1, 'nwse-resize']
  ],
  // 旋转
  rotate: true
}

// 锚点坐标
const anchorPoints = [
  [0.25, 0],
  [0.5, 0],
  [0.75, 0],
  [0.25, 1],
  [0.5, 1],
  [0.75, 1],
  [0, 0.25],
  [0, 0.5],
  [0, 0.75],
  [1, 0.25],
  [1, 0.5],
  [1, 0.75]
]

export default [
  {
    name: 'general',
    label: 'General',
    lang: 'L10301',
    icon: '',
    enable: true,
    children: [
      {
        shape: 'rectangle',
        label: 'Rectangle',
        enable: true,
        width: 80,
        height: 40,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
      },
      {
        shape: 'rounded-rectangle',
        label: 'Rounded Rectangle',
        enable: true,
        width: 80,
        height: 40,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" rx="2.16" ry="2.16" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
      },
      {
        shape: 'text',
        label: 'Text',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="0.73" y="7.3" width="29.2" height="14.6" fill="none" stroke="white" pointer-events="stroke" visibility="hidden" stroke-width="9"></rect><rect x="0.73" y="7.3" width="29.2" height="14.6" fill="none" stroke="none" pointer-events="all"></rect></g><g style=""><g transform="translate(7,10)scale(0.73)"><foreignObject style="overflow:visible;" pointer-events="all" width="22" height="12"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; width: 24px; white-space: normal; overflow-wrap: normal; text-align: center;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;white-space:normal;">Text</div></div></foreignObject></g></g></g><g></g><g></g></g>`
      },
      {
        shape: 'textbox',
        label: 'Textbox',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.65" y="6.6" width="28.5" height="18" fill="none" stroke="white" pointer-events="stroke" visibility="hidden" stroke-width="9"></rect><rect x="1.65" y="6.6" width="28.5" height="18" fill="none" stroke="none" pointer-events="all"></rect></g><g style=""><g transform="translate(2,5)scale(0.15)"><foreignObject style="overflow:visible;" pointer-events="all" width="180" height="126"><div style="display: inline-block; font-size: 12px; font-family: Helvetica; color: rgb(0, 0, 0); line-height: 1.2; vertical-align: top; overflow: hidden; max-height: 130px; max-width: 180px; width: 181px; white-space: normal; overflow-wrap: normal; text-align: left;"><div xmlns="http://www.w3.org/1999/xhtml" style="display:inline-block;text-align:inherit;text-decoration:inherit;white-space:normal;"><h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div></div></foreignObject></g></g></g><g></g><g></g></g>`
      },
      {
        shape: 'ellipse',
        label: 'Ellipse',
        enable: true,
        width: 80,
        height: 40,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.84" cy="14.88" rx="14.399999999999999" ry="9.6" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>`
      },
      {
        shape: 'square',
        label: 'Square',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2.38" y="1.36" width="27.2" height="27.2" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
      },
      {
        shape: 'circle',
        label: 'Circle',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.98" cy="14.96" rx="13.600000000000001" ry="13.600000000000001" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse></g></g><g></g><g></g></g>`
      },
      {
        shape: 'process',
        label: 'Process',
        enable: true,
        width: 80,
        height: 40,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="1.44" y="7.68" width="28.8" height="14.4" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 4.32 7.68 L 4.32 22.08 M 27.36 7.68 L 27.36 22.08" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'diamond',
        label: 'Diamond',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 15.98 1.36 L 29.58 14.96 L 15.98 28.56 L 2.38 14.96 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'parallelogram',
        label: 'Parallelogram',
        enable: true,
        width: 80,
        height: 40,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 22.08 L 7.2 7.68 L 30.24 7.68 L 24.48 22.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'hexagon',
        label: 'Hexagon',
        enable: true,
        width: 80,
        height: 40,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.64 5.28 L 23.04 5.28 L 30.24 14.88 L 23.04 24.48 L 8.64 24.48 L 1.44 14.88 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'triangle',
        label: 'Triangle',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 L 26.18 14.96 L 5.78 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'cylinder',
        label: 'Cylinder',
        enable: true,
        width: 40,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 6.8 C 5.78 -0.45 26.18 -0.45 26.18 6.8 L 26.18 23.12 C 26.18 30.37 5.78 30.37 5.78 23.12 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 5.78 6.8 C 5.78 12.24 26.18 12.24 26.18 6.8" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'cloud',
        label: 'Cloud',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.64 10.08 C 2.88 10.08 1.44 14.88 6.05 15.84 C 1.44 17.95 6.62 22.56 10.37 20.64 C 12.96 24.48 21.6 24.48 24.48 20.64 C 30.24 20.64 30.24 16.8 26.64 14.88 C 30.24 11.04 24.48 7.2 19.44 9.12 C 15.84 6.24 10.08 6.24 8.64 10.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'document',
        label: 'Document',
        enable: true,
        width: 80,
        height: 60,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 30.24 5.28 L 30.24 21.6 Q 23.04 16.42 15.84 21.6 Q 8.64 26.78 1.44 21.6 L 1.44 8.16 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'internal-storage',
        label: 'Internal Storage',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><rect x="2.38" y="1.36" width="27.2" height="27.2" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><path d="M 2.38 8.16 L 29.58 8.16" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 2.38 8.16 L 29.58 8.16" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 9.18 1.36 L 9.18 28.56" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 9.18 1.36 L 9.18 28.56" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'cube',
        label: 'Cube',
        enable: true,
        width: 80,
        height: 60,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 10.08 L 30.24 24.48 L 6.24 24.48 L 1.44 19.68 L 1.44 5.28 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 10.08 L 6.24 10.08 Z" fill-opacity="0.05" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 1.44 5.28 L 6.24 10.08 L 6.24 24.48 L 1.44 19.68 Z" fill-opacity="0.1" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 6.24 24.48 L 6.24 10.08 L 1.44 5.28 M 6.24 10.08 L 30.24 10.08" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'step',
        label: 'Step',
        enable: true,
        width: 80,
        height: 60,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 25.44 5.28 L 30.24 14.88 L 25.44 24.48 L 1.44 24.48 L 6.24 14.88 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'trapezoid',
        label: 'Trapezoid',
        enable: true,
        width: 80,
        height: 40,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 22.08 L 7.2 7.68 L 24.48 7.68 L 30.24 22.08 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'tape',
        label: 'Tape',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 7.68 Q 8.64 16.32 15.84 7.68 Q 23.04 -0.96 30.24 7.68 L 30.24 22.08 Q 23.04 13.44 15.84 22.08 Q 8.64 30.72 1.44 22.08 L 1.44 7.68 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'note',
        label: 'Note',
        enable: true,
        width: 60,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.13 1.35 L 18.63 1.35 L 26.73 9.45 L 26.73 28.35 L 5.13 28.35 L 5.13 1.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><path d="M 18.63 1.35 L 18.63 9.45 L 26.73 9.45 Z" fill-opacity="0.05" fill="#000000" stroke="none" pointer-events="all"></path><path d="M 18.63 1.35 L 18.63 9.45 L 26.73 9.45" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'card',
        label: 'Card',
        enable: true,
        width: 60,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.23 1.35 L 26.73 1.35 L 26.73 28.35 L 5.13 28.35 L 5.13 9.45 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'callout',
        label: 'Callout',
        enable: true,
        width: 80,
        height: 60,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.44 5.28 L 30.24 5.28 L 30.24 17.28 L 20.64 17.28 L 15.84 24.48 L 15.84 17.28 L 1.44 17.28 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'actor',
        label: 'Actor',
        enable: true,
        width: 60,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><ellipse cx="15.75" cy="4.73" rx="3.375" ry="3.375" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></ellipse><path d="M 15.75 8.1 L 15.75 19.35 M 15.75 10.35 L 9 10.35 M 15.75 10.35 L 22.5 10.35 M 15.75 19.35 L 9 28.35 M 15.75 19.35 L 22.5 28.35" fill="none" stroke="white" stroke-width="9.3" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 15.75 8.1 L 15.75 19.35 M 15.75 10.35 L 9 10.35 M 15.75 10.35 L 22.5 10.35 M 15.75 19.35 L 9 28.35 M 15.75 19.35 L 22.5 28.35" fill="none" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'or',
        label: 'Or',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 Q 26.18 1.36 26.18 14.96 Q 26.18 28.56 5.78 28.56 Q 15.98 14.96 5.78 1.36 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'and',
        label: 'And',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.78 1.36 Q 26.18 1.36 26.18 14.96 Q 26.18 28.56 5.78 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'data-storage',
        label: 'Data Storage',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 20,
        minHeight: 20,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 4.35 3.19 L 30.45 3.19 Q 24.65 14.79 30.45 26.39 L 4.35 26.39 Q -1.45 14.79 4.35 3.19 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      }
    ]
  },
  {
    name: 'miscellaneous',
    label: 'Miscellaneous',
    lang: 'L10302',
    icon: '',
    enable: false,
    children: []
  },
  {
    name: 'advanced',
    label: 'Advanced',
    lang: 'L10303',
    icon: '',
    enable: false,
    children: []
  },
  {
    name: 'basic',
    label: 'Basic',
    lang: 'L10304',
    icon: '',
    enable: false,
    children: []
  },
  {
    name: 'arrow',
    label: 'Arrow',
    lang: 'L10305',
    icon: '',
    enable: false,
    children: []
  },
  {
    name: 'UML',
    label: 'UML',
    lang: 'L10306',
    icon: '',
    enable: false,
    children: []
  },
  {
    name: 'BPMN-General',
    label: 'BPMN General',
    lang: 'L10307',
    icon: '',
    enable: false,
    children: []
  },
  {
    name: 'flowchart',
    label: 'Flowchart',
    lang: 'L10308',
    icon: '',
    enable: false,
    children: []
  },
  {
    name: 'clipart',
    label: 'Clipart',
    lang: 'L10309',
    icon: '',
    enable: false,
    children: []
  }
]
