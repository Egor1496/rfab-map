import { pM } from "../paramsMap";

// Вычисляет координаты с учетом размера, масштаба, зума и смещения карты.
export const getScaledPos = (top, left) => ({
	top: top * pM.coeffHeight * pM.base.coeffScale + pM.transform.transY * pM.base.scale,
	left: left * pM.coeffWidth * pM.base.coeffScale + pM.transform.transX * pM.base.scale,
});
