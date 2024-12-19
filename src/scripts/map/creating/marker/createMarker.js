import { pM } from "../../paramsMap";

import {
	handlerMouseover,
	handlerMouseout,
	handlerMouseDown,
	handlerMouseup,
	handlerMousedblclick,
} from "../../handlers/handlersMarker";

import { getScaleIcon } from "../../transforms/getScaleIcon";
import { getScaledPos } from "../../transforms/getScaledPos";
import { setVisibleMarker } from "../../transforms/setVisibleMarker";

export const createMarker = (marker) => {
	const scale = getScaleIcon(marker);
	const pos = getScaledPos(marker.top, marker.left);

	const urlCleanIcon = pM.urlMarkers + "Cross.png";

	const urlImg =
		pM.urlMarkers +
		pM.urlMarkersType +
		(marker.nameIcon || "Warning") +
		(marker.isActive ? "_F" : "") +
		pM.imgMF;

	fabric.Image.fromURL(marker.isClean ? urlCleanIcon : urlImg, (oImg) => {
		oImg
			.set("originX", "center")
			.set("originY", "center")
			.set("hasControls", false)
			.set("hasBorders", false)
			.set("selectable", false)
			.set("cornerSize", 0)
			.set("top", pos.top)
			.set("left", pos.left)
			.set("scaleX", scale)
			.set("scaleY", scale);

		oImg.on("mouseover", (e) => handlerMouseover(marker, oImg)); // Курсор оказывается над элементом.
		oImg.on("mouseout", (e) => handlerMouseout(oImg)); // Курсор уходит с элемента.
		oImg.on("mousedown", (e) => handlerMouseDown(marker, oImg)); // m1 нажата над элементом.
		oImg.on("mouseup", (e) => handlerMouseup(oImg)); // m1 отпущена над элементом.
		oImg.on("mousedblclick", (e) => handlerMousedblclick(marker, oImg)); // Двойное нажатие m1

		marker.oImg = oImg;

		setVisibleMarker(marker);

		pM.canvas.add(oImg);
	});
};
