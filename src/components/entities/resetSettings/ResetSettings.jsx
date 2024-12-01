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
    actions()
    // toast.current.show({ severity: 'info', summary: 'accept' });
  }
  const reject = () => {
    // toast.current.show({ severity: 'warn', summary: 'reject' });
  }

  const actions = () => {
    switch (actionType) {
      case "p":

        break;
      case "pa":

        break;
      case "m":

        break;
      case "ma":

        break;
      case "aa":

        break;
    }

    actionType = ""
  }

  return (
    <div className={sass.resetSettings}>
      <Toast ref={toast} />

      <div className={sass.inputWrap}>
        <MyButton onClick={(e) => { openModal("p", "Очистить зачищеные локации на карте " + pM.typeMap); }} iconType="delete" bcolor="#ff5151">Отметки {pM.typeMap}</MyButton>
        <MyButton onClick={(e) => { openModal("pa", "Очистить ВСЕ зачищеные локации"); }} iconType="delete" bcolor="#ff5151">ВСЕ отметки</MyButton>
        <br />
        <MyButton onClick={(e) => { openModal("m", "Удалить маршруты на карте " + pM.typeMap); }} iconType="delete" bcolor="#ff5151">Маршруты {pM.typeMap}</MyButton>
        <MyButton onClick={(e) => { openModal("ma", "Удалить ВСЕ маршруты"); }} iconType="delete" bcolor="#ff5151">ВСЕ маршруты</MyButton>
        <br />
        <MyButton onClick={(e) => { openModal("aa", "Удалить ВСЕ настройки сайта включаяя МАРШРУТЫ и ОТМЕТКИ"); }} bcolor="#ff2121">СБРОСИТЬ ВСЁ</MyButton>
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