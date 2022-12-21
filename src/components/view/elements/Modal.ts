import { setChildren } from 'redom';

class Modal {
  protected modalWrap = document.querySelector('.modal') as HTMLElement;
  private activeClass = 'modal--active';
  render(content: HTMLElement) {
    this.modalWrap.addEventListener('click', (e) => this.close(e));
    setChildren(this.modalWrap, [content]);
    return this;
  }

  show() {
    document.body.style.overflow = 'hidden';
    this.modalWrap.classList.add(this.activeClass);
  }

  close(e?: Event) {
    const target = e?.target as HTMLElement;
    if (!e || target.classList.contains('modal') || target.classList.contains('modal__close')) {
      document.body.style.overflow = 'auto';
      this.modalWrap.classList.remove(this.activeClass);
    }
  }
}

export default Modal;
