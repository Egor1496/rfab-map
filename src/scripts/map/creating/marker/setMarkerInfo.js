import { pM } from "../../paramsMap";

const clearInfo = () => {
	pM.markerInfo.id = "id-1";
	pM.markerInfo.nameIcon = "";
	pM.markerInfo.type = "";
	pM.markerInfo.top = "0";
	pM.markerInfo.left = "0";
	pM.markerInfo.title = "";
	pM.markerInfo.description = "";
	pM.markerInfo.quests = [];
	pM.markerInfo.bossList = [];
	pM.markerInfo.prizeList = [];
	pM.markerInfo.prizeIcon = [];
	pM.markerInfo.md = "";
};

export const setMarkerInfo = (mark, oImg) => {
	pM.markerInfo.oImg = oImg || {};

	clearInfo();

	if (mark.de) {
		pM.markerInfo.description = mark.de;
		return;
	}

	pM.markerInfo.id = mark.id || "-1";
	pM.markerInfo.nameIcon = mark.nameIcon || "";
	pM.markerInfo.type = mark.type || "";

	pM.markerInfo.top = mark.top || "0";
	pM.markerInfo.left = mark.left || "0";

	pM.markerInfo.title = mark.title || "";
	pM.markerInfo.description = mark.description || "";

	pM.markerInfo.quests = mark.quests || [];
	pM.markerInfo.bossList = mark.bossList || [];
	pM.markerInfo.prizeList = mark.prizeList || [];
	pM.markerInfo.prizeIcon = mark.prizeIcon || [];

	pM.markerInfo.md = mark.md || "";
};
