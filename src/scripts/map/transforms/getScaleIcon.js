import { pM } from "../paramsMap";

export const getScaleIcon = (marker) => {
	const coeff = pM.map.scaleX / pM.base.baseScale;
	const scale =
		(marker.scale || pM.scaleIconMarkers[marker.nameIcon] || pM.iconScaleDefault) * pM.coeffWidth;

	let scaleIcon = (coeff * scale * (1.3 - pM.zoom.currentZoom * 0.08)) / 7.5;

	if (pM.imgMF === ".svg") scaleIcon = scaleIcon * 8;

	if (marker.isActive) return scaleIcon * pM.iconHoverZoom;

	return scaleIcon;
};
