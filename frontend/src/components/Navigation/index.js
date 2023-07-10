import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import * as sessionActions from "../../store/session";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Navigation = ({ isLoaded, user }) => {
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const history = useHistory();

	const dispatch = useDispatch();

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const menuComponent = (
		<div>
			<Button
				id='basic-button'
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup='true'
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}>
				Dashboard
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}>
				{!user ? (
					<div>
						<MenuItem
							onClick={() => {
								handleClose();
								history.push("/login");
							}}>
							Log In
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose();
								history.push("/signup");
							}}>
							Sign Up
						</MenuItem>
					</div>
				) : (
					<div>
						<MenuItem
							onClick={() => {
								handleClose();
								history.push("/");
							}}>
							Home
						</MenuItem>
						<MenuItem
							onClick={() => {
								handleClose();
								dispatch(sessionActions.logout());
							}}>
							Log Out
						</MenuItem>
					</div>
				)}
			</Menu>
		</div>
	);

	return (
		<nav className='flex absolute p-[1em] top-0 w-full justify-between items-center max-h-[60px] bg-white shadow-lg'>
			<NavLink to={user ? "/home" : "/"}>
				<div className='text-3xl font-extrabold justify-self-start rounded-md border-double border-8 border-gray-400'>
					BANK
				</div>
			</NavLink>

			<div className='flex gap-5 mr-8'>{isLoaded && menuComponent}</div>
		</nav>
	);
};

export default Navigation;
