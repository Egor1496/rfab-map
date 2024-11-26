import { pM } from "../../paramsMap";

import { createMarker } from "./createMarker";

import { store } from "../../../../store/store";
import { activeFilter } from "../../../../store/slice/menuSelected.slice";

// import { rfabParser } from "../../../global/rfabParser";

export const createMarkers = () => {
	const storeCleanLoc = JSON.parse(localStorage.getItem("rfab-map-cleanLoc") || "{}");
	pM.cleanLoc = storeCleanLoc[pM.typeMap] || [];

	const storeActiveFilter = localStorage.getItem("rfab-map-activeFilter") || "{}",
		typeFilter = JSON.parse(storeActiveFilter)[pM.typeMap]?.trim() || "qwerty";

	store.dispatch(activeFilter(typeFilter));

	pM.listMarkers.forEach((marker) => {
		marker.title = marker?.title || "";
		marker.description = marker?.description || "";
		marker.type = marker?.type || "";

		if (~marker.type?.trim().indexOf(typeFilter)) marker.isActive = true;

		pM.cleanLoc.forEach((id) => {
			if (id === marker.id) marker.isClean = true;
		});

		createMarker(marker);
	});

	// setTimeout(() => {
	// 	rfabParser(pM.listMarkers);
	// }, 1000);
};
