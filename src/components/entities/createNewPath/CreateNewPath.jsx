import sass from './createNewPath.module.sass'

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InputText } from "primereact/inputtext";

import { ColorPicker } from 'primereact/colorpicker';

import { cancelPoint, deleteNewPath } from '../../../scripts/map/creating/path/createNewPath';

import { createPathMV } from '../../../store/slice/modalVisible.slice';
import { addPathNames } from '../../../store/slice/pathNames.slice';

import { pM } from '../../../scripts/map/paramsMap';
import { downloadFilePath } from '../../../scripts/global/filePath';
import { setLocalStorePath } from '../../../scripts/global/localStore';

export const CreateNewPath = () => {
  const selectOpenModal = useSelector((state) => state.modalVisibleReducer).createPathMV;

  const [opacity, setOpacity] = useState(selectOpenModal); // Локальный стейт для анимации opacity.
  const [visible, setVisible] = useState(selectOpenModal); // Локальный стейт для z-index.

  const initProps = {
    inputV: "",
    textarV: "",
    typePoint: 1,
    typeLine: 0,
    lineColor: "61ff49"
  }

  const setDefprops = () => {
    setInputV(initProps.inputV)
    setTextarV(initProps.textarV);
    setActiveType(initProps.typePoint);
    setTypeLine(initProps.typeLine);
    setColorLine(initProps.lineColor);
  }

  const [inputV, setInputV] = useState(initProps.inputV);
  const [textarV, setTextarV] = useState(initProps.textarV);

  const [typePoint, setActiveType] = useState(initProps.typePoint);
  const [typeLine, setTypeLine] = useState(initProps.typeLine);
  const [lineColor, setColorLine] = useState(initProps.lineColor);

  const dispatch = useDispatch();

  useEffect(() => {
    if (initProps.typePoint !== typePoint)
      pM.propsCreatedPath.ty = typePoint - 1;
    else
      delete pM.propsCreatedPath.ty;

    if (initProps.typeLine !== typeLine)
      pM.propsCreatedPath.li = typeLine + 1;
    else
      delete pM.propsCreatedPath.li;

    if (initProps.lineColor !== lineColor)
      pM.propsCreatedPath.lc = "#" + lineColor;
    else
      delete pM.propsCreatedPath.lc;

    if (initProps.textarV !== textarV)
      pM.propsCreatedPath.de = textarV;
    else
      delete pM.propsCreatedPath.de;

  }, [textarV, typePoint, typeLine, lineColor])

  const setStateActiveType = (str) => str !== typePoint ? setActiveType(str) : setActiveType(-1)
  const setStateTypeLine = (str) => str !== typeLine ? setTypeLine(str) : setTypeLine(-1)

  useEffect(() => {
    setOpacity(selectOpenModal);

    if (selectOpenModal) {
      setVisible(true)
      setDefprops();
    }
    else
      setTimeout(() => { setVisible(false) }, 300);
  }, [selectOpenModal]);

  const classNames = [
    sass.createNewPath,
    opacity ? sass.opacity : "",
    visible ? sass.visible : "",
  ];

  return (
    <div className={classNames.join(" ")}>
      <div className={sass.inputWrap}>
        <div className={sass.buttonWrap}>
          <button className={sass.save} onClick={() => {
            if (inputV.length >= 3) {
              dispatch(createPathMV(false))
              dispatch(addPathNames([inputV]))

              const newPath = { n: inputV, l: [...pM.сreatedPath] }

              setLocalStorePath([newPath], pM.typeMap);

              location.reload() //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111

              pM.listPath.push(newPath);

              deleteNewPath();
            } else {
              alert("Введи название маршрута");
            }
          }}> Сохранить </button>

          <button className={sass.download} onClick={() => {
            if (inputV.length >= 3) {
              dispatch(createPathMV(false))

              downloadFilePath(JSON.stringify(pM.сreatedPath), inputV);
              deleteNewPath();
            } else {
              alert("Введи название маршрута");
            }
          }}> Скачать </button>

          <button className={sass.cancel} onClick={() => {
            dispatch(createPathMV(false))
            deleteNewPath();
          }}> Отменить </button>
        </div>

        <div className={sass.controlWrap}>
          <div className={sass.iconWrap}>
            <div className={sass.cancelPoint} onMouseUp={cancelPoint} />
          </div>

          <div className={sass.iconWrap}>
            <div
              className={`${sass.point} ${typePoint === 2 ? sass.active : ""}`}
              onClick={() => setStateActiveType(2)}
            />

            <div
              className={`${sass.knot} ${typePoint === 1 ? sass.active : ""}`}
              onClick={() => {
                setStateActiveType(1);
                setTextarV("")
              }}
            />
          </div>

          <div className={sass.iconWrap}>
            <div className={`${sass.lineSolid}  ${typeLine === 0 ? sass.active : ""}`}
              onMouseUp={() => setStateTypeLine(0)}
            >
              <div style={{ borderColor: `#${lineColor}` }} />
            </div>

            <div className={`${sass.lineDash} ${typeLine === 1 ? sass.active : ""}`}
              onMouseUp={() => setStateTypeLine(1)}
            >
              <div style={{ borderColor: `#${lineColor}` }} />
            </div>

            <div className={`${sass.lineDott} ${typeLine === 2 ? sass.active : ""}`}
              onMouseUp={() => setStateTypeLine(2)}
            >
              <div style={{ borderColor: `#${lineColor}` }} />
            </div>

            <div className={sass.lineColor} >
              <ColorPicker value={lineColor} onChange={(e) => setColorLine(e.value)} />
            </div>

          </div>

        </div>

      </div>

      <div className={sass.inputWrap}>

        <InputText
          placeholder='Название (маршрута)'
          className={sass.namePath + " " + (inputV.length < 3 ? sass.empty : "")}
          value={inputV}
          onChange={(e) => setInputV(e.target.value)}
        />

        <textarea
          className={sass.descrPath}
          placeholder='Заметка (точки)'
          value={textarV}
          onChange={(e) => setTextarV(e.target.value)}
          disabled={typePoint !== 2 ? true : false}
        />
      </div>

    </div>
  )
}