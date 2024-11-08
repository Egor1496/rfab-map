import { setScaleHover } from "../transforms/setScaleHover";

import { gS } from "../../global/paramsGlobal";
import { store } from "../../../store/store";
import { markerInfoMV } from "../../../store/slice/modalVisible.slice";
import { setMarkerInfo } from "../creating/marker/setMarkerInfo";

export const handlerMouseover = (point, oImg) => {
	setScaleHover(oImg, true);
	gS.canvas.renderAll();
	// applyTransform();

	setMarkerInfo(point, oImg);

	store.dispatch(markerInfoMV(true));
};

export const handlerMouseout = (oImg) => {
	setScaleHover(oImg, false);
	gS.canvas.renderAll();
	// applyTransform();

	store.dispatch(markerInfoMV(false));
};

export const handlerMouseup = () => {};
