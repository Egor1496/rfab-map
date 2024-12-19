import { pM } from "./paramsMap";

import { handlerWindow } from "../global/handlerWindow";
import { bindContainerEvents } from "./handlers/bindContainerEvents";
import { bindContainerTouchEvents } from "./handlers/bindContainerTouchEvents";

import { applyTransform } from "./transforms/applyTransform";
import { setZoomCanvas } from "./transforms/setZoomCanvas";

import { loadCurrentData } from "../global/loadCurrentData";

import { createPath } from "./creating/path/createPath";
import { createMarkers } from "./creating/marker/createMarkers";

import { store } from "../../store/store";
import { isLoadPath } from "../../store/slice/dataLoad.slice";
import { activeMap, activePath } from "../../store/slice/menuSelected.slice";
import { pathNames } from "../../store/slice/pathNames.slice";

import { getLocalStoreActivePath, getLocalStorePath, setOldStorePath } from "../global/localStore";

const loadMarkers = (dataMarkers) => {
	pM.listMarkers = dataMarkers;

	if (pM.listMarkers) createMarkers(); // Добавить метки на карту.
};

const loadPath = (dataPath) => {
	setOldStorePath();

	pM.listPath = [...dataPath, ...getLocalStorePath(pM.typeMap)];

	// Добавить пути на карту.
	if (pM.listPath) createPath(pM.listPath[getLocalStoreActivePath()]?.l, pM.listPathCanvas);

	store.dispatch(activePath(getLocalStoreActivePath()));
	store.dispatch(isLoadPath(true));
	store.dispatch(pathNames(pM.listPath.map((path) => path.n)));
};

export const createMap = (setIsLoadMap) => {
	store.dispatch(activeMap(pM.typeMap));

	const sizeMap = store.getState().settingsReducer.hdMap;

	const url = `./assets/images/map/${sizeMap}/${pM.typeMap}-map.jpg`;

	fabric.util.loadImage(url, function (img) {
		pM.map = new fabric.Image(img);

		// Установим начальные и текущие размеры
		pM.base.baseHeight = pM.map.height;
		pM.base.baseWidth = pM.map.width;

		pM.base.height = pM.$element.height();
		pM.base.width = pM.$element.width();

		// Отключим любую возможность редактирования и выбора карты как объекта на холсте
		pM.map.set({
			hasRotatingPoint: false,
			hasBorders: false,
			hasControls: false,
			lockScalingY: true,
			lockScalingX: true,
			selectable: false,
		});

		setZoomCanvas(); // От масштабируем, чтобы сразу видеть всё карту.

		// Загрузить пути и метки (async)
		loadCurrentData(loadMarkers, loadPath);

		// Обновить значения масштаба.
		pM.base.baseScale = pM.base.scale;
		pM.base.coeffScale = pM.base.scale / pM.base.baseScale;

		pM.canvas.add(pM.map); // Добавить карту на холст.
		applyTransform(); // Применить трансформацию карты.

		setIsLoadMap(true);

		handlerWindow();

		if ("ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
			bindContainerTouchEvents();
		} else {
			bindContainerEvents();
		}
	});
};
