import $ from "jquery";

import { pM } from "../paramsMap";

import { applyTransform } from "../transforms/applyTransform";
import { setScale } from "../transforms/setScaleMap";

export const bindContainerTouchEvents = function () {
	var touchStartScale,
		touchStartDistance,
		container = $(pM.canvas.wrapperEl),
		touchX,
		touchY,
		centerTouchX,
		centerTouchY,
		lastTouchesLength,
		handleTouchEvent = function (e) {
			var touches = e.originalEvent.touches,
				offset,
				currentScale,
				transXOld,
				transYOld;

			if (e.type == "touchstart") {
				lastTouchesLength = 0;
			}

			if (touches.length == 1) {
				// Простое перемещение
				if (lastTouchesLength == 1) {
					transXOld = pM.transform.transX;
					transYOld = pM.transform.transY;
					pM.transform.transX -= (touchX - touches[0].pageX) / pM.base.scale;
					pM.transform.transY -= (touchY - touches[0].pageY) / pM.base.scale;

					applyTransform();

					if (transXOld != pM.transform.transX || transYOld != pM.transform.transY) {
						e.preventDefault();
					}
				}

				touchX = touches[0].pageX;
				touchY = touches[0].pageY;
			} else if (touches.length == 2) {
				// Масштабирование
				if (lastTouchesLength == 2) {
					currentScale =
						Math.sqrt(
							Math.pow(touches[0].pageX - touches[1].pageX, 2) +
								Math.pow(touches[0].pageY - touches[1].pageY, 2)
						) / touchStartDistance;

					setScale(touchStartScale * currentScale, centerTouchX, centerTouchY);

					e.preventDefault();
				} else {
					// Момент начала масштабирования, запомним параметры
					offset = pM.$element.offset();

					if (touches[0].pageX > touches[1].pageX) {
						centerTouchX = touches[1].pageX + (touches[0].pageX - touches[1].pageX) / 2;
					} else {
						centerTouchX = touches[0].pageX + (touches[1].pageX - touches[0].pageX) / 2;
					}
					if (touches[0].pageY > touches[1].pageY) {
						centerTouchY = touches[1].pageY + (touches[0].pageY - touches[1].pageY) / 2;
					} else {
						centerTouchY = touches[0].pageY + (touches[1].pageY - touches[0].pageY) / 2;
					}

					centerTouchX -= offset.left;
					centerTouchY -= offset.top;

					touchStartScale = pM.base.scale;

					touchStartDistance = Math.sqrt(
						Math.pow(touches[0].pageX - touches[1].pageX, 2) +
							Math.pow(touches[0].pageY - touches[1].pageY, 2)
					);
				}
			}

			lastTouchesLength = touches.length;
		};

	container.bind("touchstart", handleTouchEvent);
	container.bind("touchmove", handleTouchEvent);
};
