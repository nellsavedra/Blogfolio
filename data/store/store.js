import { configureStore, createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
	name: "data",
	initialState: {
		blog: {
			posts: [],
			rendered: false,
			page: 1,
			pages: null,
		},
		code: {
			posts: [],
			rendered: false,
			page: 1,
			pages: null,
		},
		emoji: "",
	},
	reducers: {
		setPosts(state, action) {
			state[action.payload[1]].posts = [...action.payload[0]];
		},
		setNewPosts(state, action) {
			state[action.payload[1]].posts = [...state[action.payload[1]].posts, ...action.payload[0]];
		},
		setPages(state, action) {
			state[action.payload[1]].pages = action.payload[0];
		},
		setRendered(state, action) {
			state[action.payload[1]].rendered = action.payload[0];
		},
		setEmoji(state, action) {
			state.emoji = action.payload;
		},
		setPage(state, action) {
			state[action.payload[1]].page = action.payload[0];
		}
	},
});

// Exportamos las acciones del estado
export const actions = dataSlice.actions;

// Esto va con el Provider
export const rxStore = configureStore({
	reducer: dataSlice.reducer,
});
