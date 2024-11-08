import { configureStore } from "@reduxjs/toolkit";

import dataLoadReducer from "./slice/dataLoad.slice";
import menuSelectedReducer from "./slice/menuSelected.slice";
import eventsReducer from "./slice/events.slice";
import settingsReducer from "./slice/settings.slice";
import modalVisibleReducer from "./slice/modalVisible.slice";
import pathNamesReducer from "./slice/pathNames.slice";
import floatTooltipReducer from "./slice/floatTooltip.slice";

export const store = configureStore({
	reducer: {
		dataLoadReducer,
		menuSelectedReducer,
		eventsReducer,
		settingsReducer,
		modalVisibleReducer,
		pathNamesReducer,
		floatTooltipReducer,
	},
});
