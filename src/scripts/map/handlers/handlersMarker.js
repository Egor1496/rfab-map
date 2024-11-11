import { setScaleHover } from "../transforms/setScaleHover";

import { handlerCleanM } from "../handlers/handlerCleanM";

import { store } from "../../../store/store";
import { markerInfoMV } from "../../../store/slice/modalVisible.slice";

import { setMarkerInfo } from "../creating/marker/setMarkerInfo";

import { gS } from "../../global/paramsGlobal";

export const handlerMouseover = (mark, oImg) => {
	setScaleHover(oImg, true);
	gS.canvas.renderAll();

	if (store.getState().modalVisibleReducer.markerInfoMV === false) setMarkerInfo(mark, oImg);

	store.dispatch(markerInfoMV(true));
};

export const handlerMouseout = (oImg) => {
	setScaleHover(oImg, false);
	gS.canvas.renderAll();

	store.dispatch(markerInfoMV(false));
};

let timerMouseDown;

export const handlerMouseDown = (mark, oImg) => {
	gS.isClickDownMarker = true;

	clearTimeout(timerMouseDown);
	timerMouseDown = setTimeout(() => {
		if (gS.isClickDownMarker) handlerCleanM(mark, oImg);
	}, 200);
};

export const handlerMouseup = (oImg) => {
	gS.isClickDownMarker = false;
};

export const handlerMousedblclick = (mark, oImg) => {
	handlerCleanM(mark, oImg);
};
