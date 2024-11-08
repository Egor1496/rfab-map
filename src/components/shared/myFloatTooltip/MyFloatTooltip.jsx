import sass from './myFloatTooltip.module.sass'

import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { store } from "../../../store/store"
import { setModeModal } from '../../../store/slice/floatTooltip.slice';

export const MyFloatTooltip = ({ children, isMode = false, isVisible = false }) => {
  const ref = useRef(null);

  const modeModal = useSelector((state) => state.floatTooltipReducer).modeModal;

  const pos = store.getState().floatTooltipReducer.floatTooltipPos;

  const keyPress = useSelector((state) => state.eventsReducer).keyPress;

  const dispatch = useDispatch();

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
            <div className={`${sass.ctrl} ${keyPress === "ControlLeft" ? sass.active : ""}`}>ctrl</div>
            <div className={sass.modeModal}>
              {
                modeModal === "md" ?
                  <div
                    className={`${sass.icon} ${sass.minus}`}
                    onClick={() => {
                      dispatch(setModeModal("sm"));
                      localStorage.setItem("rfab-map-modFloatModal", "sm");
                    }}
                  >—</div>
                  :
                  <div
                    className={`${sass.icon} ${sass.pluse}`}
                    onClick={() => {
                      dispatch(setModeModal("md"));
                      localStorage.setItem("rfab-map-modFloatModal", "md");
                    }}
                  >+</div>
              }
            </div>
          </div>
        }
        {children}
      </div>
    </div>
  )
}