import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
	return {
		type: SET_USER,
		payload: user,
	};
};

const removeUser = () => {
	return {
		type: REMOVE_USER,
	};
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
	let newState;
	switch (action.type) {
		case SET_USER:
			newState = Object.assign({}, state);
			newState.user = action.payload;
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export const login =
	({ credential, password }) =>
	async (dispatch) => {
		const response = await csrfFetch("/api/session", {
			method: "POST",
			body: JSON.stringify({
				credential: credential,
				password: password,
			}),
		});

		const data = await response.json();

		console.log(data);

		dispatch(setUser(data.member));
		return response;
	};

export const restore = () => async (dispatch) => {
	const res = await csrfFetch("/api/session");

	const data = await res.json();
	dispatch(setUser(data.member));
	return res;
};

export default sessionReducer;
