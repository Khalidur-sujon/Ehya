import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

import { ArticleDetailSkeleton, ErrorMessage } from "../../components";
import parseJsonToHtml from "../../helper/parseJsonToHtml";
import { getSinglePost, updatePost } from "../../services/index/posts";
import { AiOutlineCamera } from "react-icons/ai";
import { uploded } from "../../constants";
import Editor from "../../components/editor/Editor";

function EditPost() {
	const { slug } = useParams();
	const queryClient = useQueryClient();
	const userState = useSelector((state) => state.user);
	//photo state
	const [initialPhoto, setinitialPhoto] = useState(null);
	const [photo, setphoto] = useState(null);

	const [body, setbody] = useState(null);

	//fetch the single post
	const { data, isLoading, isError } = useQuery({
		queryFn: () => getSinglePost({ slug }),
		queryKey: ["blog", slug],
	});

	useEffect(() => {
		if (!isLoading && !isError) {
			setinitialPhoto(data?.photo);
		}
	}, [data, isLoading, isError]);

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setphoto(file);
	};

	//mutation
	const { mutate: mutateUpdatePost } = useMutation({
		mutationFn: ({ updatedData, slug, token }) => {
			return updatePost({ updatedData, slug, token });
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries(["blog", slug]);
			toast.success("Your post is updated");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	//upload handler
	const handleUpdatePost = async () => {
		let updatedData = new FormData();

		if (!initialPhoto && photo) {
			updatedData.append("postPicture", photo);
		} else if (initialPhoto && !photo) {
			//convert url to object (initial photo)
			const urlToObject = async (url) => {
				let reponse = await fetch(url);
				let blob = await reponse.blob();
				const file = new File([blob], initialPhoto, {
					type: blob.type,
				});
				return file;
			};

			const picture = await urlToObject(
				uploded.UPLOAD_FOLDER_BASE_URL + data?.photo
			);
			updatedData.append("postPicture", picture);
		}

		updatedData.append("document", JSON.stringify({ body }));
		mutateUpdatePost({
			updatedData,
			slug,
			token: userState.userInfo.token,
		});
	};

	//handle delete photo
	const handleDeletePhoto = () => {
		if (window.confirm("Do you want to delete your post picture?")) {
			setinitialPhoto(null);
			setphoto(null);
		}
	};

	return (
		<div>
			{isLoading ? (
				<ArticleDetailSkeleton />
			) : isError ? (
				<ErrorMessage message="Couldn't fetch the post detail" />
			) : (
				<section className="container mx-auto px-5 py-5 flex flex-col max-w-5xl lg:flex-row lg:gap-x-5 lg:items-start">
					<article className="flex-1">
						<label
							htmlFor="postPicture"
							className="w-full cursor-pointer"
						>
							{/* if photo exists, then display the photo, otherwise display the initial photo, otherwise display the camera icon for uploading photo */}
							{photo ? (
								<img
									src={URL.createObjectURL(photo)}
									alt={data?.title}
									className="rounded-xl w-full"
								/>
							) : initialPhoto ? (
								<img
									src={
										uploded.UPLOAD_FOLDER_BASE_URL +
										data?.photo
									}
									alt={data?.title}
									className="rounded-xl w-full"
								/>
							) : (
								<div className="w-full  min-h-[200px] flex items-center justify-center bg-blue-100/50">
									<AiOutlineCamera className="w-12 h-auto text-primary" />
								</div>
							)}
						</label>
						<input
							type="file"
							className="sr-only"
							id="postPicture"
							onChange={handleFileChange}
						/>
						<button
							type="button"
							className="w-fit bg-red-600 text-white rounded-lg px-2 py-1 mt-4"
							onClick={handleDeletePhoto}
						>
							Delete Image
						</button>
						<div className="mt-4 flex gap-x-2">
							{data?.categories.map((category) => (
								<Link
									to="/blog?category=selectedCategory"
									className="font-roboto text-primary  text-sm inline-block md:text-base"
								>
									{category.name}
								</Link>
							))}
						</div>

						<h1 className="font-roboto text-xl font-medium text-dark-hard mt-4 md:text-[28px]">
							{data?.title}
						</h1>
						{/* article */}
						<div className="w-full">
							{!isLoading && !isError && (
								<Editor
									content={data?.body}
									editable={true}
									onDataChange={(data) => setbody(data)}
								/>
							)}
						</div>
						<button
							type="button"
							className="w-full text-white bg-green-700 rounded-lg px-4 py-2"
							onClick={handleUpdatePost}
						>
							Update Post{" "}
						</button>
					</article>
				</section>
			)}
		</div>
	);
}

export default EditPost;
