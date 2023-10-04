import {
	MainLayout,
	BreadCrumbs,
	CommentSectionContainer,
	ArticleDetailSkeleton,
	ErrorMessage,
} from "../components/index";
import { SuggestedPage } from "../components/index";
import { images, uploded } from "../constants/index";
import { getSinglePost, getAllPosts } from "../services/index/posts";

import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import parseJsonToHtml from "../helper/parseJsonToHtml";
import Editor from "../components/editor/Editor";

//tiptap

const postsData = [
	{
		_id: "1",
		image: images.post_1,
		title: "Help children get better education",
		createdAt: "2023-01-28T15:35:53.607+0000",
	},
	{
		_id: "2",
		image: images.post_1,
		title: "Help children get better education",
		createdAt: "2023-01-28T15:35:53.607+0000",
	},
	{
		_id: "3",
		image: images.post_1,
		title: "Help children get better education",
		createdAt: "2023-01-28T15:35:53.607+0000",
	},
];

const tagesData = [
	"Medical",
	"LifeStyle",
	"Learn",
	"Healthy",
	"Food",
	"Diet",
	"Education",
];

function ArticleDetailsPage() {
	const { slug } = useParams();
	const [breadcCrumbsData, setbreadcCrumbsData] = useState([]);
	const [body, setbody] = useState(null);
	const userState = useSelector((state) => state.user);

	//fetch the single post first
	const { data, isLoading, isError } = useQuery({
		queryFn: () => getSinglePost({ slug }),
		queryKey: ["blog", slug],
		onSuccess: (data) => {
			setbreadcCrumbsData([
				{ name: "Home", link: "/" },
				{ name: "Blog", link: "/blog" },
				{ name: "Article Title", link: `/blog/${data.slug}` },
			]);
			setbody(parseJsonToHtml(data?.body));
		},
	});

	//get all the posts
	const { data: postsData } = useQuery({
		queryFn: () => getAllPosts(),
		queryKey: ["posts"],
	});

	return (
		<MainLayout>
			{isLoading ? (
				<ArticleDetailSkeleton />
			) : isError ? (
				<ErrorMessage message="Couldn't fetch the post detail" />
			) : (
				<section className="container mx-auto px-5 py-5 flex flex-col max-w-5xl lg:flex-row lg:gap-x-5 lg:items-start">
					<article className="flex-1">
						<BreadCrumbs data={breadcCrumbsData} />
						<img
							className="w-full rounded-xl"
							src={
								data?.photo
									? uploded.UPLOAD_FOLDER_BASE_URL +
									  data?.photo
									: images.article_default
							}
							alt="post_1_image"
						/>
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
								<Editor content={data?.body} editable={false} />
							)}
						</div>
						<CommentSectionContainer
							comments={data?.comments}
							loggedInUserId={userState?.userInfo?._id}
							postSlug={slug}
						/>
					</article>
					<SuggestedPage
						className="mt-8 lg:mt-0 lg:max-w-xs"
						header="Latest Article"
						posts={postsData}
						tags={data?.tags}
					/>
				</section>
			)}
		</MainLayout>
	);
}

export default ArticleDetailsPage;
