import { pM } from "../../paramsMap";

import { replaceImage } from "./replaceImg";

export const filterRender = (type = "qwerty") => {
	let countLoad = 0,
		countReplace = 0,
		time = 0;

	const onLoad = () => countLoad++;
	const onReplace = () => countReplace++;

	pM.listMarkers.forEach((marker) => {
		if (~marker.type?.trim().indexOf(type.trim())) {
			marker.isActive = true;

			if (!marker.isClean) replaceImage(marker, onLoad, onReplace);
		} else {
			marker.isActive = false;

			if (!marker.isClean) replaceImage(marker, onLoad, onReplace);
		}
	});

	const loadInterval = setInterval(() => {
		if (countLoad >= countReplace || time > 5000) {
			pM.canvas.renderAll();

			clearInterval(loadInterval);
		}

		time += 100;
	}, 100);
};
