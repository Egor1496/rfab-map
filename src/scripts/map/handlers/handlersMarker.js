import { pM } from "../paramsMap";

import { setScaleHover } from "../transforms/setScaleHover";
import { handlerCleanM } from "../handlers/handlerCleanM";

import { setMarkerInfo } from "../creating/marker/setMarkerInfo";

import { store } from "../../../store/store";
import { markerInfoMV } from "../../../store/slice/modalVisible.slice";
import { setTypeModeInfo } from "../../../store/slice/settings.slice";

export const handlerMouseover = (mark, oImg) => {
	setScaleHover(oImg, true);
	pM.canvas.renderAll();

	if (store.getState().modalVisibleReducer.markerInfoMV === false) setMarkerInfo(mark, oImg);

	pM.isMouseoverMarker = false;
	store.dispatch(setTypeModeInfo(true));
	store.dispatch(markerInfoMV(true));
};

export const handlerMouseout = (oImg) => {
	setScaleHover(oImg, false);
	pM.canvas.renderAll();

	store.dispatch(markerInfoMV(false));
};

let timerMouseDown;

export const handlerMouseDown = (mark, oImg) => {
	pM.isClickDownMarker = true;

	clearTimeout(timerMouseDown);
	timerMouseDown = setTimeout(() => {
		if (pM.isClickDownMarker) handlerCleanM(mark, oImg);
	}, 200);
};

export const handlerMouseup = (oImg) => {
	pM.isClickDownMarker = false;
};

export const handlerMousedblclick = (mark, oImg) => {
	handlerCleanM(mark, oImg);
};
