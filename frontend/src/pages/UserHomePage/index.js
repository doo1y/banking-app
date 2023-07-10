import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Sidebar from "../../components/Sidebar";

function UserHomePage({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isClosed, setIsClosed] = useState(false);

	if (!user) return <Redirect to='/login' />;

	const navItems = [
		<NavLink exact to='/accounts'>
			View or Manage Accounts
		</NavLink>,
		<NavLink to='/accounts/new'>Open a New Account</NavLink>,
		<NavLink to='/transfer'>Start a New Transfer</NavLink>,
		<NavLink to='/users/me/profile'>View or Update My Profile</NavLink>,
	];

	return user && <Sidebar navItems={navItems} user={user} />;
}

export default UserHomePage;
