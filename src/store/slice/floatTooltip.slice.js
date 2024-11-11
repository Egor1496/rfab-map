import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	floatTooltipMVB: false,
	floatTooltipMVT: false,
	floatTooltipPos: 0,
	currBoss: {},
	currTask: {},
};

const floatTooltip = createSlice({
	name: "floatTooltip",
	initialState,
	reducers: {
		floatTooltipMVB(state, action) {
			state.floatTooltipMVB = action.payload;
		},
		floatTooltipMVT(state, action) {
			state.floatTooltipMVT = action.payload;
		},
		floatTooltipPos(state, action) {
			state.floatTooltipPos = action.payload;
		},
		setCurrBoss(state, action) {
			state.currBoss = action.payload;
		},
		setCurrTask(state, action) {
			state.currTask = action.payload;
		},
	},
});

export const { floatTooltipMVB, floatTooltipMVT, floatTooltipPos, setCurrBoss, setCurrTask } =
	floatTooltip.actions;

export default floatTooltip.reducer;
