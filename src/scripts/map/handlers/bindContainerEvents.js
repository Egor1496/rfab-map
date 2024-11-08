import $ from "jquery";
import mousewheel from "jquery-mousewheel";

import { applyTransform } from "../transforms/applyTransform";
import { setScale } from "../transforms/setScaleMap";
import { setScaleIcon } from "../transforms/setScaleIcon";

import { createNewPath, isCreateNewPath } from "../creating/path/createNewPath";

import { gS } from "../../global/paramsGlobal";
import { mC, mS } from "../paramsMap";

mousewheel($);

let pathTimer = false;

const fps = 1000 / 30;

let isMove = false;

setInterval(() => {
	isMove = true;
}, fps);

export const bindContainerEvents = function () {
	var oldPageX,
		oldPageY,
		container = $(gS.canvas.wrapperEl);

	gS.mouseDownWindow = false;

	container
		.mouseup(function (e) {
			const top = e.pageY - mS.transform.mapOffsetY - gS.$element.offset().top,
				left = e.pageX - mS.transform.mapOffsetX - gS.$element.offset().left;

			mS.cursor.pageY = Number((top / mC.coeffHeight / mS.base.coeffScale).toFixed(1));
			mS.cursor.pageX = Number((left / mC.coeffWidth / mS.base.coeffScale).toFixed(1));

			// Создать новую точку если активирован режим создания нового маршрута.
			if (isCreateNewPath()) {
				createNewPath();
			}

			clearTimeout(pathTimer);
			pathTimer = false;
			gS.hasMoved = false;
		})
		.mousemove(function (e) {
			// Непосредственно перемещение
			if (gS.mouseDownWindow && isMove) {
				isMove = false;

				if (pathTimer === false)
					pathTimer = setTimeout(() => {
						gS.hasMoved = true; // запретить создание маршрута.
					}, 100);

				gS.isClickDownMarker = false; // отменить отметку локации

				// Рассчитываем смещение с учётом масштаба
				mS.transform.transX -= (oldPageX - e.pageX) / mS.base.scale;
				mS.transform.transY -= (oldPageY - e.pageY) / mS.base.scale;

				applyTransform();

				oldPageX = e.pageX;
				oldPageY = e.pageY;

				return false;
			}
		})
		.mousedown(function (e) {
			gS.mouseDownWindow = true;

			// Запомним положение в начале перемещения по карте
			oldPageX = e.pageX;
			oldPageY = e.pageY;

			return false;
		});

	// Масштабирование колесом мыши
	container.mousewheel(function (event, delta, deltaX, deltaY) {
		// Отключим скролл страницы
		event.preventDefault();

		var offset = gS.$element.offset(), // положение холста на странице
			centerX = event.pageX - offset.left, // координата x центра масштабирования
			centerY = event.pageY - offset.top; // координата y центра масштабирования

		mS.zoom.currentZoom += deltaY; // получить текущий шаг зумма

		setScale(centerX, centerY, deltaY);

		setScaleIcon();
		applyTransform();
	});
};
