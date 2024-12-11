import sass from './resetSettings.module.sass'

import React, { useRef, useState } from 'react';

import { ConfirmDialog } from 'primereact/confirmdialog';

import { Toast } from 'primereact/toast';
import { pM } from '../../../scripts/map/paramsMap';
import { MyButton } from '../../shared/myButton/MyButton';

let actionType = "",
  dialogTitle = ""

export const ResetSettings = () => {
  const toast = useRef(null);

  const [visible, setVisible] = useState(false);

  const openModal = (type, title) => {
    actionType = type;
    dialogTitle = title || "";

    setVisible(true);
  };

  const accept = () => {
    actions[actionType]();
    // toast.current.show({ severity: 'info', summary: 'accept' });
  }
  const reject = () => {
    // toast.current.show({ severity: 'warn', summary: 'reject' });
  }

  const setStore = (name, value) => {
    const cleanLoc = JSON.parse(localStorage.getItem(name));
    cleanLoc[pM.typeMap] = value;
    localStorage.setItem(name, JSON.stringify(cleanLoc));
  }

  const actions = {
    "m": () => {
      setStore("rfab-map-cleanLoc", []);
      location.reload()
    },
    "mA": () => {
      localStorage.removeItem("rfab-map-cleanLoc");
      location.reload()
    },
    "p": () => {
      setStore("rfab-map-pathList", []);
      setStore("rfab-map-activePath", -1);
      location.reload()
    },
    "pA": () => {
      localStorage.removeItem("rfab-map-pathList");
      localStorage.removeItem("rfab-map-activePath");
      location.reload()
    },
    "sA": () => {
      localStorage.clear();
      location.reload()
    },
  }

  const cleanSettings = [
    {
      type: "m",
      title: "Очистить зачищенные локации на карте " + pM.typeMap,
      value: `Отметки ${pM.typeMap}`
    },
    {
      type: "mA",
      title: "Очистить ВСЕ зачищенные локации",
      value: "ВСЕ отметки"
    },
    {
      type: "p",
      title: "Удалить маршруты на карте " + pM.typeMap,
      value: `Маршруты ${pM.typeMap}`
    },
    {
      type: "pA",
      title: "Удалить ВСЕ маршруты",
      value: "ВСЕ маршруты"
    },
    {
      type: "sA",
      title: "Удалить ВСЕ настройки сайта включая МАРШРУТЫ и ОТМЕТКИ",
      value: "СБРОСИТЬ ВСЁ"
    }
  ]

  return (
    <div className={sass.resetSettings}>
      <Toast ref={toast} />

      <div className={sass.inputWrap}>
        {
          cleanSettings.map((el) => (
            <MyButton
              key={el.value}
              onClick={(e) => { openModal(el.type, el.title); }}
              iconType="delete"
              bcolor="#ff5151">
              {el.value}
            </MyButton>
          ))
        }
      </div>

      <ConfirmDialog
        group="declarative"
        visible={visible}
        onHide={() => setVisible(false)}
        content={({ hide }) => <div className={sass.dialogContent}>
          <div className={sass.dialogTitle}>{dialogTitle}</div>
          <div className={sass.buttonWrap}>
            <MyButton bcolor="#ff5151" onClick={(event) => { hide(event); accept(); }}>Подтвердить</MyButton>
            <MyButton onClick={(event) => { hide(event); reject(); }}>Отменить</MyButton>
          </div>
        </div>}
        dismissableMask
      />
    </div >
  )
}