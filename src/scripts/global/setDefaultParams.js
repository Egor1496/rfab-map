import { mS, getDefaultMS } from "../map/paramsMap";
import { gS, getDefaultGS } from "./paramsGlobal";

const setDefault = (obj, defF) => {
	const defObj = defF();

	for (let key in defObj) obj[key] = defObj[key];
};

export const setDefaultParams = () => {
	gS.listMarkers.length = 0;

	gS.listPath.length = 0;
	gS.listPathCanvas.length = 0;

	gS.cleanLoc.length = 0;

	setDefault(gS, getDefaultGS);
	setDefault(mS, getDefaultMS);
};
