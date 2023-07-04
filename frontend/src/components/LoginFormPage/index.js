import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector((state) => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to='/home/user/me' />;

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(
			sessionActions.login({ credential: credential, password: password })
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='justify-self-center rounded-sm flex flex-col self-center text-center bg-white px-5 py-16 w-96'>
			<div className='text-4xl font-semibold mb-9'>Login</div>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<input
				className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-2.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
				placeholder='Username or Email'
				type='text'
				value={credential}
				onChange={(e) => setCredential(e.target.value)}
				required
			/>
			<input
				className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-2.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
				placeholder='Password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button className='bg-[#e66465] mt-6 rounded-sm h-11' type='submit'>
				Login
			</button>
		</form>
	);
}

export default LoginFormPage;
