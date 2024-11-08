export const getDefaultGS = () => {
	return {
		typeMap: "", // Тип активной карты.

		urlMarkers: "./assets/images/markers/",
		urlMarkersType: "v1/",

		isClickDownMarker: false, // Нажата ли m1 на метке.
		mouseDownWindow: false, // Нажата ли m1 на сайте.
		isMove: false, // Можно ли перемещаться по карте.
		hasMoved: false, // Происходило ли перемещение на карте.
		keyDown: "", // текущая нажатая кнопка клаивтуры.

		$element: null, // element canvas.
		canvas: null, // fabricCanvas.
		map: null, // fabricMap.

		listMarkers: [], // Список маршрутов json.

		listPath: [], // Список путей json.
		listPathCanvas: [], // Список загруженных fabric obj путей.

		propsCreatedPath: {}, // Свойства новой точки.
		сreatedPath: [], // Новые точки для создания маршрута.
		сreatedPathCanvas: [], // Список загруженных fabric obj новых точек.

		currentPath: null, // Текущий маршрут (объект).
		currentPathNumber: -1, // Текущий номер маршрута.

		cleanLoc: [], // Список X меток.

		// Информация при наведении на метку.
		markerInfo: {
			oImg: null, // fabrik objImg.
			isActive: false, // Статус Фильтра.
			isClean: false,
			top: 0,
			left: 0,
			title: "",
			description: "",
			bossList: [],
			taskList: [],
			prize: [],
			prizeIcon: [],
		},
	};
};

export const gS = getDefaultGS();
