import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { AdminHeader } from "../../components/index";
import { getUserProfile } from "../../services/index/users";

function AdminLayout() {
	const userState = useSelector((state) => state.user);
	const navigate = useNavigate();

	const {
		data: profileData,
		isLoading: profileIsLoading,
		error: profileError,
	} = useQuery({
		queryFn: () => {
			return getUserProfile({ token: userState.userInfo.token });
		},
		queryKey: ["profile"],
		onSuccess: (data) => {
			if (!data?.admin) {
				navigate("/");
				toast.error("Your are not allowed to access the admin panel");
			}
		},
		onError: (err) => {
			navigate("/");
			toast.error("Your are not allowed to access the admin panel");
		},
	});

	// profile is loading
	if (profileIsLoading) {
		return (
			<div className="w-full h-screen flex items-center justify-center">
				<h3 className="text-2xl text-slate-700">Loading... </h3>
			</div>
		);
	}

	return (
		<div className="flex flex-none h-screen lg:flex-row ">
			<AdminHeader />
			<main className="flex-1 bg-[#F9F9F9] p-4 lg:p-6">
				<Outlet />
			</main>
		</div>
	);
}

export default AdminLayout;
