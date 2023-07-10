import React, { useState, useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import { useSelector } from "react-redux";

function HomePage({ user }) {
	const loginFormClassObject = {
		title: "text-3xl mt-5 ml-5 text-center",
		form: "flex flex-col justify-center px-[5%]",
		input:
			"focus:border-b-2 focus:border-solid focus:border-cyan-500 mt-6 text-md p-2.5 bg-gray-200 border-solid border-2 border-gray-200 rounded-md outline-transparent",
		btn: "bg-[#e66465] my-5 rounded-md h-11",
	};

	const loginContainer = (
		<div className='absolute l-0 z-auto w-[335px] ml-10 mt-3'>
			<div
				id='login-top'
				className='rounded-t-xl min-h-[275px] mt-8 flex justify-center flex-col bg-[#ffffff50]'>
				<LoginForm classes={loginFormClassObject} />
			</div>
			<div
				id='signup-bottom'
				className='rounded-b-xl min-h-[90px] bg-[#ffffff80] pt-1'>
				<div className=' flex flex-col justify-center ml-5'>
					<a href='/'>Forgot Username or Password?</a>
					<a href=''>Security Center</a>
					<a href=''>Privacy, Cookies, and Legal</a>
				</div>
			</div>
		</div>
	);

	const card = (
		<aside class='card-front ml-8'>
			<label class='number' for='cardNumber'>
				5355 1234 0000 9999
			</label>
			<label class='name' for='cardHolder'>
				Jane Appleseed
			</label>
			<label class='expiry' for='expiryMonth'>
				03/27
			</label>
			<img
				class='cardLogo'
				data-v-5d206127=''
				data-v-8fcb32d4=''
				style={{ opacity: 1 }}
				src='https://simey-credit-card.netlify.app/img/logos/master.svg'
			/>

			<div class='chip'>
				<svg role='img' viewBox='0 0 100 100' aria-label='Chip'>
					<use href='#chip-lines' />
				</svg>
			</div>
			<svg
				class='contactless'
				role='img'
				viewBox='0 0 24 24'
				aria-label='Contactless'>
				<use href='#contactless' />
			</svg>
		</aside>
	);

	return (
		<div className='w-full min-h-[423px] py-40 items-center'>
			{!user && loginContainer}
			<div className='w-full flex items-center justify-center min-h-[423px]'>
				<span className='ml-[350px] px-20'>
					<h2 className='text-[2.82352941rem] leading-tight font-light'>
						$500 checking <br /> bonus on us
					</h2>
					<h3 className='mt-4'>
						Open an eligible checking account with qualifying <br />
						electronic deposits
					</h3>
					<button
						className='px-5 py-1 rounded-full border-solid border-2 mt-4 bg-[#ffffff20] hover:bg-[#ffffff50]'
						disabled>
						Get Started
					</button>
				</span>
				{card}
			</div>
		</div>
	);
}

export default HomePage;
