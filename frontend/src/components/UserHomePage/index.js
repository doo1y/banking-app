import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

function UserHomePage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [errors, setErrors] = useState([]);

	if (!sessionUser) return <Redirect to='/login' />;

	return (
		<div className=''>
			{sessionUser.f_name} {sessionUser.l_name}
			<NavLink to='/home/user/me/accounts'>View Accounts</NavLink>
		</div>
	);
}

export default UserHomePage;
