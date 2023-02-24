import { el, svg } from 'redom';

export const copyBtnEl = () => {
  const path1 =
    'M502.6 70.63l-61.25-61.25C435.4 3.371 427.2 0 418.7 0H255.1c-35.35 0-64 28.66-64 64l.0195 256C192 355.4 220.7 384 256 384h192c35.2 0 64-28.8 64-64V93.25C512 84.77 508.6 76.63 502.6 70.63zM464 320c0 8.836-7.164 16-16 16H255.1c-8.838 0-16-7.164-16-16L239.1 64.13c0-8.836 7.164-16 16-16h128L384 96c0 17.67 14.33 32 32 32h47.1V320zM272 448c0 8.836-7.164 16-16 16H63.1c-8.838 0-16-7.164-16-16L47.98 192.1c0-8.836 7.164-16 16-16H160V128H63.99c-35.35 0-64 28.65-64 64l.0098 256C.002 483.3 28.66 512 64 512h192c35.2 0 64-28.8 64-64v-32h-47.1L272 448z';
  const path2 =
    'M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z';
  const childSVG = svg('path', { d: path1 });
  const copyBtn = el('button.btn.copy-btn', [
    svg(
      'svg',
      {
        fill: '#6E9C9F',
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 512 512',
      },
      [childSVG]
    ),
  ]);
  const copy = () => {
    navigator.clipboard.writeText(location.href);
    childSVG.setAttribute('d', path2);
    copyBtn.classList.add('copy-btn--active');
    setTimeout(() => {
      copyBtn.classList.remove('copy-btn--active');
      childSVG.setAttribute('d', path1);
    }, 3000);
  };
  copyBtn.addEventListener('click', copy);
  return copyBtn;
};
