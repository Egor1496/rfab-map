import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isClick: false,
	keyPress: "",
};

const eventsSlice = createSlice({
	name: "events",
	initialState,

	reducers: {
		isClick(state, action) {
			state.isClick = action.payload;
		},

		keyPress(state, action) {
			state.keyPress = action.payload;
		},
	},
});

export const { isClick, keyPress } = eventsSlice.actions;
export default eventsSlice.reducer;
