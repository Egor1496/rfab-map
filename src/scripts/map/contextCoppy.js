import { pM } from "./paramsMap";

const types = {
	coordMap: () => {
		return `"top": ${pM.cursor.pageY}, "left": ${pM.cursor.pageX},`;
	},
	newMarker: () => {
		return JSON.stringify({
			title: "OOOOO (<q lbl>0</q><q tm llbl>lvl</q>)",
			description: "",
			quests: [],
			id: "id-1",
			top: pM.cursor.pageY,
			left: pM.cursor.pageX,
			type: "",
			nameIcon: "",
			bossList: [],
			prizeList: [],
		});
	},
	id: () => {
		return pM.markerInfo.id;
	},
	coordMarker: () => {
		return `"top": ${pM.markerInfo.top}, "left": ${pM.markerInfo.left},`;
	},
	icon: () => {
		return pM.markerInfo.nameIcon;
	},
	obj: () => {
		return JSON.stringify(pM.markerInfo);
	},
};

export const contextCoppy = (type = "id") => {
	navigator.clipboard.writeText(types[type]());
};
