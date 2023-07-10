import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import LoginForm from "../../components/LoginForm";
import { useSelector } from "react-redux";

function LoginPage({ user }) {
	const loginFormClassObject = {
		title: "text-5xl ml-5 mb-2 pt-8 mt-20 font-normal text-center",
		form: "flex flex-col justify-center px-[5%] gap-10",
		input:
			"focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-5 bg-gray-200 border-solid border-2 border-gray-200 rounded-md outline-transparent",
		btn: "bg-[#e66465] mt-5 py-6 rounded-full h-11 mx-60 flex items-center justify-center",
		showOptions: true,
	};

	if (user) return <Redirect to='/home' />;

	return (
		<div className='mx-auto w-[83%] max-w-[870px] my-10 rounded-md bg-white'>
			<LoginForm classes={loginFormClassObject} />
		</div>
	);
}

export default LoginPage;
