import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pathNames: [],
};

const pathNamesSlice = createSlice({
	name: "pathNames",
	initialState,
	reducers: {
		pathNames(state, action) {
			state.pathNames = action.payload;
		},
		addPathNames(state, action) {
			state.pathNames.push(...action.payload);
		},
		deletPathName(state, action) {
			state.pathNames.splice(action.payload, 1);
		},
	},
});

export const { pathNames, addPathNames, deletPathName } = pathNamesSlice.actions;
export default pathNamesSlice.reducer;
