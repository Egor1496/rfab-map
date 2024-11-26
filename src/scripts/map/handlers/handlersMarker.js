import { pM } from "../paramsMap";

import { setScaleHover } from "../transforms/setScaleHover";
import { handlerCleanM } from "../handlers/handlerCleanM";

import { store } from "../../../store/store";
import { markerInfoMV } from "../../../store/slice/modalVisible.slice";
import { setMarkerInfo } from "../creating/marker/setMarkerInfo";

export const handlerMouseover = (mark, oImg) => {
	setScaleHover(oImg, true);
	pM.canvas.renderAll();

	if (store.getState().modalVisibleReducer.markerInfoMV === false) setMarkerInfo(mark, oImg);

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
