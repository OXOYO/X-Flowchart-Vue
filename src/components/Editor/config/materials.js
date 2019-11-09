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
      },
      {
        shape: 'bidirectional-arrow',
        label: 'Bidirectional Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.73 22.96 L 15.81 27.04 L 2.39 28.41 L 3.76 14.99 L 7.84 19.07 L 20.17 6.74 L 16.09 2.66 L 29.51 1.29 L 28.14 14.71 L 24.06 10.63 Z" fill="none" stroke="white" stroke-width="9.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 11.73 22.96 L 15.81 27.04 L 2.39 28.41 L 3.76 14.99 L 7.84 19.07 L 20.17 6.74 L 16.09 2.66 L 29.51 1.29 L 28.14 14.71 L 24.06 10.63 Z" fill="none" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'arrow',
        label: 'Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 5.66 28.69 L 1.99 25.02 L 20.63 6.37 L 16.77 2.51 L 29.46 1.22 L 28.17 13.91 L 24.31 10.05 Z" fill="none" stroke="white" stroke-width="9.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="stroke" visibility="hidden"></path><path d="M 5.66 28.69 L 1.99 25.02 L 20.63 6.37 L 16.77 2.51 L 29.46 1.22 L 28.17 13.91 L 24.31 10.05 Z" fill="none" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      }
    ]
  },
  {
    name: 'miscellaneous',
    label: 'Miscellaneous',
    lang: 'L10302',
    icon: '',
    enable: true,
    children: []
  },
  {
    name: 'advanced',
    label: 'Advanced',
    lang: 'L10303',
    icon: '',
    enable: true,
    children: []
  },
  {
    name: 'basic',
    label: 'Basic',
    lang: 'L10304',
    icon: '',
    enable: true,
    children: []
  },
  {
    name: 'arrow',
    label: 'Arrow',
    lang: 'L10305',
    icon: '',
    enable: true,
    children: [
      {
        shape: 'arrow-down',
        label: 'Arrow Down',
        enable: true,
        width: 60,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 1.4 L 11.76 17.84 L 6.16 17.84 L 15.96 28.56 L 25.76 17.84 L 20.16 17.84 L 20.16 1.4 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'arrow-left',
        label: 'Arrow Left',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 10.5 L 12.69 10.5 L 12.69 4.5 L 1.2 15 L 12.69 25.5 L 12.69 19.5 L 30.3 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'arrow-right',
        label: 'Arrow Right',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 10.5 L 18.81 10.5 L 18.81 4.5 L 30.3 15 L 18.81 25.5 L 18.81 19.5 L 1.2 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'arrow-up',
        label: 'Arrow Up',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 28.56 L 11.76 12.12 L 6.16 12.12 L 15.96 1.4 L 25.76 12.12 L 20.16 12.12 L 20.16 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'bent-left-arrow',
        label: 'Bent Left Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 21.28 28.56 L 21.28 14.84 C 21.28 14.07 20.65 13.44 19.88 13.44 L 12.88 13.44 L 12.88 17.08 L 2.24 9.24 L 12.88 1.4 L 12.88 5.04 L 19.88 5.04 C 25.18 5.19 29.4 9.54 29.4 14.84 L 29.4 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'bent-right-arrow',
        label: 'Bent Right Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 10.36 28.56 L 10.36 14.84 C 10.36 14.07 10.99 13.44 11.76 13.44 L 18.76 13.44 L 18.76 17.08 L 29.4 9.24 L 18.76 1.4 L 18.76 5.04 L 11.76 5.04 C 6.46 5.19 2.24 9.54 2.24 14.84 L 2.24 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'bent-up-arrow',
        label: 'Bent Up Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 18.35 L 17.4 18.35 L 17.4 9.41 L 13.8 9.41 L 21.9 2.4 L 30.3 9.41 L 26.4 9.41 L 26.4 27.3 L 1.2 27.3 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'callout-double-arrow',
        label: 'Callout Double Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.16 8.09 L 13.16 6.69 L 10.64 6.69 L 15.96 1.4 L 21.28 6.69 L 18.76 6.69 L 18.76 8.09 L 22.96 8.09 L 22.96 22.01 L 18.76 22.01 L 18.76 23.41 L 21.28 23.41 L 15.96 28.56 L 10.64 23.41 L 13.16 23.41 L 13.16 22.01 L 8.96 22.01 L 8.96 8.09 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'callout-quad-arrow',
        label: 'Callout Auad Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.02 7.98 L 13.02 6.58 L 10.5 6.58 L 15.82 1.4 L 21.14 6.58 L 18.62 6.58 L 18.62 7.98 L 22.82 7.98 L 22.82 12.18 L 24.22 12.18 L 24.22 9.66 L 29.4 14.98 L 24.22 20.3 L 24.22 17.78 L 22.82 17.78 L 22.82 21.98 L 18.62 21.98 L 18.62 23.38 L 21.14 23.38 L 15.82 28.56 L 10.5 23.38 L 13.02 23.38 L 13.02 21.98 L 8.82 21.98 L 8.82 17.78 L 7.42 17.78 L 7.42 20.3 L 2.24 14.98 L 7.42 9.66 L 7.42 12.18 L 8.82 12.18 L 8.82 7.98 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'callout-up-arrow',
        label: 'Callout Up Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.16 12.04 L 13.16 6.44 L 10.64 6.44 L 15.96 1.12 L 21.28 6.44 L 18.76 6.44 L 18.76 12.04 L 24.36 12.04 L 24.36 28.56 L 7.56 28.56 L 7.56 12.04 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'chevron-arrow',
        label: 'Chevron Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 10.5 15 L 1.5 6 L 21.3 6 L 30.3 15 L 21.3 24 L 1.5 24 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'circular-arrow',
        label: 'Circular Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 17.75 C 1.2 10.43 7.18 4.5 14.55 4.5 C 21.92 4.5 27.9 10.43 27.9 17.75 L 30.3 17.75 L 24.3 25.2 L 18.3 17.75 L 20.7 17.75 C 20.7 14.38 17.95 11.65 14.55 11.65 C 11.15 11.65 8.4 14.38 8.4 17.75 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'jump-in-right-arrow',
        label: 'Jump-in Right Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.07 17.86 L 15.93 17.86 C 15.83 10.28 10.43 3.78 2.97 2.27 C 12.88 1.62 21.8 8.23 24.03 17.86 L 28.89 17.86 L 19.98 28.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'jump-in-left-arrow',
        label: 'Jump-in Left Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 20.79 17.86 L 15.93 17.86 C 16.03 10.28 21.43 3.78 28.89 2.27 C 18.98 1.62 10.06 8.23 7.83 17.86 L 2.97 17.86 L 11.88 28.35 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-linejoin="round" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'left-and-up-arrow',
        label: 'Left and Up Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 9.07 16.3 L 17.42 16.3 L 17.42 7.95 L 14.08 7.95 L 21.6 1.4 L 29.4 7.95 L 25.78 7.95 L 25.78 24.66 L 9.07 24.66 L 9.07 28.28 L 2.52 20.48 L 9.07 12.96 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'left-sharp-edged-head-arrow',
        label: 'Left Sharp Edged Head Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 12 L 6.72 12 L 10.3 6 L 6.72 6 L 1.2 15 L 6.72 24 L 10.3 24 L 6.72 18 L 30.3 18 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'notched-signal-in-arrow',
        label: 'Notched Signal-in Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.5 10.5 L 26.27 10.5 L 30.3 15 L 26.27 19.5 L 1.5 19.5 L 5.38 15 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'quad-arrow',
        label: 'Quad Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 13.1 12.26 L 13.1 6.69 L 10.6 6.69 L 15.89 1.4 L 21.18 6.69 L 18.68 6.69 L 18.68 12.26 L 24.25 12.26 L 24.25 9.76 L 29.4 15.05 L 24.25 20.34 L 24.25 17.84 L 18.68 17.84 L 18.68 23.41 L 21.18 23.41 L 15.89 28.56 L 10.6 23.41 L 13.1 23.41 L 13.1 17.84 L 7.53 17.84 L 7.53 20.34 L 2.24 15.05 L 7.53 9.76 L 7.53 12.26 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'right-notched-arrow',
        label: 'Right Notched Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.5 10.5 L 18.81 10.5 L 18.81 4.5 L 30.3 15 L 18.81 25.5 L 18.81 19.5 L 1.5 19.5 L 5.38 15 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'sharp-edged-arrow',
        label: 'Sharp Edged Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 12 L 6.72 12 L 9.41 7.5 L 6.72 6 L 1.2 15 L 6.72 24 L 9.41 22.5 L 6.72 18 L 30.3 18 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'signal-in-arrow',
        label: 'Signal-in Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.2 10.5 L 26.27 10.5 L 30.3 15 L 26.27 19.5 L 1.2 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'slender-left-arrow',
        label: 'Slender Left Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 12 L 6.72 12 L 6.72 6 L 1.2 15 L 6.72 24 L 6.72 18 L 30.3 18 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'slender-tow-way-arrow',
        label: 'Slender Two Way Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 24.63 12 L 6.72 12 L 6.72 6 L 1.2 15 L 6.72 24 L 6.72 18 L 24.63 18 L 24.63 24 L 30.3 15 L 24.63 6 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'slender-wide-tailed-arrow',
        label: 'Slender Wide Tailed Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 18.96 12 L 7.02 12 L 7.02 6 L 1.5 15 L 7.02 24 L 7.02 18 L 18.96 18 L 23.44 24 L 30.3 24 L 24.33 15 L 30.3 6 L 23.44 6 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'striped-arrow',
        label: 'Striped Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 8.36 10.5 L 18.81 10.5 L 18.81 4.5 L 30.3 15 L 18.81 25.5 L 18.81 19.5 L 8.36 19.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path><rect x="3.59" y="10.5" width="3.58" height="9" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect><rect x="1.2" y="10.5" width="1.19" height="9" fill="#ffffff" stroke="#000000" stroke-width="1.3" pointer-events="all"></rect></g></g><g></g><g></g></g>`
      },
      {
        shape: 'stylised-notched-arrow',
        label: 'Stylised Notched Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 1.5 7.5 L 21.79 12 L 18.81 6 L 30.3 15 L 18.81 24 L 21.79 19.5 L 1.5 22.5 L 5.38 15 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="8" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'triad-arrow',
        label: 'Triad Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 12.84 16.5 L 12.84 10.5 L 10.15 10.5 L 15.82 4.8 L 21.5 10.5 L 18.81 10.5 L 18.81 16.5 L 24.78 16.5 L 24.78 13.8 L 30.3 19.5 L 24.78 25.2 L 24.78 22.5 L 12.84 22.5 L 6.87 22.5 L 6.87 25.2 L 1.2 19.5 L 6.87 13.8 L 6.87 16.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'two-way-arrow-horizontal',
        label: 'Two Way Arrow Horizontal',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 20.4 10.5 L 20.4 6 L 30.3 15 L 20.4 24 L 20.4 19.5 L 11.4 19.5 L 11.4 24 L 1.5 15 L 11.4 6 L 11.4 10.5 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'two-way-arrow-vertical',
        label: 'Two Way Arrow Vertical',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 11.76 19.04 L 7.56 19.04 L 15.96 28.28 L 24.36 19.04 L 20.16 19.04 L 20.16 10.64 L 24.36 10.64 L 15.96 1.4 L 7.56 10.64 L 11.76 10.64 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'u-turn-arrow',
        label: 'U Turn Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 2.24 13.58 C 2.24 6.7 7.82 1.12 14.7 1.12 C 21.58 1.12 27.16 6.7 27.16 13.58 L 29.4 13.58 L 23.8 20.58 L 18.2 13.58 L 20.44 13.58 C 20.41 10.41 17.82 7.86 14.65 7.89 C 11.48 7.91 8.93 10.5 8.96 13.67 L 8.96 28.56 L 2.24 28.56 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'u-turn-down-arrow',
        label: 'U Turn Down Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 24.3 L 30.3 15.3 C 30.3 10 26 5.7 20.7 5.7 C 15.4 5.7 11.1 10 11.1 15.3 L 15 15.3 L 8.1 24.3 L 1.2 15.3 L 5.1 15.3 C 5.1 10 9.4 5.7 14.7 5.7 L 20.7 5.7 C 19.45 5.75 18.22 6.05 17.1 6.6 C 21.37 7.32 24.52 10.97 24.6 15.3 L 24.6 24.3 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'u-turn-left-arrow',
        label: 'U Turn Left Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 7.28 1.45 L 15.65 1.42 C 18.86 1.41 21.83 3.1 23.44 5.87 C 25.06 8.63 25.07 12.04 23.48 14.82 C 21.89 17.6 18.93 19.31 15.72 19.33 L 15.7 15.69 L 7.36 22.16 L 15.75 28.56 L 15.74 24.92 C 18.11 24.91 20.38 23.95 22.05 22.27 C 23.72 20.58 24.65 18.3 24.63 15.94 L 24.61 10.34 C 24.57 11.5 24.29 12.65 23.79 13.7 C 23.11 9.74 19.7 6.81 15.67 6.74 L 7.3 6.77 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'u-turn-right-arrow',
        label: 'U Turn Right Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 24.64 1.45 L 16.27 1.42 C 11.31 1.4 7.28 5.39 7.26 10.34 C 7.24 15.28 11.24 19.31 16.2 19.33 L 16.22 15.69 L 24.56 22.16 L 16.17 28.56 L 16.18 24.92 C 13.81 24.91 11.54 23.95 9.87 22.27 C 8.2 20.58 7.27 18.3 7.29 15.94 L 7.31 10.34 C 7.35 11.5 7.63 12.65 8.13 13.7 C 8.81 9.74 12.22 6.81 16.25 6.74 L 24.62 6.77 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      },
      {
        shape: 'u-turn-up-arrow',
        label: 'U Turn Up Arrow',
        enable: true,
        width: 80,
        height: 80,
        minWidth: 40,
        minHeight: 40,
        anchorPoints: anchorPoints,
        shapeControl: shapeControl,
        icon: `<g><g></g><g><g transform="translate(0.5,0.5)" style="visibility: visible;"><path d="M 30.3 5.7 L 30.3 14.7 C 30.3 20 26 24.3 20.7 24.3 C 15.4 24.3 11.1 20 11.1 14.7 L 15 14.7 L 8.1 5.7 L 1.2 14.7 L 5.1 14.7 C 5.1 20 9.4 24.3 14.7 24.3 L 20.7 24.3 C 19.45 24.25 18.22 23.95 17.1 23.4 C 21.37 22.68 24.52 19.03 24.6 14.7 L 24.6 5.7 Z" fill="#ffffff" stroke="#000000" stroke-width="1.3" stroke-miterlimit="10" pointer-events="all"></path></g></g><g></g><g></g></g>`
      }
    ]
  },
  {
    name: 'UML',
    label: 'UML',
    lang: 'L10306',
    icon: '',
    enable: true,
    children: []
  },
  {
    name: 'BPMN-General',
    label: 'BPMN General',
    lang: 'L10307',
    icon: '',
    enable: true,
    children: []
  },
  {
    name: 'flowchart',
    label: 'Flowchart',
    lang: 'L10308',
    icon: '',
    enable: true,
    children: []
  },
  {
    name: 'clipart',
    label: 'Clipart',
    lang: 'L10309',
    icon: '',
    enable: true,
    children: []
  }
]
