import { mC, mS } from "../paramsMap";

// Вычисляет координаты с учетом размера, масштаба, зума и смещения карты.
export const getScaledPos = (top, left) => ({
	top: top * mC.coeffHeight * mS.base.coeffScale + mS.transform.transY * mS.base.scale,
	left: left * mC.coeffWidth * mS.base.coeffScale + mS.transform.transX * mS.base.scale,
});
