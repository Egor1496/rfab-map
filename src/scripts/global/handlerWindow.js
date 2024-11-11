import $ from "jquery";

import { store } from "../../store/store";
import { keyPress } from "../../store/slice/events.slice";

import { setToggleModeInfo } from "../../store/slice/settings.slice";

import { gS } from "./paramsGlobal";

export const handlerWindow = () => {
	let keyUp = true;

	document.onkeydown = (ev) => {
		if (
			keyUp &&
			ev.code === "ControlLeft" &&
			(store.getState().floatTooltipReducer.floatTooltipMVB ||
				store.getState().floatTooltipReducer.floatTooltipMVT ||
				store.getState().modalVisibleReducer.markerInfoMV)
		) {
			keyUp = false;

			store.dispatch(keyPress(ev.code));
			store.dispatch(setToggleModeInfo());
		}
	};

	document.onkeyup = (ev) => {
		keyUp = true;

		store.dispatch(keyPress(""));
	};

	$(window).mouseup(() => {
		gS.mouseDownWindow = false;
	});
};
