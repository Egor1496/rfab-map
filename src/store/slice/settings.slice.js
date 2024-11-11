import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fps: 60,
	HDMap: false,
	filterDisplayMode: "visible",
	tooltip: false,
	hideTypeMarker: [],
	toggleModeInfo: Boolean(Number(localStorage.getItem("rfab-map-toggleModeInfo") || true)),
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		set(state, action) {
			state.state = action.payload;
		},
		setToggleModeInfo(state) {
			state.toggleModeInfo = !state.toggleModeInfo;

			localStorage.setItem("rfab-map-toggleModeInfo", Number(state.toggleModeInfo));
		},
	},
});

export const { set, setToggleModeInfo } = settingsSlice.actions;
export default settingsSlice.reducer;
