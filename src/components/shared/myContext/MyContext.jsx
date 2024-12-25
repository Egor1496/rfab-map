import { pM } from '../../../scripts/map/paramsMap';
import sass from './myContext.module.sass'

import { ContextMenu } from 'primereact/contextmenu';

export const MyContext = ({ items, cRef }) => {
  return <ContextMenu
    className={sass.myContext}
    model={items}
    ref={cRef}
    onShow={() => { pM.isContextShow = true; }}
    onClose={() => { pM.isContextShow = false; }}
    onMouseMove={(e) => { }}
    onMouseLeave={(e) => { cRef.current.hide(e) }}
  />
}