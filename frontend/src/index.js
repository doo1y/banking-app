import React from "react";

import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf";
import * as sessionActions from "./store/session";

if (process.env.NODE_ENV !== "production") {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
}

function Root() {
	return (
		<ReduxProvider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</ReduxProvider>
	);
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>
);
