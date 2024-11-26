import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isClick: false,
};

const eventsSlice = createSlice({
	name: "events",
	initialState,

	reducers: {
		isClick(state, action) {
			state.isClick = action.payload;
		},
	},
});

export const { isClick } = eventsSlice.actions;
export default eventsSlice.reducer;
