import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	activePath: -1,
	activeFilter: "",
	activeMap: "skyrim",
};

const menuSelectedSlice = createSlice({
	name: "menuSelected",
	initialState,
	reducers: {
		activePath(state, action) {
			state.activePath = action.payload;
		},
		activeMap(state, action) {
			state.activeMap = action.payload;
		},
		activeFilter(state, action) {
			state.activeFilter = action.payload;
		},
	},
});

export const { activePath, activeMap, activeFilter } = menuSelectedSlice.actions;
export default menuSelectedSlice.reducer;
