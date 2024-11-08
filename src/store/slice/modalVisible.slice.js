import { createSlice } from "@reduxjs/toolkit";
import { store } from "../store";

const initialState = {
	LoadMV: false,
	createPathMV: false,
	markerInfoMV: false,
};

const modalVisibleSlice = createSlice({
	name: "modalVisible",
	initialState,
	reducers: {
		LoadMV(state, action) {
			state.LoadMV = action.payload;
		},
		markerInfoMV(state, action) {
			state.markerInfoMV = action.payload;
		},
		createPathMV(state, action) {
			if (action.payload === false) state.createPathMV = false;
			else
				state.createPathMV =
					state.createPathMV === action.payload ? !action.payload : action.payload;
		},
	},
});

export const { LoadMV, createPathMV, markerInfoMV } = modalVisibleSlice.actions;

export default modalVisibleSlice.reducer;
