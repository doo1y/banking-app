import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./components/HomePage";
import LoginFormPage from "./components/LoginFormPage";
import UserHomePage from "./components/UserHomePage";
import Navigation from "./components/Navigation";
import UserAccountsPage from "./components/UserAccountsPage";
import RegisterationFormPage from "./components/RegisterationFormPage";

import * as sessionActions from "./store/session";

export default function App() {
	const dispatch = useDispatch();

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restore()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			<main className='h-full flex items-center justify-center'>
				{isLoaded && (
					<Switch>
						<Route exact path='/'>
							<HomePage />
						</Route>
						<Route exact path='/login'>
							<LoginFormPage />
						</Route>
						<Route exact path='/signup'>
							<RegisterationFormPage />
						</Route>
						<Route exact path='/home/user/me/accounts'>
							<UserAccountsPage />
						</Route>
						<Route exact path='/home/user/me'>
							<UserHomePage />
						</Route>
					</Switch>
				)}
			</main>
		</>
	);
}
