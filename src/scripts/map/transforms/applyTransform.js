import { gS } from "../../global/paramsGlobal";
import { mS } from "../paramsMap";

export const applyTransform = function () {
	var maxTransX, maxTransY, minTransX, minTransY, group;

	const space = 0;

	// Рассчитаем пороговые значения для смещения по оси x
	if (mS.base.baseWidth * mS.base.scale <= mS.base.width) {
		// Карта целиком помещается на холст
		maxTransX = (mS.base.width - mS.base.baseWidth * mS.base.scale) / (2 * mS.base.scale);
		minTransX = (mS.base.width - mS.base.baseWidth * mS.base.scale) / (2 * mS.base.scale);
	} else {
		// Не влазит
		maxTransX = 0;
		minTransX = (mS.base.width - mS.base.baseWidth * mS.base.scale) / mS.base.scale;
	}
	// Ограничим смещение пороговыми значениями по оси x
	if (mS.transform.transX > maxTransX + space) {
		mS.transform.transX = maxTransX + space;
	} else if (mS.transform.transX < minTransX - space) {
		mS.transform.transX = minTransX - space;
	}

	// Рассчитаем пороговые значения для смещения по оси y
	if (mS.base.baseHeight * mS.base.scale <= mS.base.height) {
		maxTransY = (mS.base.height - mS.base.baseHeight * mS.base.scale) / (2 * mS.base.scale);
		minTransY = (mS.base.height - mS.base.baseHeight * mS.base.scale) / (2 * mS.base.scale);
	} else {
		maxTransY = 0;
		minTransY = (mS.base.height - mS.base.baseHeight * mS.base.scale) / mS.base.scale;
	}
	// Ограничим смещение пороговыми значениями по оси y
	if (mS.transform.transY > maxTransY + space) {
		mS.transform.transY = maxTransY + space;
	} else if (mS.transform.transY < minTransY - space) {
		mS.transform.transY = minTransY - space;
	}

	// Сгруппируем все объекты на холсте и применим трансформацию
	group = new fabric.Group(gS.canvas.getObjects());
	group.scaleX = mS.base.scale / gS.canvas.scale;
	group.scaleY = mS.base.scale / gS.canvas.scale;

	group.left = mS.transform.transX * mS.base.scale;
	group.top = mS.transform.transY * mS.base.scale;

	mS.transform.mapOffsetY = group.top;
	mS.transform.mapOffsetX = group.left;

	group.destroy();

	// Обновим глобальный масштаб на холсте
	gS.canvas.scale = mS.base.scale;

	// Рендер холста
	gS.canvas.renderAll();
};
