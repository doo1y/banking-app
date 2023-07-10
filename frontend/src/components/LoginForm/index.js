import React, { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = (props) => {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

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
		<>
			<h2 className={props.classes.title}>Welcome</h2>
			<form onSubmit={handleSubmit} className={props.classes.form}>
				<ul>
					{errors.map((error, idx) => (
						<li key={idx}>{error}</li>
					))}
				</ul>
				<input
					className={props.classes.input}
					placeholder='Username or Email'
					type='text'
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					required
				/>
				<input
					className={props.classes.input}
					placeholder='Password'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				{props.classes.showOptions && (
					<div className=' flex flex-row justify-between ml-4 gap-1'>
						<a href='/' className='ml-6'>
							Forgot Username or Password?
						</a>
						<a href='/' className='mr-12'>
							Create New Account
						</a>
					</div>
				)}
				<button className={props.classes.btn} type='submit'>
					Login
				</button>
			</form>
		</>
	);
};

export default LoginForm;
