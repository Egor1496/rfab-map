import { getScaledPos } from "../../transforms/getScaledPos";

import { mS } from "../../paramsMap";

export const getPropsLine = (prevPoint, nextPoint) => {
	const posPrevPoint = getScaledPos(prevPoint.t - 0.7, prevPoint.l - 0.7),
		posNextPoint = getScaledPos(nextPoint.t - 0.7, nextPoint.l - 0.7);

	return {
		position: [posPrevPoint.left, posPrevPoint.top, posNextPoint.left, posNextPoint.top],
		typeLine: nextPoint.li,
		colorLine: nextPoint.lc,
		scale: mS.base.scale * 2,
	};
};
