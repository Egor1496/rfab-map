import { gS } from "./paramsGlobal";

export const loadCurrentData = async (loadMarkers, loadPath) => {
	const markers = await import(`../../data/markers/${gS.typeMap}.json`);

	loadMarkers([...markers.default]);

	const path = await import(`../../data/path/${gS.typeMap}.json`);

	loadPath([...path.default]);

	// const pathM = `../../data/markers/${gS.typeMap}.json`,
	// 	pathP = `../../data/path/${gS.typeMap}.json`;
	// import(pathM)
	// 	.then((obj) => loadMarkers([...obj.default]))
	// 	.catch((err) => console.log(err));
	// import(pathP)
	// 	.then((obj) => loadPath([...obj.default]))
	// 	.catch((err) => console.log(err));
};
