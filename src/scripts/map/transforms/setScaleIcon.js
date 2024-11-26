import { pM } from "../paramsMap";

import { getScaleIcon } from "./getScaleIcon";

export const setScaleIcon = () => {
	pM.listMarkers.forEach((marker) => {
		marker.oImg.scale(getScaleIcon(marker));
	});
};
