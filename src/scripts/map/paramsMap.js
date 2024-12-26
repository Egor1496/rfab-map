export const getDefaultPM = () => {
	const map = {
		coeffHeight: 0,
		coeffWidth: 0,

		maxZoom: 14, // Максимальный зум карты.
		minZoom: 2, // Минимальный зум карты.

		iconHoverZoom: 1.3, // Увеличение метки при наведении.
		iconScaleDefault: 0.3, // Размер иконок по умолчанию.

		typeMap: "", // Тип активной карты.
		typeFilter: "", // Тип активного фильтра.

		urlMarkers: "./assets/images/markers/",
		urlMarkersType: (localStorage.getItem("rfab-map-hdMarker") || "hd") + "/",
		imgMF: localStorage.getItem("rfab-map-hdMarker") === "svg" ? ".svg" : ".png",

		$element: null, // element canvas.
		canvas: null, // fabricCanvas.
		map: null, // fabricMap.

		fpsMap: 1000 / (Number(localStorage.getItem("rfab-map-fpsMap")) || 60), // фпс при даижении карты.
		fpsInterval: [],
		isMove: false, // Можно ли перемещаться по карте. (фпс перемещения)
	};

	const handler = {
		mouseDownWindow: false, // Нажата ли m1 на карте.
		isClickDownMarker: false, // Нажата ли m1 на метке.
		isContextShow: false, // Открыто ли контекстное меню карты.
		isMouseoverMarker: true, // Наведен ли курсор карту.
		hasMoved: false, // Происходило ли перемещение на карте. (спустя 100ms после нажатия m1)
	};

	const canvasTransform = {
		base: {
			baseWidth: 0, // Начальная ширина.
			baseHeight: 0, // Начальная высота.

			width: 0, // текущая ширина карты.
			height: 0, // текущая высота карты.

			baseScale: 0, // Начальный масштаб.
			coeffScale: 1, // Коэффициент изменения масштаба карты.
			scale: 2, // текущий масштаб карты в целом.
		},
		zoom: {
			currentZoom: 0, // Текущий шаг увеличения.
			stepZoomMap: 0.07, // Шаг увеличения карты.
		},
		transform: {
			transX: 0, // текущее смещение карты по оси x.
			transY: 0, // текущее смещение карты по оси y.

			mapOffsetY: 0, // Внутренний отступ карты от холста (top).
			mapOffsetX: 0, // Внутренний отступ карты от холста (left).
		},
		cursor: {
			winMouseX: 0, // Курсор по оси X (от окна).
			winMouseY: 0, // Курсор по оси Y (от окна).

			pageY: 0, // Курсор по оси X (от края карты с учетом увеличения, отступа и зума).
			pageX: 0, // Курсор по оси Y (от края карты с учетом увеличения, отступа и зума).

			pageMY: 0, // Курсор по оси X (от холста).
			pageMX: 0, // Курсор по оси Y (от холста).
		},
	};

	const marker = {
		cleanLoc: [], // Список X меток.

		listMarkers: [], // Список меток json.

		// Информация при наведении на метку.
		markerInfo: {
			oImg: null, // fabrik objImg.
			isActive: false, // Статус Фильтра.
			isClean: false,
			id: "-1",
			nameIcon: "warning",
			md: "",
			type: "",
			top: 0,
			left: 0,
			title: "",
			description: "",
			quests: [],
			bossList: [],
			prize: [],
			prizeIcon: [],
		},

		// Размер иконок.
		scaleIconMarkers: {
			RavenRock: 1,
			Miraak: 0.8,
			Castle_3: 0.8,
			Castle_4: 0.8,
			Riften: 0.6,
			Morthal: 0.6,
			Windhelm: 0.6,
			Dawnstar: 0.6,
			Whiterun: 0.6,
			Solitude: 0.6,
			Falkreath: 0.6,
			Winterhold: 0.6,
			Town: 0.5,
			Markarth: 0.55,
			BluePalace: 0.5,
			MistveilKeep: 0.5,
			TelvanniTower: 0.5,
			OrcStronghold: 0.5,
			JarlResidence: 0.5,
			StandingStones: 0.5,
			UnderstoneKeep: 0.5,
			PalaceoftheKings: 0.5,
			CollegeofWinterhold: 0.5,
			Tomb: 0.4,
			Cave: 0.4,
			Fort: 0.4,
			Farm: 0.4,
			NordicDwelling: 0.4,
			Lode: 0.2,
			Loot: 0.2,
			Star: 0.2,
			Altar: 0.2,
			Bandit: 0.2,
			caretaker: 1.3,
			portalCairn: 0.7,
			lich: 0.8,
			skullBones: 0.6,
			skulls: 0.6,
			skull: 0.4,
		},

		// Типы иконок модальки маркера
		prizeType: {
			"coin.png": {
				width: "20",
				color: "#f7f067",
				tooltip: "Ценный лут",
			},
			"chest-sm.png": {
				height: "20",
				color: "#6c5234",
				tooltip: "Небольшой сундук",
			},
			"book.png": {
				height: "20",
				color: "#fff",
				tooltip: "Книга опыта",
			},
			"purse.png": {
				height: "20",
				color: "#b55b1d",
				tooltip: "Кошелечек",
			},
			"satchel.png": {
				height: "20",
				color: "#6c5234",
				tooltip: "Сумочка алхимика",
			},
			"сhaurus.png": {
				width: "21",
				color: "#b1f1fd",
				tooltip: "Яйцо коруса",
			},
			"roc.webp": {
				height: "25",
				color: "#f682c2",
				tooltip: "Камень Барензии",
			},
			"chest.png": {
				height: "36",
				color: "#d7bf71",
				tooltip: "Мастерский сундук",
			},
			"bottleH.png": {
				height: "35",
				color: "#f17c68",
				tooltip: "Превосходка ХП",
			},
			"bottleS.png": {
				height: "35",
				color: "#50c558",
				tooltip: "Превосходка СТ",
			},
			"bottleM.png": {
				height: "35",
				color: "#80a9d3",
				tooltip: "Превосходка МП",
			},
			"bottleW.png": {
				height: "25",
				width: "12",
				color: "#d1bd5c",
				tooltip: "Превосходка веса",
			},
			"bottleP.png": {
				height: "25",
				color: "#90704d",
				tooltip: "Паралич",
			},
			"skooma.png": {
				height: "25",
				color: "#f76caf",
				tooltip: "Скума",
			},
			"daedra.png": {
				height: "25",
				color: "#f2180b",
				tooltip: "Сердце даэдра",
			},
			"knapsack.png": {
				height: "20",
				color: "#a08d94",
				tooltip: "Портфель",
			},
			"Safe.webp": {
				height: "20",
				color: "#778b9c",
				tooltip: "Сейф",
			},
		},
	};

	const path = {
		listPath: [], // Список маршрутов json.
		listPathCanvas: [], // Список загруженных fabric obj путей.

		propsCreatedPath: {}, // Свойства новой точки.
		сreatedPath: [], // Новые точки для создания маршрута.
		сreatedPathCanvas: [], // Список загруженных fabric obj новых точек.

		currentPath: null, // Текущий маршрут (объект).
		currentPathNumber: -1, // Текущий номер маршрута.

		lineColor: "#2cf704", // Цвет линий маршрута по умолчанию

		// Тип точек маршрута.
		namePoint: {
			0: "Knot",
			1: "Point",
		},

		// Размер точек маршрута.
		scalePoint: {
			0: 0.1,
			1: 0.3,
		},
	};

	return { ...map, ...handler, ...canvasTransform, ...marker, ...path };
};

export const pM = getDefaultPM();
