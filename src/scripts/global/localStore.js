import { pM } from "../map/paramsMap";

import { transformPathObj } from "./transformPathObj";

export const setLocalStoreFilter = (typeFilter) => {
	const key = "rfab-map-activeFilter";
	const oldTypeFilter = JSON.parse(localStorage.getItem(key) || "{}");

	const value = { ...oldTypeFilter, [pM.typeMap]: typeFilter };

	localStorage.setItem(key, JSON.stringify(value));
};

export const setLocalStoreCleanLoc = (listId) => {
	const key = "rfab-map-cleanLoc";
	const oldCleanLoc = JSON.parse(localStorage.getItem(key) || "{}");

	const value = { ...oldCleanLoc, [pM.typeMap]: listId };

	localStorage.setItem(key, JSON.stringify(value));
};

//  (set) addLocalStorePath!!!!
export const setLocalStorePath = (newPathList, typeMap) => {
	const key = "rfab-map-pathList";
	const oldPathList = JSON.parse(localStorage.getItem(key) || "{}");

	const value = { ...oldPathList, [typeMap]: [...(oldPathList[typeMap] || []), ...newPathList] };

	localStorage.setItem(key, JSON.stringify(value));
};

export const setOldStorePath = () => {
	const oldPathListSky = JSON.parse(localStorage.getItem("listPathSky")) || [],
		oldPathListSols = JSON.parse(localStorage.getItem("listPathSols")) || [];

	localStorage.removeItem("listPathSky");
	localStorage.removeItem("listPathSols");

	const pathListSky = [],
		pathListSols = [];

	oldPathListSky.forEach((path, i) => pathListSky.push(transformPathObj(path, i)));
	oldPathListSols.forEach((path, i) => pathListSols.push(transformPathObj(path, i)));

	setLocalStorePath(pathListSky, "skyrim");
	setLocalStorePath(pathListSols, "solstheim");
};

export const getLocalStorePath = (typeMap) => {
	const pathList = JSON.parse(localStorage.getItem("rfab-map-pathList") || "{}");

	return pathList?.[typeMap] || [];
};

export const setLocalStoreActivePath = (pathNumber) => {
	const key = "rfab-map-activePath";
	const oldTypeFilter = JSON.parse(localStorage.getItem(key) || "{}");

	const value = { ...oldTypeFilter, [pM.typeMap]: pathNumber };

	localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStoreActivePath = () =>
	Number(JSON.parse(localStorage.getItem("rfab-map-activePath"))?.[pM.typeMap]) ?? -1;

export const deleteStorePath = (pathNumber) => {
	const allPath = JSON.parse(localStorage.getItem("rfab-map-pathList") || "{}");

	allPath[pM.typeMap].splice(pathNumber, 1);

	localStorage.setItem("rfab-map-pathList", JSON.stringify(allPath));
};
