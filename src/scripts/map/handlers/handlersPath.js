import { pM } from "../paramsMap";

import { setScaleHover } from "../transforms/setScaleHover";
import { setMarkerInfo } from "../creating/marker/setMarkerInfo";

import { store } from "../../../store/store";
import { markerInfoMV } from "../../../store/slice/modalVisible.slice";

export const handlerMouseover = (point, oImg) => {
	setScaleHover(oImg, true);
	pM.canvas.renderAll();
	// applyTransform();

	setMarkerInfo(point, oImg);

	store.dispatch(markerInfoMV(true));
};

export const handlerMouseout = (oImg) => {
	setScaleHover(oImg, false);
	pM.canvas.renderAll();
	// applyTransform();

	store.dispatch(markerInfoMV(false));
};

export const handlerMouseup = () => {};
