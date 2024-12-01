import sass from './graphicsSettings.module.sass'

import { useState } from 'react';

import { Slider } from "primereact/slider";
import { SelectButton } from 'primereact/selectbutton';

export const GraphicsSettings = () => {
  const [sliderValue, setSliderValue] = useState(20);

  const mapItem = ["sd", "hd", "2k"];
  const [map, setMap] = useState(mapItem[0]);

  const iconItem = ["hd", "svg"];
  const [icon, setIcon] = useState(iconItem[0]);

  return (
    <div className={sass.graphicsSettings}>
      <ul className={sass.list}>
        <li className={sass.listItem + " " + sass.slider}>
          <div className={sass.title}>{sliderValue} FPS при передвижении:</div>

          <div className={sass.inputWrap}>
            <Slider value={sliderValue} onChange={(e) => setSliderValue(e.value)} step={10} max={100} min={10} />
          </div>
        </li>

        <li className={sass.listItem}>
          <div className={sass.title}>Карты:</div>

          <div className={sass.inputWrap}>
            <SelectButton value={map} onChange={(e) => setMap(e.value)} options={mapItem} />
          </div>
        </li>

        <li className={sass.listItem}>
          <div className={sass.title}>Локации:</div>

          <div className={sass.inputWrap}>
            <SelectButton value={icon} onChange={(e) => setIcon(e.value)} options={iconItem} />
          </div>
        </li>
      </ul>
    </div>
  )
}