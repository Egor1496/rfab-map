import $ from "jquery";

import { pM } from "../map/paramsMap";

import { store } from "../../store/store";

import { setToggleModeInfo } from "../../store/slice/settings.slice";

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

			store.dispatch(setToggleModeInfo());
		}
	};

	document.onkeyup = (ev) => {
		keyUp = true;
	};

	$(window).mouseup(() => {
		pM.mouseDownWindow = false;
	});
};
