import { pM } from "../../paramsMap";

import { replaceImage } from "./replaceImg";

import { setVisibleMarker } from "../../transforms/setVisibleMarker";

export const filterRender = () => {
	let countLoad = 0,
		countReplace = 0,
		time = 0;

	const onLoad = () => countLoad++;
	const onReplace = () => countReplace++;

	pM.listMarkers.forEach((marker) => {
		if (pM.typeFilter.trim() && ~marker.type?.trim().indexOf(pM.typeFilter.trim())) {
			marker.isActive = true;
		} else {
			marker.isActive = false;
		}

		if (!marker.isClean) replaceImage(marker, onLoad, onReplace);

		setVisibleMarker(marker);
	});

	const loadInterval = setInterval(() => {
		if (countLoad >= countReplace || time > 5000) {
			pM.canvas.renderAll();

			clearInterval(loadInterval);
		}

		time += 100;
	}, 100);
};
