import sass from './canvasFabric.module.sass'

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { fabric } from 'fabric';

import $ from "jquery";

import { createMap } from '../../../scripts/map/createMap';
import { setSizeCanvas } from '../../../scripts/map/transforms/setSizeCanvas';

import { activeMap } from '../../../store/slice/menuSelected.slice';

import { setDefaultParams } from '../../../scripts/global/setDefaultParams';
import { gS } from '../../../scripts/global/paramsGlobal';
import { createPathMV } from '../../../store/slice/modalVisible.slice';

export const CanvasFabric = () => {
  const [isLoadMap, setIsLoadMap] = useState(false)

  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  useEffect(() => {
    gS.$element = $("#canvasMap");

    gS.typeMap = window.location.pathname.split("/")[2] || "skyrim";

    dispatch(activeMap(gS.typeMap));
    dispatch(createPathMV(false))

    setSizeCanvas(gS.$element.get(0));

    gS.canvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
      scale: 1,
      moveCursor: "default",
      hoverCursor: "default",
      // enableRetinaScaling: false,
      // renderOnAddRemove: false
    });

    // gS.canvas.setZoom(1);

    // gS.canvas.setDimensions({
    //   width: gS.canvas.width * 2,
    //   height: gS.canvas.height * 2,
    // });

    // gS.canvas.clipTo = function (ctx) {
    //   ctx.rect(10, 10, 300, 300);
    // }

    createMap(setIsLoadMap);

    return () => {
      // gS.canvas.dispose();
      gS.$element.get(0).height = 550;
      gS.$element.get(0).width = 1160;
      setDefaultParams();
    }
  }, []);

  const classNames = [
    isLoadMap ? "" : sass.blur,
    sass.canvasFabric,
    sass[gS.typeMap],
  ].join(" ");

  return (
    <div className={classNames}>
      <canvas id="canvasMap" width="1160" height="550" ref={canvasRef} />
    </div>
  );
};
