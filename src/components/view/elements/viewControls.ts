import { el } from 'redom';
import View2 from '../../../assets/images/icons/view2.svg';
import View3 from '../../../assets/images/icons/view3.svg';
import View4 from '../../../assets/images/icons/view4.svg';

export const viewControls = el('.view-controls', [
  el('button.view-controls__btn', el('img', { src: View2 })),
  el('button.view-controls__btn', el('img', { src: View3 })),
  el('button.view-controls__btn', el('img', { src: View4 })),
]);
