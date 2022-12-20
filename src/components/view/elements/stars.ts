import { el, svg } from 'redom';
export const stars = (rating: number) =>
  el('.stars', [
    svg(
      'svg',
      { viewBox: '0 0 1807 321' },
      svg('path', { fill: '#fff', d: 'M1167 321h207l-104-55-103 55z' }),
      svg('path', { fill: '#fff', d: 'M1534 321h207l-104-55-103 55z' }),
      svg('path', {
        fill: '#fff',
        d:
          'M117 106L169 1l52 105 117 17-84 82 19 116h159l20-116-84-82 116-17L536 1l52 105 117 17-84 82 19 116h159l20-116-84-82 116-17L903 1l52 105 117 17-84 82 19 116h159l20-116-84-82 116-17 52-105 52 105 117 17-84 82 19 116h159l20-116-84-82 116-17 52-105 52 105 116 17V1H1v122l116-17z',
      }),
      svg('path', { fill: '#fff', d: 'M800 321h207l-104-55-103 55z' }),
      svg('path', { fill: '#fff', d: 'M85 205L1 123v198h64l20-116z' }),
      svg('path', { fill: '#fff', d: 'M1722 205l19 116h64V123l-83 82z' }),
      svg('path', { fill: '#fff', d: 'M433 321h207l-104-55-103 55z' }),
      svg('path', { fill: '#fff', d: 'M66 321h207l-104-55-103 55z' }),

      svg('path', {
        fill: 'none',
        stroke: '#a78200',
        'stroke-width': '4',
        d: 'M1637 6l51 102 113 16-82 80 20 112-102-53-101 53 19-112-82-80 114-16 50-102z',
      }),
      svg('path', {
        fill: 'none',
        stroke: '#a78200',
        'stroke-width': '4',
        d: 'M1270 6l51 102 113 17-82 79 20 112-102-53-101 53 19-112-82-79 114-17 50-102z',
      }),
      svg('path', {
        fill: 'none',
        stroke: '#a78200',
        'stroke-width': '4',
        d: 'M903 6l51 103 113 16-82 79 20 113-102-53-101 53 19-113-82-79 114-16L903 6z',
      }),
      svg('path', {
        fill: 'none',
        stroke: '#a78200',
        'stroke-width': '4',
        d: 'M536 7l51 102 113 16-82 80 20 112-102-53-101 53 19-112-82-80 114-16L536 7z',
      }),
      svg('path', {
        fill: 'none',
        stroke: '#a78200',
        'stroke-width': '4',
        d: 'M169 6l51 102 113 16-82 80 20 112-102-53-101 53 19-112-82-80 114-16L169 6z',
      })
    ),
    el('progress', { min: 0, max: 5, value: rating }),
  ]);
