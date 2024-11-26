import sass from './pathList.module.sass'

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import { pM } from '../../../scripts/map/paramsMap';

import { MySpinner } from '../../shared/mySpinner/MySpinner';
import { MyContext } from '../../shared/myContext/MyContext';

import { store } from '../../../store/store';
import { createPathMV, LoadMV } from '../../../store/slice/modalVisible.slice';
import { handlerClickPath, handlerContextPath, handlerDeletePath, handlerDownloadPath } from './pathList.script';

export const PathList = () => {
  const selectPathNames = useSelector((state) => state.pathNamesReducer).pathNames;
  const selectIsLoad = useSelector((state) => state.dataLoadReducer).isLoadPath;
  const selectActivePath = useSelector((state) => state.menuSelectedReducer).activePath;

  const dispatch = useDispatch();

  const cm = useRef(null);

  let contextPathNumber = -1;

  const emptyPathElem = <span>Нет путей</span>

  const getClassNamePathElem = (i) => `${sass.path} ${selectActivePath === i ? sass.active : ""}`

  let listPathElem = selectPathNames.map((path, i) => (
    <div key={i}>
      <button
        className={getClassNamePathElem(i)}
        onClick={() => handlerClickPath(selectActivePath, dispatch, i)}
        onContextMenu={(e) => { handlerContextPath(e, cm); contextPathNumber = i; }}
      >
        {path}
      </button>
    </div>
  ))


  return (
    <div className={sass.pathList}>
      {
        !("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)) &&
        <div className={sass.buttonWrap}>
          <div className={`${sass.icon} ${sass.add}`}
            onClick={() => store.dispatch(createPathMV(true))}
          />

          <div className={`${sass.icon} ${sass.upload}`}
            onClick={() => dispatch(LoadMV(!store.getState().modalVisibleReducer.LoadMV))}
          />

          <div className={`${sass.icon} ${sass.download}`}
            onClick={() => handlerDownloadPath(selectActivePath)}
          />
        </div>
      }

      <div className={sass.listPath}>
        {selectIsLoad ? (pM.listPath.length ? listPathElem : emptyPathElem) : <MySpinner />}
      </div>

      <MyContext items={[
        { label: "Скачать", command: () => handlerDownloadPath(contextPathNumber) },
        { label: "Удалить", command: () => handlerDeletePath(selectActivePath, dispatch, contextPathNumber) }
      ]}
        cRef={cm}
      />
    </div>
  )
}
