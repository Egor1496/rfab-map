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

import { gS } from "../global/paramsGlobal";
import { mS } from "./paramsMap";

import { rfabParser } from "../global/rfabParser";

const loadMarkers = (dataMarkers) => {
	gS.listMarkers = dataMarkers;

	if (gS.listMarkers) createMarkers(); // Добавить метки на карту.

	rfabParser(gS.listMarkers);
};

const loadPath = (dataPath) => {
	setOldStorePath();

	gS.listPath = [...dataPath, ...getLocalStorePath(gS.typeMap)];

	// Добавить пути на карту.
	if (gS.listPath) createPath(gS.listPath[getLocalStoreActivePath()]?.l, gS.listPathCanvas);

	store.dispatch(activePath(getLocalStoreActivePath()));
	store.dispatch(isLoadPath(true));
	store.dispatch(pathNames(gS.listPath.map((path) => path.n)));
};

export const createMap = (setIsLoadMap) => {
	store.dispatch(activeMap(gS.typeMap));

	const url = `./assets/images/map/${gS.typeMap}-map-min-filter.jpg`;

	fabric.util.loadImage(url, function (img) {
		gS.map = new fabric.Image(img);

		// Установим начальные и текущие размеры
		mS.base.baseHeight = gS.map.height;
		mS.base.baseWidth = gS.map.width;

		mS.base.height = gS.$element.height();
		mS.base.width = gS.$element.width();

		// Отключим любую возможность редактирования и выбора карты как объекта на холсте
		gS.map.set({
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
		mS.base.baseScale = mS.base.scale;
		mS.base.coeffScale = mS.base.scale / mS.base.baseScale;

		gS.canvas.add(gS.map); // Добавить карту на холст.
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
