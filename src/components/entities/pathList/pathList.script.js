import { gS } from "../../../scripts/global/paramsGlobal";
import { deleteStorePath, setLocalStoreActivePath } from "../../../scripts/global/localStore";
import { downloadFilePath } from "../../../scripts/global/filePath";

import { createPath } from "../../../scripts/map/creating/path/createPath";

import { activePath } from "../../../store/slice/menuSelected.slice";
import { deletPathName } from "../../../store/slice/pathNames.slice";

export const handlerClickPath = (selectActivePath, dispatch, numberPath) => {
	// Удалить пути.
	gS.canvas.remove(...gS.listPathCanvas);
	gS.listPathCanvas.length = 0;

	if (gS.listPath)
		if (selectActivePath != numberPath) {
			setLocalStoreActivePath(numberPath);
			dispatch(activePath(numberPath));

			createPath(gS.listPath[numberPath]?.l, gS.listPathCanvas);
		} else {
			setLocalStoreActivePath(-1);
			dispatch(activePath(-1));
		}
};

export const handlerContextPath = (e, cm) => {
	cm.current.show(e);
};

export const handlerDownloadPath = (pathNumber) => {
	const path = gS.listPath[pathNumber];
	downloadFilePath(JSON.stringify(path.l), path.n);
};

export const handlerDeletePath = (selectActivePath, dispatch, contextPathNumber) => {
	if (selectActivePath === contextPathNumber) {
		setLocalStoreActivePath(-1);
		dispatch(activePath(-1));
		gS.canvas.remove(...gS.listPathCanvas);
	}

	if (selectActivePath > contextPathNumber) dispatch(activePath(selectActivePath - 1));

	deleteStorePath(contextPathNumber);
	dispatch(deletPathName(contextPathNumber));
};
