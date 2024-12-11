import sass from './markerModal.module.sass'

import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { pM } from '../../../scripts/map/paramsMap';

import { getBossList, getPrizeList, getPrizeIcon, getQuests } from './markerModal.util';

import { getPosModalMarker } from '../../../scripts/map/transforms/getPosModalMarker';

export const MarkerModal = () => {
  const ref = useRef();

  const modalVisible = useSelector((state) => state.modalVisibleReducer).markerInfoMV;

  const toggleModeInfo = useSelector((state) => state.settingsReducer).toggleModeInfo == "0" ?
    true : false;

  if (ref.current)
    ref.current.style.display = "none";

  setTimeout(() => {
    if (ref.current && pM.markerInfo.oImg) {
      ref.current.style.display = "block";

      const [mTop, mLeft] = getPosModalMarker(
        ref.current.offsetWidth,
        ref.current.offsetHeight,
        pM.markerInfo.oImg
      );

      ref.current.style.top = mTop + "px";
      ref.current.style.left = mLeft + "px";
    }
  }, 0);

  return (modalVisible && !pM.hasMoved) && <div
    ref={ref}
    className={`${sass.markerModal} ${pM.markerInfo.md ? sass[pM.markerInfo.md] : sass.sm}`}
  >
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

    <div className={sass.modalContent}>
      <div className={sass.title} dangerouslySetInnerHTML={{ __html: pM.markerInfo.title }} />

      <div className={sass.description} dangerouslySetInnerHTML={{ __html: pM.markerInfo.description }} />

      {toggleModeInfo && <div className={sass.description} dangerouslySetInnerHTML={{ __html: getQuests(pM.markerInfo.quests) }} />}

      <div className={sass.bossList} dangerouslySetInnerHTML={{ __html: getBossList(pM.markerInfo.bossList, toggleModeInfo) }} />

      {toggleModeInfo && <div className={sass.prizeList} dangerouslySetInnerHTML={{ __html: getPrizeList(pM.markerInfo.prizeList) }} />}

    </div>

    {toggleModeInfo && <div className={sass.footer}> {getPrizeIcon(pM.markerInfo.prizeIcon, sass)} </div>}
  </div>

}