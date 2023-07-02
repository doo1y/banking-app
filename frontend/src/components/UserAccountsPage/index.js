import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function UserAccountsPage() {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector((state) => state.session.user);
	const [accountsRetrived, setAccountsRetrived] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.getAccounts()).then(() =>
			setAccountsRetrived(true)
		);
	}, []);

	const handleCardClick = (e, accountId) => {
		e.preventDefault();
		const uri = `/home/user/me/account/${accountId}`;
		dispatch(sessionActions.getAccount(uri)).then(() => history.push(uri));
	};
	const colors = [
		"#d8e2dc",
		"#ffe5d9",
		"#ffcad4",
		"#f4acb7",
		"#9d8189",
		"#f7af9d",
		"#c08497",
		"#ffcad4",
		"#c08497",
		"#b0d0d3",
	];

	if (!sessionUser) return <Redirect to='/login' />;

	const getNetwork = (network) =>
		network === "V"
			? "VISA"
			: network === "MC"
			? "MasterCard"
			: network === "AMEX"
			? "American Express"
			: network === "DC"
			? "Discover"
			: null;

	const generateCard = (acc, accountId) => (
		<div class='card' id='' onClick={(e) => handleCardClick(e, accountId)}>
			<div class='visa_info'>
				<img
					src='https://raw.githubusercontent.com/muhammederdem/credit-card-form/master/src/assets/images/chip.png'
					alt=''
				/>
				<p>{acc.account_number.match(/.{1,4}/g).join(" ")}</p>
			</div>
			<div class='visa_crinfo'>
				<p>{acc.exp.replace("-", "/").slice(0, 7)}</p>
				<p>{getNetwork(acc.payment_network)}</p>
			</div>
		</div>
	);
	return (
		accountsRetrived && (
			<div className='grid grid-cols-2'>
				{sessionUser.accounts.map((account, idx) => {
					return generateCard(account, account.id);
				})}
			</div>
		)
	);
}

export default UserAccountsPage;
