import $ from "jquery";

import { applyTransform } from "../transforms/applyTransform";
import { setScale } from "../transforms/setScaleMap";

import { mS } from "../paramsMap";
import { gS } from "../../global/paramsGlobal";

export const bindContainerTouchEvents = function () {
	var touchStartScale,
		touchStartDistance,
		container = $(gS.canvas.wrapperEl),
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
					transXOld = mS.transform.transX;
					transYOld = mS.transform.transY;
					mS.transform.transX -= (touchX - touches[0].pageX) / mS.base.scale;
					mS.transform.transY -= (touchY - touches[0].pageY) / mS.base.scale;

					applyTransform();

					if (transXOld != mS.transform.transX || transYOld != mS.transform.transY) {
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
					offset = gS.$element.offset();

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

					touchStartScale = mS.base.scale;

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
