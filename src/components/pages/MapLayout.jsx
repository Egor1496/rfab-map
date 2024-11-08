import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MyModal } from "../shared/myModal/MyModal";

import { LoadPath } from "../entities/loadPath/LoadPath";
import { CreateNewPath } from "../entities/createNewPath/CreateNewPath";
import { MarkerModal } from "../entities/markerModal/MarkerModal";

import { MyFloatTooltip } from "../shared/myFloatTooltip/MyFloatTooltip";
import { BossTooltip } from "../entities/bossTooltip/BossTooltip";
import { TassTooltip } from "../entities/tassTooltip/TassTooltip";

import { LoadMV } from "../../store/slice/modalVisible.slice";

export const MapLayout = () => {
  const selectVisible = useSelector((state) => state.modalVisibleReducer).LoadMV;
  const visibleB = useSelector((state) => state.floatTooltipReducer).floatTooltipMVB;
  const visibleT = useSelector((state) => state.floatTooltipReducer).floatTooltipMVT;

  const dispatch = useDispatch();

  return (
    <>
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
    </>
  )
}