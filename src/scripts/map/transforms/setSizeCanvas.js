import $ from "jquery";

import { pM } from "../paramsMap";

export const setSizeCanvas = (canvas) => {
	const coeffWidth = $("body").width() / canvas.width, // коэфф-нт увеличения.
		coeffHeight = $("body").height() / canvas.height; // коэфф-нт увеличения.

	const coeffAbs = coeffWidth > coeffHeight ? coeffWidth : coeffHeight; // коэфф-нт увеличения размера карты.

	pM.coeffHeight = Math.ceil(coeffAbs * 100) / 100;
	pM.coeffWidth = Math.ceil(coeffAbs * 100) / 100;

	canvas.height *= pM.coeffHeight;
	canvas.width *= pM.coeffWidth;
};
