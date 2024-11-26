import sass from './canvasFabric.module.sass'

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fabric } from 'fabric';

import $ from "jquery";

import { createMap } from '../../../scripts/map/createMap';
import { setSizeCanvas } from '../../../scripts/map/transforms/setSizeCanvas';

import { activeMap } from '../../../store/slice/menuSelected.slice';
import { createPathMV } from '../../../store/slice/modalVisible.slice';

import { pM } from '../../../scripts/map/paramsMap';
import { setDefaultParams } from '../../../scripts/global/setDefaultParams';

export const CanvasFabric = () => {
  const [isLoadMap, setIsLoadMap] = useState(false)

  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  useEffect(() => {
    pM.$element = $("#canvasMap");

    pM.typeMap = window.location.pathname.split("/")[2] || "skyrim";

    dispatch(activeMap(pM.typeMap));
    dispatch(createPathMV(false))

    setSizeCanvas(pM.$element.get(0));

    pM.canvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
      scale: 1,
      moveCursor: "default",
      hoverCursor: "default",
      // enableRetinaScaling: false,
      // renderOnAddRemove: false
    });

    // pM.canvas.setZoom(1);

    // pM.canvas.setDimensions({
    //   width: pM.canvas.width * 2,
    //   height: pM.canvas.height * 2,
    // });

    // pM.canvas.clipTo = function (ctx) {
    //   ctx.rect(10, 10, 300, 300);
    // }

    createMap(setIsLoadMap);

    return () => {
      // pM.canvas.dispose();
      pM.$element.get(0).height = 550;
      pM.$element.get(0).width = 1160;
      setDefaultParams();
    }
  }, []);

  const classNames = [
    isLoadMap ? "" : sass.blur,
    sass.canvasFabric,
    sass[pM.typeMap],
  ].join(" ");

  return (
    <div className={classNames}>
      <canvas id="canvasMap" width="1160" height="550" ref={canvasRef} />
    </div>
  );
};
