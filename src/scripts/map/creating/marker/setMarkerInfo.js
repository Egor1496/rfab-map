import { gS } from "../../../global/paramsGlobal";

const clearInfo = () => {
	gS.markerInfo.title = "";
	gS.markerInfo.description = "";
	gS.markerInfo.bossList = [];
	gS.markerInfo.taskList = [];
	gS.markerInfo.prizeList = [];
	gS.markerInfo.prizeIcon = [];
	gS.markerInfo.md = "";
};

export const setMarkerInfo = (mark, oImg) => {
	gS.markerInfo.oImg = oImg || {};

	clearInfo();

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
