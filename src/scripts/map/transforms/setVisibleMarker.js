import { store } from "../../../store/store";
import { pM } from "../paramsMap";

export const setVisibleMarker = (marker) => {
	marker.oImg.set("visible", true);

	if (
		store.getState().settingsReducer.filterDisplayMode === "1" &&
		store.getState().menuSelectedReducer.activeFilter &&
		!marker.isActive &&
		!marker.isClean
	)
		marker.oImg.set("visible", false);

	if (store.getState().settingsReducer.cleanDisplayMode === "1" && marker.isClean)
		marker.oImg.set("visible", false);
};

export const setVisibleMarkers = () => {
	pM.listMarkers.forEach((marker) => {
		marker.oImg.set("visible", true);

		if (
			store.getState().settingsReducer.filterDisplayMode === "1" &&
			store.getState().menuSelectedReducer.activeFilter &&
			!marker.isActive &&
			!marker.isClean
		)
			marker.oImg.set("visible", false);

		if (store.getState().settingsReducer.cleanDisplayMode === "1" && marker.isClean)
			marker.oImg.set("visible", false);
	});

	pM.canvas.renderAll();
};
