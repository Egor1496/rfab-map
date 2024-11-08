import { getPropsLine } from "./getPropsLine";
import { drawLine, drawPoint } from "./draw";

const getDefault = (path) => {
	return path.map((point) => {
		const newPoint = { ...point };

		if (typeof newPoint.ty === "undefined") newPoint.ty = 0;
		if (typeof newPoint.li === "undefined") newPoint.li = 1;
		if (typeof newPoint.lc === "undefined") newPoint.lc = "#61ff49";
		if (typeof newPoint.de === "undefined") newPoint.de = "";

		return newPoint;
	});
};

export const createPath = (path, listPathCanvas) => {
	if (!path?.length) return;

	const newPath = getDefault(path);

	if (newPath[0].ty >= 0) drawPoint(newPath[0], (pointObj) => listPathCanvas.push(pointObj));

	for (let i = 1; i < newPath.length; i++) {
		const propsLine = getPropsLine(newPath[i - 1], newPath[i]);

		if (newPath[i].ty >= 0) drawPoint(newPath[i], (pointObj) => listPathCanvas.push(pointObj));
		if (newPath[i].li > 0) drawLine(propsLine, (lineObj) => listPathCanvas.push(lineObj));
	}
};
