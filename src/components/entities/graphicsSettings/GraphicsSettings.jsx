import sass from './graphicsSettings.module.sass'

import { useDispatch, useSelector } from 'react-redux';
import { setFpsMap, setHdMap, setHdMarker } from '../../../store/slice/settings.slice';

import { pM } from '../../../scripts/map/paramsMap';

import { Slider } from "primereact/slider";
import { SelectButton } from 'primereact/selectbutton';

export const GraphicsSettings = () => {
  const slider = useSelector((state) => state.settingsReducer.fpsMap);
  const map = useSelector((state) => state.settingsReducer.hdMap);
  const icon = useSelector((state) => state.settingsReducer.hdMarker);

  const dispatch = useDispatch();

  return (
    <div className={sass.graphicsSettings}>
      <ul className={sass.list}>
        <li className={sass.listItem + " " + sass.slider}>
          <div className={sass.title}>{slider} FPS при передвижении:</div>

          <div className={sass.inputWrap}>
            <Slider step={10} max={100} min={10}
              value={slider}
              onChange={(e) => {
                dispatch(setFpsMap(e.value))
                pM.fpsMap = 1000 / e.value;

                clearInterval(pM.fpsInterval);
                pM.fpsInterval = setInterval(() => {
                  pM.isMove = true;
                }, pM.fpsMap);
              }}
            />
          </div>
        </li>

        <li className={sass.listItem}>
          <div className={sass.title}>Карты:</div>

          <div className={sass.inputWrap}>
            <SelectButton options={["sd", "hd"]}
              value={map}
              onChange={(e) => {
                dispatch(setHdMap(e.value))
                location.reload();
              }}
            />
          </div>
        </li>

        <li className={sass.listItem}>
          <div className={sass.title}>Локации:</div>

          <div className={sass.inputWrap}>
            <SelectButton options={["hd", "svg"]}
              value={icon}
              onChange={(e) => {
                dispatch(setHdMarker(e.value))
                location.reload();
              }} />
          </div>
        </li>
      </ul>
    </div>
  )
}