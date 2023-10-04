import React from "react";
import { Footer, Header } from "../components";

const Faq = () => {
	const faqItems = [
		{
			question: "What is your blog about?",
			answer: "Our blog covers a wide range of topics, including technology, travel, health, and more. We strive to provide valuable information and insights on these subjects.",
		},
		{
			question: "How can I contribute to your blog?",
			answer: 'We welcome contributions from guest writers. If you have an interesting article idea, please contact us through our "Contact Us" page to discuss potential collaboration.',
		},
		{
			question: "Do you offer advertising opportunities?",
			answer: 'Yes, we offer advertising opportunities on our blog. Please visit our "Advertise with Us" page for more details on advertising options and rates.',
		},
		{
			question: "Can I subscribe to your newsletter?",
			answer: 'Absolutely! You can subscribe to our newsletter by providing your email address on our "Subscribe" page. Stay updated with our latest articles and news.',
		},
		{
			question: "How do I report a problem with your website?",
			answer: 'If you encounter any issues or have feedback regarding our website, please use our "Report a Problem" form on the "Contact Us" page. We appreciate your help in improving our site.',
		},
	];

	return (
		<>
			<Header />
			<div className="bg-gray-100 py-16">
				<div className="container mx-auto">
					<h1 className="text-3xl font-semibold text-center mb-8">
						Frequently Asked Questions
					</h1>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{faqItems.map((item, index) => (
							<div
								key={index}
								className="bg-white p-6 rounded-lg shadow"
							>
								<h2 className="text-xl font-semibold">
									{item.question}
								</h2>
								<p className="mt-2">{item.answer}</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Faq;
