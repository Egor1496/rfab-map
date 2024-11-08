import { createMarker } from "./createMarker";

import { store } from "../../../../store/store";
import { activeFilter } from "../../../../store/slice/menuSelected.slice";

import { gS } from "../../../global/paramsGlobal";

export const createMarkers = () => {
	const storeCleanLoc = JSON.parse(localStorage.getItem("rfab-map-cleanLoc") || "{}");
	gS.cleanLoc = storeCleanLoc[gS.typeMap] || [];

	const storeActiveFilter = localStorage.getItem("rfab-map-activeFilter") || "{}",
		typeFilter = JSON.parse(storeActiveFilter)[gS.typeMap]?.trim() || "qwerty";

	store.dispatch(activeFilter(typeFilter));

	gS.listMarkers.forEach((marker) => {
		marker.title = marker?.title || "";
		marker.description = marker?.description || "";

		if (~marker.type?.trim().indexOf(typeFilter)) marker.isActive = true;

		gS.cleanLoc.forEach((id) => {
			if (id === marker.id) marker.isClean = true;
		});

		createMarker(marker);
	});
};
