import sass from './mapLayout.module.sass'

import { useRef } from 'react';

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { pM } from '../../scripts/map/paramsMap';

import { MyModal } from "../shared/myModal/MyModal";
import { MyContext } from '../shared/myContext/MyContext';
import { MyFloatTooltip } from "../shared/myFloatTooltip/MyFloatTooltip";
import { BossTooltip } from "../entities/bossTooltip/BossTooltip";
// import { TassTooltip } from "../entities/tassTooltip/TassTooltip";

import { LoadPath } from "../entities/loadPath/LoadPath";
import { CreateNewPath } from "../entities/createNewPath/CreateNewPath";
import { MarkerModal } from "../entities/markerModal/MarkerModal";

import { LoadMV, markerInfoMV } from "../../store/slice/modalVisible.slice";
import { contextCoppy } from '../../scripts/map/contextCoppy';
import { Garland } from '../entities/garland/Garland';

export const MapLayout = () => {
  const rMap = useRef(null);
  const rMarker = useRef(null);

  const selectVisible = useSelector((state) => state.modalVisibleReducer).LoadMV;
  const visibleB = useSelector((state) => state.floatTooltipReducer).floatTooltipMVB;
  // const visibleT = useSelector((state) => state.floatTooltipReducer).floatTooltipMVT;

  const dispatch = useDispatch();

  const itemsCtxMap = [
    { label: "Координаты", command: () => { contextCoppy("coordMap"); } },
    { label: "Новая метка", command: () => { contextCoppy("newMarker"); } }
  ];

  const itemsCtxMarker = [
    { label: "id", command: () => { contextCoppy("id"); } },
    { label: "Координаты", command: () => { contextCoppy("coordMarker"); } },
    { label: "Иконка", command: () => { contextCoppy("icon"); } },
    { label: "Вся метка", command: () => { contextCoppy("obj"); } }
  ];

  return (
    <main className={sass.main}
      onContextMenu={(e) => {
        dispatch(markerInfoMV(false));

        if (pM.isMouseoverMarker) {
          rMarker.current.hide();
          rMap.current.show(e);
        }
        else {
          rMap.current.hide();
          rMarker.current.show(e);
        }
      }}
    >
      <Garland />

      <Outlet />

      <MarkerModal />

      <CreateNewPath />

      {
        visibleB &&
        <MyFloatTooltip isMode>
          <BossTooltip />
        </MyFloatTooltip>
      }

      {/* {
        visibleT &&
        <MyFloatTooltip>
          <TassTooltip />
        </MyFloatTooltip>
      } */}

      <MyModal
        title="Загрузить маршруты"
        selectVisible={selectVisible}
        dispatchVisible={(is) => dispatch(LoadMV(is))}
      >
        <LoadPath />
      </MyModal>

      <MyContext cRef={rMap} items={itemsCtxMap} />
      <MyContext cRef={rMarker} items={itemsCtxMarker} />
    </main >
  )
}