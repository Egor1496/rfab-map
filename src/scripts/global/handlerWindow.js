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

			store.dispatch(
				setToggleModeInfo(store.getState().settingsReducer.toggleModeInfo === "0" ? "1" : "0")
			);
		}
	};

	document.onkeyup = (ev) => {
		keyUp = true;
	};

	$(window).mouseup(() => {
		pM.mouseDownWindow = false;
	});
};
