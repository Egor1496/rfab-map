import { pM } from "../paramsMap";

export const setScaleHover = (oImg, isSacle) => {
	if (isSacle) {
		oImg.scale(oImg.getObjectScaling().scaleX * pM.iconHoverZoom);
	} else {
		oImg.scale(oImg.getObjectScaling().scaleX / pM.iconHoverZoom);
	}
};
