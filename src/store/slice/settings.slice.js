import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fpsMap: Number(localStorage.getItem("rfab-map-fpsMap")) || 60,
	hdMap: localStorage.getItem("rfab-map-hdMap") || "sd",
	hdMarker: localStorage.getItem("rfab-map-hdMarker") || "hd",
	typeModeInfo: true,
	toggleModeInfo: localStorage.getItem("rfab-map-toggleModeInfo") || "0",
	filterDisplayMode: localStorage.getItem("rfab-map-filterDisplayMode") || "0",
	cleanDisplayMode: localStorage.getItem("rfab-map-cleanDisplayMode") || "0",
	tooltip: false,
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		setFpsMap(state, action) {
			state.fpsMap = action.payload;
			localStorage.setItem("rfab-map-fpsMap", action.payload);
		},
		setHdMap(state, action) {
			state.hdMap = action.payload;
			localStorage.setItem("rfab-map-hdMap", action.payload);
		},
		setHdMarker(state, action) {
			state.hdMarker = action.payload;
			localStorage.setItem("rfab-map-hdMarker", action.payload);
		},
		setTypeModeInfo(state, action) {
			state.typeModeInfo = action.payload;
		},
		setToggleModeInfo(state, action) {
			state.toggleModeInfo = action.payload;
			localStorage.setItem("rfab-map-toggleModeInfo", action.payload);
		},
		setFilterDisplay(state, action) {
			state.filterDisplayMode = action.payload;
			localStorage.setItem("rfab-map-filterDisplayMode", action.payload);
		},
		setCleanDisplay(state, action) {
			state.cleanDisplayMode = action.payload;
			localStorage.setItem("rfab-map-cleanDisplayMode", action.payload);
		},
	},
});

export const {
	setFpsMap,
	setHdMap,
	setHdMarker,
	setTypeModeInfo,
	setToggleModeInfo,
	setFilterDisplay,
	setCleanDisplay,
} = settingsSlice.actions;
export default settingsSlice.reducer;
