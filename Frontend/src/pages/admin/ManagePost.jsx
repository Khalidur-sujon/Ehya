import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import { deletePost, getAllPosts } from "../../services/index/posts";
import { images, uploded } from "../../constants/index";

function ManagePost() {
	//userState
	const userState = useSelector((state) => state.user);

	const queryClient = useQueryClient();
	//fetch all the post
	const {
		data: postData,
		isError,
		isFetching,
	} = useQuery({
		queryFn: () => {
			return getAllPosts();
		},
		queryKey: ["posts"],
	});

	//mutate
	const { mutate: mutateDeletePost } = useMutation({
		mutationFn: ({ slug, token }) => {
			return deletePost({ slug, token });
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries(["posts"]);
			toast.success("Post is deleted");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	//post delete handler
	const deletePostHandler = ({ slug, token }) => {
		mutateDeletePost({ slug, token });
	};

	return (
		<div>
			<h1 className="text-2xl font-semibold">Manage Posts </h1>

			<div className="w-full px-4 mx-auto sm:px-8">
				<div className="py-8">
					<div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
						<div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
							<table className="min-w-full leading-normal">
								<thead>
									<tr>
										<th
											scope="col"
											className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
										>
											Title
										</th>
										<th
											scope="col"
											className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
										>
											Category
										</th>
										<th
											scope="col"
											className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
										>
											Created at
										</th>
										<th
											scope="col"
											className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
										>
											Tags
										</th>
										<th
											scope="col"
											className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
										></th>
									</tr>
								</thead>
								<tbody>
									{isError || isFetching ? (
										<tr>
											<td
												colSpan={5}
												className="text-center py-10 w-full"
											>
												Loading ...
											</td>
										</tr>
									) : (
										postData?.map((post) => (
											<tr>
												<td className="px-5 py-5 text-sm bg-white border-b border-gray-200 ">
													<div className="flex items-center">
														<div className="flex-shrink-0">
															<a
																href="#"
																className="relative block"
															>
																<img
																	src={
																		post?.photo
																			? uploded.UPLOAD_FOLDER_BASE_URL +
																			  post.photo
																			: images.article_default
																	}
																	alt="article_image"
																	className="w-10 h-10 mx-auto object-cover rounded-sm aspect-square"
																/>
															</a>
														</div>
														<div className="ml-3">
															<p className="text-gray-900 whitespace-no-wrap">
																{post.title}
															</p>
														</div>
													</div>
												</td>
												<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
													<p className="text-gray-900 whitespace-no-wrap">
														{post.categories
															.length > 0
															? post.categories[0]
															: "Uncategorized"}
													</p>
												</td>
												<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
													<p className="text-gray-900 whitespace-no-wrap">
														{new Date(
															post.createdAt
														).toLocaleDateString(
															"en-us",
															{
																day: "numeric",
																month: "short",
																year: "numeric",
															}
														)}
													</p>
												</td>
												<td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
													<div className="flex gap-x-2">
														{post.tags.length > 0
															? post.tags.map(
																	(
																		tag,
																		index
																	) => (
																		<p
																			key={
																				index
																			}
																		>
																			{
																				tag
																			}
																			{post
																				.tags
																				.length -
																				1 !==
																				index &&
																				","}
																		</p>
																	)
															  )
															: "No Tags"}
													</div>
												</td>
												<td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5 ">
													<button
														className="text-red-500 hover:text-red-900"
														onClick={() => {
															deletePostHandler({
																slug: post?.slug,
																token: userState
																	.userInfo
																	.token,
															});
														}}
													>
														Delete
													</button>
													<Link
														to={`/admin/posts/manage/edit/${post?.slug}`}
														className="text-slate-600 hover:text-green-900"
													>
														Edit
													</Link>
												</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ManagePost;
