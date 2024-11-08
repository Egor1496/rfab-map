import { handlerMouseout, handlerMouseover, handlerMouseup } from "../../handlers/handlersPath";

import { mC, mS } from "../../paramsMap";
import { gS } from "../../../global/paramsGlobal";
import { getScaledPos } from "../../transforms/getScaledPos";

export const drawPoint = (point, callback) => {
	const posIcon = getScaledPos(point.t, point.l);

	fabric.Image.fromURL(
		`${gS.urlMarkers}${gS.urlMarkersType}${mC.namePoint[point.ty]}.png`,
		(oImg) => {
			oImg
				.set("hasControls", false)
				.set("hasBorders", false)
				.set("selectable", false)
				.set("originX", "center")
				.set("originY", "center")
				.set("top", posIcon.top)
				.set("left", posIcon.left)
				.scale((mC.scalePoint[point.ty] * mS.base.coeffScale) / 7.5);

			if (point.ty === 1) {
				oImg.on("mouseover", () => handlerMouseover(point, oImg));
				oImg.on("mouseout", () => handlerMouseout(oImg));
			}

			oImg.on("mouseup", () => handlerMouseup());

			if (point.ty === 0) oImg.moveTo(1);

			gS.canvas.add(oImg);

			callback(oImg);
		}
	);
};

export const drawLine = (props, callback) => {
	const { position, typeLine, colorLine } = props;

	const line = new fabric.Line(position, {
		stroke: colorLine,
		strokeWidth: 2.5 * props.scale,
		hasControls: false,
		hasBorders: false,
		hasRotatingPoint: false,
		hasControls: false,
		selectable: false,
		cornerSize: 0,
		strokeLineCap: "round",
	});

	if (typeLine === 2) line.set("strokeDashArray", [10 * mS.base.scale, 10 * mS.base.scale]);
	else if (typeLine === 3) line.set("strokeDashArray", [1 * mS.base.scale, 20 * mS.base.scale]);

	gS.canvas.add(line);
	line.moveTo(1);

	callback(line);
};
