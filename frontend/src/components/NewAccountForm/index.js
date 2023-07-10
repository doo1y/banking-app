/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import Sidebar from "../Sidebar";

function NewAccountForm({ user }) {
	const history = useHistory();

	const dispatch = useDispatch();

	const [accountsRetrived, setAccountsRetrived] = useState(false);
	const [maxBalance, setMaxBalance] = useState(0);
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		if (!user.accounts)
			dispatch(sessionActions.getAccounts()).then(() =>
				setAccountsRetrived(true)
			);
		else setAccountsRetrived(true);
	}, []);

	if (!user) return <Redirect to='/login' />;

	function handleSubmit(e) {
		e.preventDefault();
		setErrors([]);
		const data = new FormData(e.target);

		// selectedAccount - balance - accountType - network
		const formData = Object.fromEntries(data.entries());

		const reqBody = {
			accn: formData.extAcc,
			balance: formData.balance,
			accType: formData.accType,
			paymentNetwork: formData.network,
			accnBalance: maxBalance,
		};

		let res = dispatch(sessionActions.createAccount(reqBody));
		console.log(res);
	}

	function handleOnChange(e) {
		e.preventDefault();
		if (e.target.value !== "") {
			const accountInstance = user?.accounts.find(
				(el) => el?.account_number === e.target.value
			);
			setMaxBalance(accountInstance?.balance);
		}
	}

	const navItems = [
		<NavLink exact to='/accounts'>
			View or Manage Accounts
		</NavLink>,
		<NavLink to='/accounts/new'>Open a New Account</NavLink>,
		<NavLink to='/transfer'>Start a New Transfer</NavLink>,
		<NavLink to='/users/me/profile'>View or Update My Profile</NavLink>,
	];

	return (
		accountsRetrived && (
			<>
				<Sidebar user={user} navItems={navItems} enable={"/home"} />
				<div className='flex flex-col mx-auto items-center px-12 pb-8 pt-5 my-auto rounded-md bg-white shadow-2xl'>
					<h1 className='text-3xl mb-8'>Open a New Account</h1>

					<form className='flex flex-col gap-3' onSubmit={handleSubmit}>
						<label className='text-[#00000077]'>
							Select an account to transfer from:
						</label>
						<select
							required
							onChange={handleOnChange}
							name='extAcc'
							id='userAccountsList'
							defaultValue=''
							disabled={!user.accounts.length}>
							<option value='' disabled>
								{user.accounts.length
									? "--Please choose an option--"
									: "No open accounts found"}
							</option>
							{user.accounts.map((acc, idx) => {
								return (
									<option key={idx} value={acc.account_number}>
										{acc?.account_number} - ${acc.balance}
									</option>
								);
							})}
						</select>
						<div className='flex flex-col'>
							<p className='text-[#00000077]'>
								Please enter the amount to deposit:
							</p>
							<input
								name='balance'
								className='w-28 placeholder-red-100 border order-stone-500 pl-1 focus:outline-none'
								type='number'
								max={Number(maxBalance)}
								min='0'
								step={0.01}
								required
								disabled={!user.accounts.length}
								placeholder={`${maxBalance} (max)`}
							/>
						</div>

						<p className='flex flex-col gap-2'>
							<p className='text-[#00000077]'>
								Please select the type of account to open:
							</p>
							<label>
								<input type='radio' name='accType' value='C' />
								&nbsp;Checking
							</label>
							<label>
								<input type='radio' name='accType' value='S' />
								&nbsp;Savings
							</label>
							<label>
								<input type='radio' name='accType' value='CD' />
								&nbsp;Certificate of Deposit
							</label>
							<label>
								<input type='radio' name='accType' value='MMA' />
								&nbsp;Money Market
							</label>
						</p>
						<p className='flex flex-col gap-2'>
							<p className='text-[#00000077]'>
								Plase select a payment processing network:
							</p>
							<label>
								<input type='radio' name='network' value='VISA' />
								&nbsp;VISA
							</label>
							<label>
								<input type='radio' name='network' value='MasterCard' />
								&nbsp;MasterCard
							</label>
							<label>
								<input type='radio' name='network' value='Amex' />
								&nbsp;American Express
							</label>
							<label>
								<input type='radio' name='network' value='Discover' />
								&nbsp;Discover
							</label>
						</p>
						<button
							type='submit'
							className='bg-fuchsia-400 my-5 rounded-md h-11'>
							Create Account
						</button>
					</form>
				</div>
			</>
		)
	);
}

export default NewAccountForm;
