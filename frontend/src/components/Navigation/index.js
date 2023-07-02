import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";

const Navigation = ({ isLoaded }) => {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);

	const handleLogOut = (e) => {
		e.preventDefault();

		dispatch(sessionActions.logout());
	};

	let sessionLinks = !sessionUser ? (
		<>
			<div className='flex justify-center items-center rounded-md border-black border-2 py-3 max-h-[38px] min-w-[90px] max-w-[150px]'>
				<NavLink to='/login'>Log In</NavLink>
			</div>
			<div className='flex justify-center items-center rounded-md border-black border-2 py-3 max-h-[38px] min-w-[90px] max-w-[150px]'>
				<NavLink to='/signup'>Sign Up</NavLink>
			</div>
		</>
	) : (
		<div className='flex justify-center items-center rounded-md border-black border-2 py-3 max-h-[38px] min-w-[90px] max-w-[150px]'>
			<button onClick={handleLogOut}>Log Out</button>
		</div>
	);

	return (
		<nav className='flex absolute p-[1em] top-0 w-full justify-end items-center max-h-[60px] bg-white'>
			<div className='flex gap-5 mr-8'>{isLoaded && sessionLinks}</div>
		</nav>
	);
};

export default Navigation;
