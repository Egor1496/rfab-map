import { pM } from "../paramsMap";

export const setZoomCanvas = () => {
	let newScale;

	if (pM.base.width / pM.base.height > pM.base.baseWidth / pM.base.baseHeight) {
		newScale = pM.base.height / pM.base.baseHeight;
	} else {
		newScale = pM.base.width / pM.base.baseWidth;
	}

	pM.base.scale *= newScale;
	pM.transform.transX *= newScale;
	pM.transform.transY *= newScale;

	pM.canvas.setWidth(pM.base.width);
	pM.canvas.setHeight(pM.base.height);

	// Обновить значения масштаба.
	pM.base.baseScale = pM.base.scale;
	pM.base.coeffScale = pM.base.scale / pM.base.baseScale;
};
