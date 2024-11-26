import { pM, getDefaultPM } from "../map/paramsMap";

const setDefault = (obj, defF) => {
	const defObj = defF();

	for (let key in defObj) obj[key] = defObj[key];
};

export const setDefaultParams = () => {
	pM.listMarkers.length = 0;

	pM.listPath.length = 0;
	pM.listPathCanvas.length = 0;

	pM.cleanLoc.length = 0;

	setDefault(pM, getDefaultPM);
};
