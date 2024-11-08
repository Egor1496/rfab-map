import { gS } from "../../global/paramsGlobal";

import { createMarker } from "../creating/marker/createMarker";

import { setLocalStoreCleanLoc } from "../../global/localStore";

export const handlerCleanM = (marker) => {
	if (marker.isClean) gS.cleanLoc = gS.cleanLoc.filter((id) => !(id === marker.id));
	else gS.cleanLoc.push(marker.id);

	setLocalStoreCleanLoc(gS.cleanLoc);

	marker.isClean = !marker.isClean;

	gS.canvas.remove(marker.oImg);

	createMarker(marker);
};
