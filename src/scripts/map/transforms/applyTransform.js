import { pM } from "../paramsMap";

export const applyTransform = function () {
	var maxTransX, maxTransY, minTransX, minTransY, group;

	const MarginX = 0,
		MarginY = 0;

	// Рассчитаем пороговые значения для смещения по оси x
	if (pM.base.baseWidth * pM.base.scale <= pM.base.width) {
		// Карта целиком помещается на холст
		maxTransX = (pM.base.width - pM.base.baseWidth * pM.base.scale) / (2 * pM.base.scale);
		minTransX = (pM.base.width - pM.base.baseWidth * pM.base.scale) / (2 * pM.base.scale);
	} else {
		// Не влазит
		maxTransX = 0;
		minTransX = (pM.base.width - pM.base.baseWidth * pM.base.scale) / pM.base.scale;
	}

	// Ограничим смещение пороговыми значениями по оси x
	if (pM.transform.transX > maxTransX + MarginX) {
		pM.transform.transX = maxTransX + MarginX;
	} else if (pM.transform.transX < minTransX - MarginX) {
		pM.transform.transX = minTransX - MarginX;
	}

	// Рассчитаем пороговые значения для смещения по оси y
	if (pM.base.baseHeight * pM.base.scale <= pM.base.height) {
		maxTransY = (pM.base.height - pM.base.baseHeight * pM.base.scale) / (2 * pM.base.scale);
		minTransY = (pM.base.height - pM.base.baseHeight * pM.base.scale) / (2 * pM.base.scale);
	} else {
		maxTransY = 0;
		minTransY = (pM.base.height - pM.base.baseHeight * pM.base.scale) / pM.base.scale;
	}

	// Ограничим смещение пороговыми значениями по оси y
	if (pM.transform.transY > maxTransY + MarginY) {
		pM.transform.transY = maxTransY + MarginY;
	} else if (pM.transform.transY < minTransY - MarginY) {
		pM.transform.transY = minTransY - MarginY;
	}

	// Сгруппируем все объекты на холсте и применим трансформацию
	group = new fabric.Group(pM.canvas.getObjects());
	group.scaleX = pM.base.scale / pM.canvas.scale;
	group.scaleY = pM.base.scale / pM.canvas.scale;

	group.left = pM.transform.transX * pM.base.scale;
	group.top = pM.transform.transY * pM.base.scale;

	pM.transform.mapOffsetY = group.top;
	pM.transform.mapOffsetX = group.left;

	group.destroy();

	// Обновим глобальный масштаб на холсте
	pM.canvas.scale = pM.base.scale;

	// Рендер холста
	pM.canvas.renderAll();
};
