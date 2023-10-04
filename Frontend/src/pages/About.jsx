import React from "react";
import about__us__picture from "../assets/about_us.png";
import { Footer, Header } from "../components";

function About() {
	return (
		<>
			<Header />
			<section className="bg-gray-100 py-16" id="about">
				<div className="container mx-auto px-4">
					<div className="flex flex-wrap  justify-between items-center -mx-4">
						<div className="w-full lg:w-1/2 max-w-[480px] px-4">
							<h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center md:text-left">
								About Us
							</h2>
							<p className="text-slate-600 leading-relaxed mb-8 font-medium italic ">
								Welcome to{" "}
								<span className="text-xl font-bold">Ehya</span>,
								your go-to destination for insightful and
								engaging content. Our mission is to provide you
								with informative articles, thought-provoking
								stories, and captivating narratives that cater
								to a diverse range of interests.
							</p>
							<p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
								Our dedicated team of writers and contributors
								is passionate about delivering high-quality
								content that educates, entertains, and inspires.
								Whether you're here for the latest trends,
								in-depth analyses, or heartwarming stories,
								we've got something for everyone.
							</p>
							<p className="text-slate-600 leading-relaxed mb-8 font-medium italic">
								Thank you for being a part of our community.
								Explore our articles, join the conversation, and
								embark on a journey of knowledge and discovery
								with Ehya.
							</p>
						</div>
						<div className="w-full lg:w-1/2 px-4">
							<img
								src={about__us__picture} // Replace with your image URL
								alt="About Us"
								className="rounded-lg shadow-lg h-96 w-[90%]"
							/>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
}

export default About;
