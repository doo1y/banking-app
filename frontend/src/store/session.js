import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_ACCOUNTS = "session/setAccounts";
const SET_ACCOUNT = "session/setAccount";

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

const setAccounts = (accounts) => {
	return {
		type: SET_ACCOUNTS,
		payload: accounts,
	};
};

const setAccount = (account) => {
	return {
		type: SET_ACCOUNT,
		payload: account,
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
		case SET_ACCOUNTS:
			newState = Object.assign({}, state);
			newState.user.accounts = action.payload;
			return newState;
		case REMOVE_USER:
			newState = Object.assign({}, state);
			newState.user = null;
			return newState;
		default:
			return state;
	}
};

export const logout = () => async (dispatch) => {
	const res = await csrfFetch("/api/v1/auth", {
		method: "DELETE",
	});

	const data = await res.json();

	dispatch(removeUser());
	return data;
};

export const login =
	({ credential, password }) =>
	async (dispatch) => {
		const response = await csrfFetch("/api/v1/auth", {
			method: "POST",
			body: JSON.stringify({
				credential: credential,
				password: password,
			}),
		});

		const data = await response.json();

		dispatch(setUser(data.user));
		return response;
	};

export const restore = () => async (dispatch) => {
	const res = await csrfFetch("/api/v1/auth");

	const data = await res.json();
	dispatch(setUser(data.user));
	return res;
};

export const getUser = () => async (dispatch) => {
	const res = await csrfFetch("/api/v1/users/me");

	const data = await res.json();
	dispatch(setUser(data.user));
	return res;
};

export const getAccounts = () => async (dispatch) => {
	const res = await csrfFetch("/api/v1/accounts");

	const data = await res.json();
	dispatch(setAccounts(data.accounts));
	return res;
};

export const signup = (reqBody) => async (dispatch) => {
	const res = await csrfFetch("/api/v1/auth/register", {
		method: "POST",
		body: JSON.stringify(reqBody),
	});

	const data = await res.json();

	dispatch(setUser(data.user));

	return res;
};

// extAccountNumber, balance, memberId, acc_type, network
export const createAccount = (reqBody) => async (dispatch) => {
	const res = await csrfFetch("/api/v1/accounts/new", {
		method: "POST",
		body: JSON.stringify(reqBody),
	});

	const data = await res.json();
	dispatch(setAccount(data.accounts));
};
export const getAccount = (uri) => async (dispatch) => {
	const res = await csrfFetch(uri);

	const data = await res.json();
	// dispatch(setAccount(data.account));
	return res;
};

export default sessionReducer;
