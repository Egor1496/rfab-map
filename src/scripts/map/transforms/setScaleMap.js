import { mC, mS } from "../paramsMap";

export const setScale = function (anchorX, anchorY) {
	// Ограничим масштаб
	if (mS.zoom.currentZoom > mC.maxZoom - mC.minZoom) {
		mS.zoom.currentZoom = mC.maxZoom - mC.minZoom;
	} else if (mS.zoom.currentZoom <= 0) {
		mS.zoom.currentZoom = 0;
	}

	const scaleToSet = mS.zoom.currentZoom * mS.zoom.stepZoomMap + mS.base.baseScale;

	let zoomStep; // необходимое изменение масштаба

	// Центр масштабирования
	if (typeof anchorX != "undefined" && typeof anchorY != "undefined") {
		// Рассчитаем, сместить все объекты, чтобы центр масштабирования остался на месте.
		zoomStep = scaleToSet / mS.base.scale;
		mS.transform.transX -= ((zoomStep - 1) / scaleToSet) * anchorX;
		mS.transform.transY -= ((zoomStep - 1) / scaleToSet) * anchorY;
	}

	mS.base.scale = scaleToSet;

	// Обновить значения масштаба.
	mS.base.coeffScale = mS.base.scale / mS.base.baseScale;
};
