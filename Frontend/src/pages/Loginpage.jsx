import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "../components/MainLayout";
import { login } from "../services/index/users";
import { userActions } from "../store/reducers/userReducer";

function LoginPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);
	const { mutate, isLoading } = useMutation({
		mutationFn: ({ email, password }) => {
			return login({ email, password });
		},
		onSuccess: (data) => {
			toast.success("Registration successfull");
			dispatch(userActions.setUserInfo(data));
			localStorage.setItem("account", JSON.stringify(data));
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	//if user is logged in, then redirect to the home page
	useEffect(() => {
		if (userState.userInfo) {
			navigate("/");
		}
	}, [navigate, userState.userInfo]);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		mode: "onChange",
	});

	const password = watch("password");

	//form submit handler
	const submitHandler = (data) => {
		const { email, password } = data;
		mutate({ email, password });
	};
	return (
		<MainLayout>
			<section className="container mx-auto px-5 py-10">
				<div className="w-full max-w-sm mx-auto">
					<h1 className="font-roboto text-2xl font-bold text-center text-dark-hard mb-8">
						Login
					</h1>
					<form onSubmit={handleSubmit(submitHandler)}>
						<div className="flex flex-col mb-6 w-full">
							<label
								htmlFor="email"
								className="font-semibold block text-[#5a7184]"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								{...register("email", {
									value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Enter a valid email",
									required: {
										value: true,
										message: "Email is required",
									},
								})}
								placeholder="Enter email"
								className={`placeholder:text-[#9591ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                                ${
									errors.email
										? "border-red-600"
										: " border-[#c3cad9]"
								}`}
							/>
							{errors.email?.message && (
								<p className="text-red-500 text-xs">
									{errors.email?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col mb-6 w-full">
							<label
								htmlFor="password"
								className="font-semibold block text-[#5a7184]"
							>
								Password
							</label>
							<input
								type="password"
								id="password"
								{...register("password", {
									required: {
										value: true,
										message: "Password is required",
									},
									minLength: {
										value: 6,
										message:
											"password must be at least 6 character",
									},
								})}
								placeholder="Enter password"
								className={`placeholder:text-[#9591ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                                ${
									errors.password
										? "border-red-600"
										: " border-[#c3cad9]"
								}`}
							/>
							{errors.password?.message && (
								<p className="text-red-500 text-xs">
									{errors.password?.message}
								</p>
							)}
						</div>
						<Link
							to="/forget-password"
							className="text-sm font-semibold text-primary block"
						>
							Forget Password?
						</Link>
						<button
							type="submit"
							disabled={!isValid || isLoading}
							className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
						>
							Sign In
						</button>
						<p className="text-sm font-semibold text-[#5a7184]">
							Don't have an account ?{" "}
							<Link to="/register" className="text-primary">
								Register
							</Link>
						</p>
					</form>
					<div className="text-xs text-slate-700 ">
						<p>Demo account</p>
						<p>
							<span className="font-bold">username:</span>
							aryan1@gmail.com
						</p>
						<p>
							<span className="font-bold">password:</span> 123456
						</p>
					</div>
				</div>
			</section>
		</MainLayout>
	);
}

export default LoginPage;
