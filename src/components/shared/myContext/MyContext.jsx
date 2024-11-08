import sass from './myContext.module.sass'

import { ContextMenu } from 'primereact/contextmenu';

export const MyContext = ({ items, cRef }) => {
  let timerHide;

  return <ContextMenu
    className={sass.myContext}
    model={items}
    ref={cRef}
    onShow={() => { clearTimeout(timerHide); }}
    onMouseLeave={(e) => {
      timerHide = setTimeout(() => {
        if (cRef.current)
          cRef.current.hide(e)
      }, 500);
    }}
  />
}