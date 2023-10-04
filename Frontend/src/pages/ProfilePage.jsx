import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import MainLayout from "../components/MainLayout";
import { getUserProfile, updateProfile } from "../services/index/users";

import { userActions } from "../store/reducers/userReducer";

function ProfilePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const userState = useSelector((state) => state.user);

	const {
		data: profileData,
		isLoading: profileIsLoading,
		error: profileError,
	} = useQuery({
		queryFn: () => {
			return getUserProfile({ token: userState.userInfo.token });
		},
		queryKey: ["profile"],
	});

	//mutate
	const { mutate, isLoading } = useMutation({
		mutationFn: ({ name, email, password }) => {
			return updateProfile({
				token: userState.userInfo.token,
				userData: { name, email, password },
			});
		},
		onSuccess: (data) => {
			dispatch(userActions.setUserInfo(data));
			localStorage.setItem("account", JSON.stringify(data));
			queryClient.invalidateQueries(["profile"]);
			toast.success("Profile is updated");
		},
		onError: (error) => {
			toast.error(error.message);
			console.log(error);
		},
	});

	//if user is logged in, then redirect to the home page
	useEffect(() => {
		if (!userState.userInfo) {
			navigate("/");
		}
	}, [navigate, userState.userInfo]);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
		values: useMemo(() => {
			return {
				name: profileIsLoading ? "" : profileData.name,
				email: profileIsLoading ? "" : profileData.email,
			};
		}, [profileData?.name, profileData?.email, profileIsLoading]),
		mode: "onChange",
	});

	//form submit handler
	const submitHandler = (data) => {
		const { name, email, password } = data;
		mutate({ name, email, password });
	};
	return (
		<MainLayout>
			<section className="container mx-auto px-5 py-10">
				<div className="w-full max-w-sm mx-auto">
					{/* <ProfilePicture avatar={profileData?.avatar} /> */}
					<h3 className="text-2xl italic my-8 font-bold text-slate-700">
						<span className="text-2xl font-normal font-roboto">
							Hello,{" "}
						</span>
						{profileData?.name}
					</h3>
					<form onSubmit={handleSubmit(submitHandler)}>
						<div className="flex flex-col mb-3 w-full">
							<label
								htmlFor="name"
								className="font-semibold block text-[#5a7184]"
							>
								Name
							</label>
							<input
								type="text"
								id="name"
								{...register("name", {
									minLength: {
										value: 1,
										message:
											"Name length must be at least 1 character",
									},
									required: {
										value: true,
										message: "Name is required",
									},
								})}
								placeholder="Enter Name"
								className={`placeholder:text-[#9591ead] text-dark-hard mt-3 rounded-lg px-5 py-4 font-semibold block outline-none border
                                ${
									errors.name
										? "border-red-600"
										: " border-[#c3cad9]"
								}`}
							/>
							{errors.name?.message && (
								<p className="text-red-500 text-xs">
									{errors.name?.message}
								</p>
							)}
						</div>
						<div className="flex flex-col mb-3 w-full">
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
						<div className="flex flex-col mb-3 w-full">
							<label
								htmlFor="password"
								className="font-semibold block text-[#5a7184]"
							>
								New Password (Optional)
							</label>
							<input
								type="password"
								id="password"
								{...register("password")}
								placeholder="Enter New password"
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
						<button
							type="submit"
							disabled={!isValid || profileIsLoading}
							className="bg-primary text-white font-bold text-lg py-4 px-8 w-full rounded-lg my-6 disabled:opacity-70 disabled:cursor-not-allowed"
						>
							Save
						</button>
					</form>
				</div>
			</section>
		</MainLayout>
	);
}

export default ProfilePage;
