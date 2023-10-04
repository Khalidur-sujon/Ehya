import React from "react";
import { Link } from "react-router-dom";
import { images, uploded } from "../constants/index";

function SuggestedPage({ className, header, posts = [], tags }) {
	return (
		<div
			className={`w-full rounded-lg p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}
		>
			<h1 className="font-roboto font-medium text-dark-hard md:text-xl">
				{header}
			</h1>
			<div className="mt-5 grid gap-y-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1 ">
				{posts.map((item) => (
					<div
						key={item._id}
						className="flex
                    space-x-3 flex-nowrap items-center"
					>
						<img
							src={
								item?.photo
									? uploded.UPLOAD_FOLDER_BASE_URL +
									  item.photo
									: images.article_default
							}
							alt="post_image"
							className="object-cover  rounded-lg w-1/5 aspect-square"
						/>
						<div className="text-sm font-roboto text-dark-hard font-medium">
							<h3 className="text-sm font-roboto text-dark-hard font-medium md:text-base lg:text-lg ">
								<Link to={`/blog/${item.slug}`}>
									{item.title}
								</Link>
							</h3>

							<span className="text-xs opacity-60">
								{new Date(item.createdAt).toLocaleDateString(
									"en-us",
									{
										day: "numeric",
										month: "short",
										year: "numeric",
									}
								)}
							</span>
						</div>
					</div>
				))}
			</div>
			<h2 className="font-roboto font-medium text-dark-hard mt-8 md:text-xl">
				Tags
			</h2>
			{tags.length === 0 ? (
				<p className="text-slate-500 text-xs mt-2">
					There is no tags for this post{" "}
				</p>
			) : (
				<div className="flex flex-wrap gap-x-2 gap-y-2 mt-4">
					{tags.map((item, index) => (
						<Link
							to="/"
							key={index}
							className="px-3 py-1.5 bg-primary font-roboto text-xs text-white rounded-md inline-block md:text-sm"
						>
							{item}
						</Link>
					))}
				</div>
			)}
		</div>
	);
}

export default SuggestedPage;
