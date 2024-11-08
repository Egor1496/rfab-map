import { gS } from "../../global/paramsGlobal";
import { mS } from "../paramsMap";

export const setZoomCanvas = () => {
	let newScale;

	if (mS.base.width / mS.base.height > mS.base.baseWidth / mS.base.baseHeight) {
		newScale = mS.base.height / mS.base.baseHeight;
	} else {
		newScale = mS.base.width / mS.base.baseWidth;
	}

	mS.base.scale *= newScale;
	mS.transform.transX *= newScale;
	mS.transform.transY *= newScale;

	gS.canvas.setWidth(mS.base.width);
	gS.canvas.setHeight(mS.base.height);

	// Обновить значения масштаба.
	mS.base.baseScale = mS.base.scale;
	mS.base.coeffScale = mS.base.scale / mS.base.baseScale;
};
