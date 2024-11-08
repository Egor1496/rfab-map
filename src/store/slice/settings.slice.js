import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fps: 60,
	HDMap: false,
	filterDisplayMode: "visible",
	tooltip: false,
	hideTypeMarker: [],
};

const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		set(state, action) {
			state.state = action.payload;
		},
	},
});

export const { set } = settingsSlice.actions;
export default settingsSlice.reducer;
