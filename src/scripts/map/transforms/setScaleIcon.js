import { gS } from "../../global/paramsGlobal";

import { getScaleIcon } from "./getScaleIcon";

export const setScaleIcon = () => {
	gS.listMarkers.forEach((marker) => {
		marker.oImg.scale(getScaleIcon(marker));
	});
};
