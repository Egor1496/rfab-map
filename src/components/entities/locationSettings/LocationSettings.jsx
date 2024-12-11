import sass from './locationSettings.module.sass'

import { useDispatch, useSelector } from 'react-redux';

import { setCleanDisplay, setFilterDisplay, setToggleModeInfo } from '../../../store/slice/settings.slice';

import { SelectButton } from 'primereact/selectbutton';

import { setVisibleMarkers } from '../../../scripts/map/transforms/setVisibleMarker';

export const LocationSettings = () => {
  const mode = useSelector((state) => state.settingsReducer.toggleModeInfo);
  const filter = useSelector((state) => state.settingsReducer.filterDisplayMode);
  const clean = useSelector((state) => state.settingsReducer.cleanDisplayMode);

  const disapatch = useDispatch();

  const modeInfoTemplate = (option) =>
    <div className={sass.pButtonLabel}>{option === "0" ? "Полная" : "Минимум"}</div>

  const visibleTemplate = (option) =>
    <div className={sass.icon + " " + sass[option === "0" ? "eyeOn" : "eyeOff"]} />

  return (
    <div className={sass.locationSettings}>
      <ul className={sass.list}>
        <li className={sass.listItem}>
          <div className={sass.title}>Информация метки:</div>

          <div className={sass.inputWrap}>
            <SelectButton
              value={mode}
              onChange={(e) => {
                if (e.value && (e.value != mode))
                  disapatch(setToggleModeInfo(e.value));
              }}
              itemTemplate={modeInfoTemplate}
              options={["0", "1"]} />
          </div>
        </li>

        <li className={sass.listItem}>
          <div className={sass.title}><span>Фильтр</span>  |  <span>Отметки</span></div>
          <div className={sass.inputWrap}>
            <SelectButton
              value={filter}
              onChange={(e) => {
                if (e.value && (e.value != filter)) {
                  disapatch(setFilterDisplay(e.value))
                  setVisibleMarkers()
                }
              }}
              itemTemplate={visibleTemplate}
              options={["0", "1"]}
            />
            <SelectButton
              value={clean}
              onChange={(e) => {
                if (e.value && (e.value != clean)) {
                  disapatch(setCleanDisplay(e.value))
                  setVisibleMarkers()
                }
              }}
              itemTemplate={visibleTemplate}
              options={["0", "1"]}
            />
          </div>
        </li>
      </ul>
    </div>
  )
}