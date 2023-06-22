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

	if (sessionUser) return <Redirect to='/' />;

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
			className='rounded-sm flex flex-col self-center gap-1 text-center bg-white w-80 px-8 h-96'>
			<div className='text-2xl font-semibold mt-11 mb-6'>LOGIN</div>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>
			<input
				className='border-2 px-2 py-2 rounded-sm mb-2'
				placeholder='Username or Email'
				type='text'
				value={credential}
				onChange={(e) => setCredential(e.target.value)}
				required
			/>
			<input
				className='border-2 px-2 py-2 rounded-sm mt-2'
				placeholder='Password'
				type='password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				required
			/>
			<button className='bg-[#e66465] mt-10 rounded-sm h-11' type='submit'>
				Login
			</button>
		</form>
	);
}

export default LoginFormPage;
