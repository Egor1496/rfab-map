import { pM } from "../../paramsMap";

import { getScaleIcon } from "../../transforms/getScaleIcon";

export const replaceImage = (marker, onLoad, onReplace) => {
	const currUrl = marker.oImg._element.src.split("/"),
		currIcon = currUrl[currUrl.length - 1];

	if (currIcon !== marker.nameIcon) {
		onReplace();

		const newUrl = pM.urlMarkers + pM.urlMarkersType + marker.nameIcon;

		marker.oImg._element.src = newUrl + (marker.isActive ? "_F.png" : ".png");
		marker.oImg._element.onload = () => onLoad();
		marker.oImg.scale(getScaleIcon(marker));
	}
};
