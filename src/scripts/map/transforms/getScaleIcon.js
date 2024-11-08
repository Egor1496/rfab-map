import { gS } from "../../global/paramsGlobal";
import { mC, mS } from "../paramsMap";

export const getScaleIcon = (marker) => {
	const coeff = gS.map.scaleX / mS.base.baseScale;
	const scale =
		(marker.scale || mC.scaleIconMarkers[marker.nameIcon] || mC.iconScaleDefault) * mC.coeffWidth;

	const scaleIcon = (coeff * scale * (1.3 - mS.zoom.currentZoom * 0.08)) / 7.5;

	if (marker.isActive) return scaleIcon * mC.iconHoverZoom;

	return scaleIcon;
};
