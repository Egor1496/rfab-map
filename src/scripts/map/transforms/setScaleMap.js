import { pM } from "../paramsMap";

export const setScale = function (anchorX, anchorY) {
	// Ограничим масштаб
	if (pM.zoom.currentZoom > pM.maxZoom - pM.minZoom) {
		pM.zoom.currentZoom = pM.maxZoom - pM.minZoom;
	} else if (pM.zoom.currentZoom <= 0) {
		pM.zoom.currentZoom = 0;
	}

	const scaleToSet = pM.zoom.currentZoom * pM.zoom.stepZoomMap + pM.base.baseScale;

	let zoomStep; // необходимое изменение масштаба

	// Центр масштабирования
	if (typeof anchorX != "undefined" && typeof anchorY != "undefined") {
		// Рассчитаем, сместить все объекты, чтобы центр масштабирования остался на месте.
		zoomStep = scaleToSet / pM.base.scale;
		pM.transform.transX -= ((zoomStep - 1) / scaleToSet) * anchorX;
		pM.transform.transY -= ((zoomStep - 1) / scaleToSet) * anchorY;
	}

	pM.base.scale = scaleToSet;

	// Обновить значения масштаба.
	pM.base.coeffScale = pM.base.scale / pM.base.baseScale;
};
