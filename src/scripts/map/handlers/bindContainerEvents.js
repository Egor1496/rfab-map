import $ from "jquery";
import mousewheel from "jquery-mousewheel";

import { pM } from "../paramsMap";

import { applyTransform } from "../transforms/applyTransform";
import { setScale } from "../transforms/setScaleMap";
import { setScaleIcon } from "../transforms/setScaleIcon";

import { createNewPath, isCreateNewPath } from "../creating/path/createNewPath";

import { store } from "../../../store/store";
import { markerInfoMV } from "../../../store/slice/modalVisible.slice";

mousewheel($);

let pathTimer = false;

pM.fpsInterval = setInterval(() => {
	pM.isMove = true;
}, pM.fpsMap);

export const bindContainerEvents = function () {
	var oldPageX,
		oldPageY,
		container = $(pM.canvas.wrapperEl);

	pM.mouseDownWindow = false;

	container
		.mouseup(function (e) {
			const top = e.pageY - pM.transform.mapOffsetY - pM.$element.offset().top,
				left = e.pageX - pM.transform.mapOffsetX - pM.$element.offset().left;

			pM.cursor.pageY = Number((top / pM.coeffHeight / pM.base.coeffScale).toFixed(1));
			pM.cursor.pageX = Number((left / pM.coeffWidth / pM.base.coeffScale).toFixed(1));

			// Создать новую точку если активирован режим создания нового маршрута.
			if (isCreateNewPath()) {
				createNewPath();
			}

			clearTimeout(pathTimer);
			pathTimer = false;
			pM.hasMoved = false;
		})
		.mousemove(function (e) {
			// Непосредственно перемещение
			if (pM.mouseDownWindow && pM.isMove) {
				pM.isMove = false;

				if (pathTimer === false)
					pathTimer = setTimeout(() => {
						pM.hasMoved = true; // запретить создание маршрута.
					}, 100);

				pM.isClickDownMarker = false; // отменить отметку локации

				// Рассчитываем смещение с учётом масштаба
				pM.transform.transX -= (oldPageX - e.pageX) / pM.base.scale;
				pM.transform.transY -= (oldPageY - e.pageY) / pM.base.scale;

				applyTransform();

				oldPageX = e.pageX;
				oldPageY = e.pageY;

				store.dispatch(markerInfoMV(false));

				return false;
			}
		})
		.mousedown(function (e) {
			pM.mouseDownWindow = true;

			// Запомним положение в начале перемещения по карте
			oldPageX = e.pageX;
			oldPageY = e.pageY;

			return false;
		});

	// Масштабирование колесом мыши
	container.mousewheel(function (event, delta, deltaX, deltaY) {
		// Отключим скролл страницы
		event.preventDefault();

		var offset = pM.$element.offset(), // положение холста на странице
			centerX = event.pageX - offset.left, // координата x центра масштабирования
			centerY = event.pageY - offset.top; // координата y центра масштабирования

		pM.zoom.currentZoom += deltaY; // получить текущий шаг зумма

		setScale(centerX, centerY, deltaY);

		setScaleIcon();
		applyTransform();
	});
};
