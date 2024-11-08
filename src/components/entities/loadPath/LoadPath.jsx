import sass from './loadPath.module.sass'

import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import { FileUpload } from 'primereact/fileupload';

import { LoadMV } from '../../../store/slice/modalVisible.slice';
import { addPathNames } from '../../../store/slice/pathNames.slice';

import { gS } from '../../../scripts/global/paramsGlobal';
import { readFilePath } from '../../../scripts/global/filePath';
import { transformPathObj } from '../../../scripts/global/transformPathObj';
import { setLocalStorePath } from '../../../scripts/global/localStore';

export const LoadPath = () => {

  const fileUploadRef = useRef(null);

  const dispatch = useDispatch();

  const headerTemplate = (options) => options.chooseButton

  const handlerUpload = (obj) => {
    const listName = [],
      newPathList = [];

    const isLoadAll = (files, index) => files.length === index + 1

    obj.files.forEach((file, i) => {
      let namePath = file.name.split(".")[0];

      listName.push(namePath);

      readFilePath(file, (arr) => {
        const arrParse = JSON.parse(arr || "[]");
        let newPath;

        if (arrParse.length) {
          if (arrParse[0]?.left)
            newPath = transformPathObj(arrParse, namePath);
          else if (arrParse[0]?.l)
            newPath = { n: namePath, l: arrParse }

          gS.listPath.push(newPath);
          newPathList.push(newPath);

          if (isLoadAll(obj.files, i)) setLocalStorePath(newPathList, gS.typeMap);
        }
      })
    });

    fileUploadRef.current.clear();
    dispatch(addPathNames(listName))
    dispatch(LoadMV(false))
  }

  const buttonElem = <div> <span className={sass.underline}>Выберите файл(ы)</span> или перетащите сюда</div>;

  return <div className={sass.uploadWrap}>
    <FileUpload
      ref={fileUploadRef}
      accept=".json"
      multiple
      auto
      customUpload
      chooseLabel={buttonElem}
      uploadHandler={handlerUpload}
      headerTemplate={headerTemplate}
      itemTemplate={<></>}
    />
  </div>
}