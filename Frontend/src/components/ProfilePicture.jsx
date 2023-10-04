import React from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { updateProfilePicture } from "../services/index/users";
import { HiOutlineCamera } from "react-icons/hi";

function ProfilePicture({ avatar }) {
	const {} = useMutation({
		mutationFn: ({ token, formData }) => {
			return updateProfilePicture({ token: token, formData: formData });
		},
		onSuccess: (data) => {
			console.log(data);
		},
	});

	//handle file change
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		console.log(file);
	};

	//handle upload
	const handleUploadButton = () => {
		const formData = new FormData();
	};

	return (
		<div className="w-full flex items-center gap-x-4">
			<div className="relative w-20 h-20 rounded-full outline outline-primary outline-1 outline-offset-2 overflow-hidden">
				<label
					htmlFor="profilePicture"
					className="cursor-pointer absolute inset-0 rounded-full bg-transparent"
				>
					{avatar ? (
						<img
							src={avatar}
							alt="profile_image"
							className="w-full h-full object-cover"
						/>
					) : (
						<div className="w-full h-full flex justify-center items-center bg-blue-50/50">
							<HiOutlineCamera className="w-7 h-auto text-primary" />
						</div>
					)}
				</label>
				<input
					type="file"
					className="sr-only"
					id="profilePicture"
					onChange={handleFileChange}
				/>
			</div>
			<div className=" flex items-center justify-center  gap-x-4">
				<button
					type="button"
					className="border border-green-500 text-blue-800 px-4 py-2 rounded-lg"
				>
					Upload
				</button>
				<button
					type="button"
					className="border border-red-500 text-red-800 px-4 py-2 rounded-lg"
				>
					Delete
				</button>
			</div>
		</div>
	);
}

export default ProfilePicture;
