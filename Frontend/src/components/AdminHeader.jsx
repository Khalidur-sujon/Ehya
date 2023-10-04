import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useWindowSize } from "@uidotdev/usehooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { images } from "../constants/index";
import { MdDashboard } from "react-icons/md";
import { AdminNavItemCollapse } from "../components/index";
import { createPost } from "../services/index/posts";

function AdminHeader() {
	const queryClient = useQueryClient();
	const userState = useSelector((state) => state.user);
	const navigate = useNavigate();

	const windowSize = useWindowSize();
	// menu state
	const [isMenuActive, setisMenuActive] = useState(false);
	//nav link active state
	const [activeName, setactiveName] = useState("posts");

	//toggle menu icon
	const toggleMenuIcons = () => {
		setisMenuActive((prevState) => !prevState);
	};

	useEffect(() => {
		if (windowSize.width < 1024) {
			setisMenuActive(false);
		} else {
			setisMenuActive(true);
		}
	}, [windowSize.width]);

	const { mutate: mutateCreatePost } = useMutation({
		mutationFn: ({ token }) => {
			return createPost({ token });
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries(["posts"]);
			toast.success("Your post is created");
			navigate(`/admin/posts/manage/edit/${data.slug}`);
		},
	});

	//handler create post
	const handleCreatePost = ({ token }) => {
		mutateCreatePost({ token });
	};

	return (
		<header className="w-full flex justify-between items-center p-4 h-fit lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
			{/* logo */}
			<Link to="/">
				<img
					src={images.Logo}
					alt="logo_img"
					className="w-16 lg:hidden"
				/>
			</Link>
			{/* menu icon */}
			<div className="cursor-pointer lg:hidden">
				{isMenuActive ? (
					<AiOutlineClose
						className="w-6- h-6 transition-all duration-500 "
						onClick={toggleMenuIcons}
					/>
				) : (
					<AiOutlineMenu
						className="w-6- h-6 transition-all duration-500"
						onClick={toggleMenuIcons}
					/>
				)}
			</div>
			{/* sidebar menu */}
			{isMenuActive && (
				<div className="fixed inset-0 lg:static lg:h-full lg:w-full">
					{/* underlay */}
					<div
						className="fixed inset-0 bg-black opacity-50 lg:hidden"
						onClick={toggleMenuIcons}
					/>
					{/* sidebar */}
					<div className="fixed top-0 left-0 bottom-0 w-3/4 bg-white p-4 z-50 overflow-y-auto lg:static lg:h-full lg:w-full lg:p-6">
						<Link to="/">
							<img
								src={images.Logo}
								alt="logo_image"
								className="w-16"
							/>
						</Link>
						<h4 className="mt-10 font-bold text-[#c7c7c7]">
							MAIN MENU
						</h4>
						{/* menu items						 */}
						<div className="mt-6 flex flex-col gap-y-[0.563rem]">
							<AdminNavItemCollapse
								title="Posts"
								icon={<MdDashboard className="text-xl" />}
								name="posts"
								activeName={activeName}
								setactiveName={setactiveName}
							>
								<Link to="/admin/posts/manage">
									Manage All Posts
								</Link>
								<Link
									className="items-start pl-0 ml-0"
									onClick={() => {
										handleCreatePost({
											token: userState.userInfo.token,
										});
									}}
								>
									Add new Post
								</Link>
							</AdminNavItemCollapse>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

export default AdminHeader;
