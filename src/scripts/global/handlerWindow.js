import $ from "jquery";

import { store } from "../../store/store";
import { keyPress } from "../../store/slice/events.slice";

import { markerInfoMV } from "../../store/slice/modalVisible.slice";
import { floatTooltipMVB, floatTooltipMVT } from "../../store/slice/floatTooltip.slice";

import { gS } from "./paramsGlobal";

export const handlerWindow = () => {
	$(window).mouseup(() => {
		gS.mouseDownWindow = false;
	});

	document.onkeydown = (ev) => {
		store.dispatch(keyPress(ev.code));
	};

	document.onkeyup = (ev) => {
		store.dispatch(keyPress(""));
		store.dispatch(markerInfoMV(false));
		store.dispatch(floatTooltipMVB(false));
		store.dispatch(floatTooltipMVT(false));
	};
};
