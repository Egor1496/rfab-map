import { pM } from "../map/paramsMap";

export const loadCurrentData = async (loadMarkers, loadPath) => {
	const markers = await import(`../../data/markers/${pM.typeMap}.json`);

	loadMarkers([...markers.default]);

	const path = await import(`../../data/path/${pM.typeMap}.json`);

	loadPath([...path.default]);
};
