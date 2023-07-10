import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import Navigation from "./components/Navigation";
import AccountsPage from "./pages/AccountsPage";
import AccountDetailsPage from "./pages/AccountDetailsPage";
import NewAccountForm from "./components/NewAccountForm";
import UserDetailsPage from "./pages/UserDetailsPage";
import RegisterationPage from "./pages/Registeration";

import * as sessionActions from "./store/session";

export default function App() {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);

	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restore()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} user={user} />
			<main className='h-full w-full pt-[59px] flex my-0 mx-auto'>
				{isLoaded && (
					<Switch>
						<Route exact path='/'>
							<HomePage user={user} />
						</Route>
						<Route exact path='/login'>
							<LoginPage user={user} />
						</Route>
						<Route exact path='/signup'>
							<RegisterationPage user={user} />
						</Route>
						<Route exact path='/accounts'>
							<AccountsPage user={user} />
						</Route>
						<Route exact path='/accounts/new'>
							<NewAccountForm user={user} />
						</Route>
						<Route exact path='/accounts/:accountId'>
							<AccountDetailsPage user={user} />
						</Route>
						<Route exact path='/home'>
							<UserHomePage user={user} />
						</Route>
						<Route exact path='/users/me/profile'>
							<UserDetailsPage user={user} />
						</Route>
					</Switch>
				)}
			</main>
		</>
	);
}
