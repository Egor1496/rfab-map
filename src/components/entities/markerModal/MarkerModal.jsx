import sass from './markerModal.module.sass'

import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { getBossList, getPrizeList, getPrizeIcon, getSecondDescription, getTasks } from './markerModal.util';

import { gS } from '../../../scripts/global/paramsGlobal'
import { getPosModalMarker } from '../../../scripts/map/transforms/getPosModalMarker';

export const MarkerModal = () => {
  const ref = useRef();

  const modalVisible = useSelector((state) => state.modalVisibleReducer).markerInfoMV;
  const keyPress = useSelector((state) => state.eventsReducer).keyPress;

  const initModModal = Boolean(Number(localStorage.getItem("rfab-map-modModal") || "1"));
  const [modeModal, setModeModal] = useState(initModModal);

  if (ref.current)
    ref.current.style.display = "none";

  setTimeout(() => {
    if (ref.current && gS.markerInfo.oImg) {
      ref.current.style.display = "block";

      const [mTop, mLeft] = getPosModalMarker(
        ref.current.offsetWidth,
        ref.current.offsetHeight,
        gS.markerInfo.oImg
      );

      ref.current.style.top = mTop + "px";
      ref.current.style.left = mLeft + "px";
    }
  }, 0);

  return modalVisible && <div
    ref={ref}
    className={`${sass.markerModal} ${gS.markerInfo.md ? sass[gS.markerInfo.md] : sass.sm}`}
  >
    <div className={sass.header}>
      <div className={`${sass.ctrl} ${keyPress === "ControlLeft" ? sass.active : ""}`}>ctrl</div>
      <div className={sass.modeModal}>
        {
          modeModal ?
            <div
              className={`${sass.icon} ${sass.minus}`}
              onClick={() => { setModeModal(false); localStorage.setItem("rfab-map-modModal", "0"); }}
            >—</div>
            :
            <div
              className={`${sass.icon} ${sass.pluse}`}
              onClick={() => { setModeModal(true); localStorage.setItem("rfab-map-modModal", "1"); }}
            >+</div>
        }
      </div>
    </div>

    <div className={sass.modalContent}>
      <div className={sass.title} dangerouslySetInnerHTML={{ __html: gS.markerInfo.title }} />
      {modeModal && <div className={sass.taskList} dangerouslySetInnerHTML={{ __html: getTasks(gS.markerInfo.taskList) }} />}
      <div className={sass.description} dangerouslySetInnerHTML={{ __html: gS.markerInfo.description }} />
      <div className={sass.bossList} dangerouslySetInnerHTML={{ __html: getBossList(gS.markerInfo.bossList, modeModal) }} />
      {modeModal && <div className={sass.prizeList} dangerouslySetInnerHTML={{ __html: getPrizeList(gS.markerInfo.prizeList) }} />}
    </div>
    {modeModal && <div className={sass.footer}> {getPrizeIcon(gS.markerInfo.prizeIcon, sass)} </div>}
  </div>

}