import { pM } from "../../paramsMap";

import { store } from "../../../../store/store";

import { createPath } from "./createPath";

export const isCreateNewPath = () =>
	store.getState().modalVisibleReducer.createPathMV && !pM.hasMoved;

export const createNewPath = () => {
	pM.propsCreatedPath.t = pM.cursor.pageY;
	pM.propsCreatedPath.l = pM.cursor.pageX;

	pM.сreatedPath.push({ ...pM.propsCreatedPath });

	pM.canvas.remove(...pM.сreatedPathCanvas);
	pM.сreatedPathCanvas.length = 0;

	createPath(pM.сreatedPath, pM.сreatedPathCanvas);
};

export const cancelPoint = () => {
	if (!pM.сreatedPath.length) return;

	pM.сreatedPath.length = pM.сreatedPath.length - 1;

	pM.canvas.remove(...pM.сreatedPathCanvas);
	pM.сreatedPathCanvas.length = 0;

	if (pM.сreatedPath.length) createPath(pM.сreatedPath, pM.сreatedPathCanvas);
};

export const deleteNewPath = () => {
	pM.canvas.remove(...pM.сreatedPathCanvas);

	pM.сreatedPathCanvas.length = 0;
	pM.сreatedPath.length = 0;
};
