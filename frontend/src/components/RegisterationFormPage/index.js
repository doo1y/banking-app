import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

const ssnFormatter = (value) => {
	if (!value) return value;

	const ssnValue = value.replace(/[^\d]/g, "");
	const ssnLength = ssnValue.length;

	if (ssnLength < 4) return ssnValue;

	if (ssnLength < 6) {
		return `${ssnValue.slice(0, 3)}-${ssnValue.slice(3)}`;
	}
	return `${ssnValue.slice(0, 3)}-${ssnValue.slice(3, 5)}-${ssnValue.slice(
		5,
		9
	)}`;
};

function RegistrationFormPage() {
	const dispatch = useDispatch(),
		sessionUser = useSelector((state) => state.session.user),
		[f_name, setFName] = useState(""),
		[l_name, setLName] = useState(""),
		[username, setUsername] = useState(""),
		[dob, setDob] = useState(""),
		[social, setSocial] = useState(""),
		[phone, setPhone] = useState(""),
		[email, setEmail] = useState(""),
		[password, setPassword] = useState(""),
		[errors, setErrors] = useState([]);

	const handleSsn = (e) => {
		e.preventDefault();
		// this is where we'll call the formatSSN function
		const newSsn = ssnFormatter(e.target.value);
		// we'll set the input value using our setInputValue
		console.log(newSsn);
		setSocial(newSsn);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		const ssn = social.split("-").join("");

		dispatch(
			sessionActions.signup({
				f_name,
				l_name,
				ssn,
				dob,
				username,
				email,
				phone,
				password,
			})
		).catch(async (res) => {
			const data = await res.json();

			if (data && data.errors) setErrors(data.errors);
		});
	};

	if (sessionUser) return <Redirect to='/home/user/me' />;

	return (
		<form
			onSubmit={handleSubmit}
			className='justify-self-center rounded-sm flex flex-col self-center text-center bg-white px-5 py-16'>
			<div className='text-4xl font-semibold mb-9'>Sign Up</div>
			<ul>
				{errors.map((error, idx) => (
					<li key={idx}>{error}</li>
				))}
			</ul>

			<div>
				<h2 className='text-start text-sm font-medium'>Member Name</h2>
				<span className='flex gap-3 w-full'>
					<input
						className='w-[50%] focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-1.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
						placeholder='First Name'
						id='fName'
						type='text'
						value={f_name}
						onChange={(e) => setFName(e.target.value)}
						required
					/>
					<input
						className='w-[50%] focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-1.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
						placeholder='Last Name'
						id='lName'
						type='text'
						value={l_name}
						onChange={(e) => setLName(e.target.value)}
						required
					/>
				</span>
			</div>
			<div className='flex flex-col'>
				<label for='email' className='text-start text-sm font-medium'>
					Email
				</label>
				<input
					placeholder='example@domain.com'
					type='email'
					className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-1.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<label for='username' className='text-start text-sm font-medium'>
					Username
				</label>
				<input
					placeholder='ex@mple123'
					id='username'
					className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-1.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
				/>
				<label for='password' className='text-start text-sm font-medium'>
					Password
				</label>
				<input
					id='password'
					placeholder='**********'
					className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-1.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
			</div>
			<div>
				<span className='flex gap-3'>
					<span className='flex flex-col'>
						<label for='dob' className='text-start text-sm font-medium'>
							Date of Birth
						</label>
						<input
							type='date'
							className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-[0.3125rem] bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
							id='dob'
							value={dob}
							onChange={(e) => setDob(e.target.value)}
							required
						/>
					</span>
					<span className='flex flex-col'>
						<label for='ssn' className='text-start text-sm font-medium'>
							SSN
						</label>
						<input
							placeholder='XXX-XX-XXXX'
							className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-1.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
							type='text'
							id='ssn'
							value={social}
							onChange={(e) => handleSsn(e)}
							required
						/>
					</span>
					<span className='flex flex-col'>
						<label for='phone' className='text-start text-sm font-medium'>
							Telephone
						</label>
						<input
							id='phone'
							className='focus:border-b-2 focus:border-solid focus:border-cyan-500 text-md p-1.5 bg-gray-200 mb-5 border-solid border-2 border-gray-200 rounded-md outline-transparent'
							type='tel'
							placeholder='(123) 456-7890'
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							required
						/>
					</span>
				</span>
			</div>
			<button className='bg-[#e66465] mt-6 rounded-sm h-11' type='submit'>
				Register
			</button>
		</form>
	);
}

export default RegistrationFormPage;
