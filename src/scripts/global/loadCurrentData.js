import { gS } from "./paramsGlobal";

export const loadCurrentData = async (loadMarkers, loadPath) => {
	const markers = await import(`../../data/markers/${gS.typeMap}.json`);

	loadMarkers([...markers.default]);

	const path = await import(`../../data/path/${gS.typeMap}.json`);

	loadPath([...path.default]);
};
