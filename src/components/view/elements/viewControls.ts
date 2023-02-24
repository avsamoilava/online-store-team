import { el } from 'redom';
import View2 from '../../../assets/images/icons/view2.svg';
import View3 from '../../../assets/images/icons/view3.svg';
import View4 from '../../../assets/images/icons/view4.svg';
import { getParams, setQueryString } from '../../utils';

export const viewControls = (fn: (n: number) => void) => {
  const disabledClass = 'view-controls__btn--disabled';
  const buttons = [
    el('button.view-controls__btn#2', el('img', { src: View2 })),
    el('button.view-controls__btn.view-controls__btn--disabled#3', el('img', { src: View3 })),
    el('button.view-controls__btn#4', el('img', { src: View4 })),
  ];
  const addClass = (n: number) => {
    controls.querySelector(`.${disabledClass}`)?.classList.remove(disabledClass);
    buttons[n - 2].classList.add(disabledClass);
  };
  const controls = el('.view-controls', { onclick: handleClick }, [
    buttons[0],
    buttons[1],
    buttons[2],
  ]);
  const previousView = getParams().view;
  if (previousView) {
    addClass(+previousView);
    fn(+previousView);
  }
  function handleClick(e: Event) {
    const element = e.target as HTMLElement;
    if (!element.classList.contains('view-controls__btn')) return;
    const columnsCount = Number(element.id);
    addClass(columnsCount);
    setQueryString('view', `${columnsCount}`);
    fn(columnsCount);
  }
  return controls;
};
