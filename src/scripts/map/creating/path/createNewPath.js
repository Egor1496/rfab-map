import { store } from "../../../../store/store";

import { gS } from "../../../global/paramsGlobal";
import { mS } from "../../paramsMap";

import { createPath } from "./createPath";

export const isCreateNewPath = () =>
	store.getState().modalVisibleReducer.createPathMV && !gS.hasMoved;

export const createNewPath = () => {
	gS.propsCreatedPath.t = mS.cursor.pageY;
	gS.propsCreatedPath.l = mS.cursor.pageX;

	gS.сreatedPath.push({ ...gS.propsCreatedPath });

	gS.canvas.remove(...gS.сreatedPathCanvas);
	gS.сreatedPathCanvas.length = 0;

	createPath(gS.сreatedPath, gS.сreatedPathCanvas);
};

export const cancelPoint = () => {
	if (!gS.сreatedPath.length) return;

	gS.сreatedPath.length = gS.сreatedPath.length - 1;

	gS.canvas.remove(...gS.сreatedPathCanvas);
	gS.сreatedPathCanvas.length = 0;

	if (gS.сreatedPath.length) createPath(gS.сreatedPath, gS.сreatedPathCanvas);
};

export const deleteNewPath = () => {
	gS.canvas.remove(...gS.сreatedPathCanvas);

	gS.сreatedPathCanvas.length = 0;
	gS.сreatedPath.length = 0;
};
