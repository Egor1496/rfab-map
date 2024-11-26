import sass from './myFloatTooltip.module.sass'

import { useRef } from 'react';
import { useSelector } from 'react-redux'

import { store } from "../../../store/store"

export const MyFloatTooltip = ({ children, isMode = false }) => {
  const ref = useRef(null);

  const pos = store.getState().floatTooltipReducer.floatTooltipPos;

  const toggleModeInfo = useSelector((state) => state.settingsReducer).toggleModeInfo;

  setTimeout(() => {
    if (ref.current) {
      if (pos + ref.current.offsetHeight > document.documentElement.clientHeight)
        ref.current.style.top = (document.documentElement.clientHeight - ref.current.offsetHeight - 5) + "px";
      else
        ref.current.style.top = pos + "px";

      ref.current.style.opacity = 1;
    }
  }, 0);

  return (
    <div
      ref={ref}
      className={sass.myFloatTooltip}
      style={{ left: 188 }}
    >
      <div className={sass.content}>
        {
          isMode &&
          <div className={sass.header}>
            <div className={`${sass.ctrl} ${!toggleModeInfo ? sass.active : ""}`}>ctrl</div>
            <div className={`${sass.modeModal} ${!toggleModeInfo ? sass.warning : ""}`}>
              {
                toggleModeInfo ?
                  <div className={`${sass.icon} ${sass.minus}`}>—</div>
                  :
                  <div className={`${sass.icon} ${sass.pluse}`}>+</div>
              }
            </div>
          </div>
        }
        {children}
      </div>
    </div>
  )
}