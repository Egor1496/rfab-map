import { mC } from "../paramsMap";

export const setScaleHover = (oImg, isSacle) => {
	if (isSacle) {
		oImg.scale(oImg.getObjectScaling().scaleX * mC.iconHoverZoom);
	} else {
		oImg.scale(oImg.getObjectScaling().scaleX / mC.iconHoverZoom);
	}
};
