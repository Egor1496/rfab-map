import $ from "jquery";

import { mC } from "../paramsMap";

export const setSizeCanvas = (canvas) => {
	const coeffWidth = $("body").width() / canvas.width, // коэфф-нт увеличения.
		coeffHeight = $("body").height() / canvas.height; // коэфф-нт увеличения.

	const coeffAbs = coeffWidth > coeffHeight ? coeffWidth : coeffHeight; // коэфф-нт увеличения размера карты.

	mC.coeffHeight = Math.ceil(coeffAbs * 100) / 100;
	mC.coeffWidth = Math.ceil(coeffAbs * 100) / 100;

	canvas.height *= mC.coeffHeight;
	canvas.width *= mC.coeffWidth;
};
