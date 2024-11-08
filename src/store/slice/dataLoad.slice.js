import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoadPath: false };

const dataLoadSlice = createSlice({
	name: "dataLoad",
	initialState,
	reducers: {
		isLoadPath(state, action) {
			state.isLoadPath = action.payload;
		},
	},
});

export const { isLoadPath } = dataLoadSlice.actions;
export default dataLoadSlice.reducer;
