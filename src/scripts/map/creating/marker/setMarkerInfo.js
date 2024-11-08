import { gS } from "../../../global/paramsGlobal";

export const setMarkerInfo = (mark, oImg) => {
	gS.markerInfo.oImg = oImg || {};

	if (mark.de) {
		gS.markerInfo.description = mark.de;
		return;
	}

	gS.markerInfo.title = mark.title || "";
	gS.markerInfo.description = mark.description || "";

	gS.markerInfo.bossList = mark.bossList || [];
	gS.markerInfo.taskList = mark.taskList || [];

	gS.markerInfo.prizeList = mark.prizeList || [];
	gS.markerInfo.prizeIcon = mark.prizeIcon || [];

	gS.markerInfo.md = mark.md || "";
};
