import sass from './locationSettings.module.sass'

import { useState } from 'react';

import { SelectButton } from 'primereact/selectbutton';

export const LocationSettings = () => {
  const modeInfoItem = ['Всё', 'Минимум'];
  const [modeInfo, setModeInfo] = useState(modeInfoItem[0]);

  const filterVisibleItem = [1, 0];
  const [filterVisible, setFilterVisible] = useState(filterVisibleItem[0]);

  const cleanVisibleItem = [1, 0];
  const [cleanVisible, setCleanVisible] = useState(cleanVisibleItem[0]);

  const justifyTemplate = (option) => {
    return <div className={sass.icon + " " + sass[option ? "eyeOn" : "eyeOff"]}></div>
  }

  return (
    <div className={sass.locationSettings}>
      <ul className={sass.list}>
        <li className={sass.listItem}>
          <div className={sass.title}>Информация метки:</div>

          <div className={sass.inputWrap}>
            <SelectButton value={modeInfo} onChange={(e) => setModeInfo(e.value)} options={modeInfoItem} />
          </div>
        </li>

        <li className={sass.listItem}>
          <div className={sass.title}>Фильтрованные:</div>
          <div className={sass.inputWrap}>
            <SelectButton value={filterVisible} onChange={(e) => setFilterVisible(e.value)} itemTemplate={justifyTemplate} options={filterVisibleItem} />
          </div>
        </li>

        <li className={sass.listItem}>
          <div className={sass.title}>Зачищенные:</div>
          <div className={sass.inputWrap}>
            <SelectButton value={cleanVisible} onChange={(e) => setCleanVisible(e.value)} itemTemplate={justifyTemplate} options={cleanVisibleItem} />
          </div>
        </li>
      </ul>
    </div>
  )
}