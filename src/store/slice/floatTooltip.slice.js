import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	floatTooltipMVB: false,
	floatTooltipMVT: false,
	floatTooltipPos: 0,
	modeModal: localStorage.getItem("rfab-map-modFloatModal") || "md",
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
		setModeModal(state, action) {
			state.modeModal = action.payload;
		},
		setCurrBoss(state, action) {
			state.currBoss = action.payload;
		},
		setCurrTask(state, action) {
			state.currTask = action.payload;
		},
	},
});

export const {
	floatTooltipMVB,
	floatTooltipMVT,
	floatTooltipPos,
	setModeModal,
	setCurrBoss,
	setCurrTask,
} = floatTooltip.actions;

export default floatTooltip.reducer;
