import { images, uploded } from "../constants/index";
import { BsCheckLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

import { Link } from "react-router-dom";

function ArticleCard({ post, className }) {
	return (
		<div
			className={`rounded-xl overflow-hidden shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px ${className}`}
		>
			<Link to={`/blog/${post.slug}`}>
				<img
					src={
						post?.photo
							? uploded.UPLOAD_FOLDER_BASE_URL + post?.photo
							: images.article_default
					}
					alt="postImage"
					className="w-full object-cover object-center h-auto md:h-52 lg:h-48 xl:h-60"
				/>
			</Link>

			{/* text content */}
			<div className="p-5">
				<Link to={`/blog/${post.slug}`}>
					<h2 className="font-roboto font-bold text-xl text-dark-soft md:text-2xl lg:text-[28px]">
						{post.title}
					</h2>
					<p className="text-sm text-dark-light mt-3 md:text-lg">
						{post.caption}
					</p>
				</Link>

				<div className="flex justify-between items-center mt-6 flex-nowrap">
					<div className="flex items-center gap-x-2 md:gap-x-2.5">
						<img
							src={images.author_default}
							alt="post_profile"
							className="w-9 h-9 md:w-10 md:h-10 rounded-full"
						/>
						<div className="flex flex-col">
							<h4 className="font-bold italic text-sm text-dark-soft md:text-base">
								{post.user.name}
							</h4>
							<div className="flex items-center gap-x-2">
								<span
									className={`${
										post.user.verified
											? "bg-[#36B37E]"
											: "bg-red-500"
									}  bg-opacity-20 p-1.5 rounded-full w-fit"`}
								>
									{post.user.verified ? (
										<BsCheckLg className="text-[#36B37E] w-1.5 h-1.5" />
									) : (
										<AiOutlineClose className="text-red-500 w-1.5 h-1.5" />
									)}
								</span>
								<span className="italic text-xs text-dark-light md:text-sm">
									{post.user.verified
										? "Verified"
										: "Unverified"}{" "}
									Writer
								</span>
							</div>
						</div>
					</div>
					<span className="font-bold italic text-dark-light text-sm md:text-base">
						{new Date(post.createdAt).getDate()}{" "}
						{new Date(post.createdAt).toLocaleDateString(
							"default",
							{
								month: "long",
							}
						)}
					</span>
				</div>
			</div>
		</div>
	);
}

export default ArticleCard;
