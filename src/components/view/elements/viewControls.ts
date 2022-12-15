import { el } from 'redom';
import View2 from '../../../assets/images/icons/view2.svg';
import View3 from '../../../assets/images/icons/view3.svg';
import View4 from '../../../assets/images/icons/view4.svg';

export const viewControls = (fn: (n: number) => void) => {
  const controls: HTMLElement = el('.view-controls', { onclick: handleClick }, [
    el('button.view-controls__btn#2', el('img', { src: View2 })),
    el('button.view-controls__btn.view-controls__btn--disabled#3', el('img', { src: View3 })),
    el('button.view-controls__btn#4', el('img', { src: View4 })),
  ]);
  function handleClick(e: Event) {
    const element = e.target as HTMLElement;
    if (!element.classList.contains('view-controls__btn')) return;
    const columnsCount = Number(element.id);
    const disabledClass = 'view-controls__btn--disabled';
    controls.querySelector(`.${disabledClass}`)?.classList.remove(disabledClass);
    element.classList.add(disabledClass);

    fn(columnsCount);
  }
  return controls;
};
