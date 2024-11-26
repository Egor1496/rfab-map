import { pM } from "../paramsMap";

import { createMarker } from "../creating/marker/createMarker";
import { setLocalStoreCleanLoc } from "../../global/localStore";

export const handlerCleanM = (marker) => {
	if (marker.isClean) pM.cleanLoc = pM.cleanLoc.filter((id) => !(id === marker.id));
	else pM.cleanLoc.push(marker.id);

	setLocalStoreCleanLoc(pM.cleanLoc);

	marker.isClean = !marker.isClean;

	pM.canvas.remove(marker.oImg);

	createMarker(marker);
};
