import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ navItems, user, enable = false }) => {
	const [isClosed, setIsClosed] = useState(false);
	const [backBtnEnabled, setBackBtnEnabled] = useState(enable);

	const mappedNavItems = navItems.map((el, idx) => (
		<li key={idx} className='text-md py-2 border-solid border-b '>
			{el}
		</li>
	));

	return (
		<div
			style={{ height: `calc(100% - 59px)` }}
			className={
				isClosed ? " bg-white w-0 absolute l-0" : "absolute bg-white w-[260px]"
			}>
			<div className='flex flex-col relative l-0'>
				<div className={isClosed ? "hidden" : "flex flex-col"}>
					<div className='text-1xl px-3 pt-6'>
						Hi, {user.f_name}
						<div className='text-md py-1'>What do you want to do today?</div>
					</div>

					<span className='border-dashed border-b-2'></span>
					<ul className='px-5'>{mappedNavItems}</ul>
				</div>

				<button
					id='sidebar_ctrl'
					onClick={() => setIsClosed(!isClosed)}
					className='flex justify-center items-center pr-1 absolute -right-7 top-[40vh] z-9 w-7 h-20 bg-zinc-300 rounded-e-full'>
					{isClosed ? ">>" : "<<"}
				</button>
			</div>
			<div className={isClosed ? "hidden" : "absolute -bottom-0"}>
				<NavLink to='/home'>Go Back</NavLink>
			</div>
		</div>
	);
};

export default Sidebar;
