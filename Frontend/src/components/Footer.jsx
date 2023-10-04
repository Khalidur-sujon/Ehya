import {
	AiOutlineTwitter,
	AiFillYoutube,
	AiFillInstagram,
	AiFillHeart,
} from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { images } from "../constants/index";

function Footer() {
	return (
		<section className="bg-dark-hard">
			<footer className="container mx-auto px-5 py-10 grid grid-cols-10 gap-x-5 gap-y-10 md:pt-20 md:grid-cols-12 lg:grid-cols-10 lg:gap-x-10">
				{/* grid items-section-1 */}
				<div className="col-span-5 md:col-span-4 lg:col-span-2">
					<h3 className="text-dark-light font-bold md:text-lg">
						Product
					</h3>
					<ul className="text-[#959EAD] text-sm space-y-4 mt-5 md:text-base">
						<li>
							<a href="#">Landingpage</a>
						</li>
						<li>
							<a href="#">Features</a>
						</li>
						<li>
							<a href="#">Documentation</a>
						</li>
						<li>
							<a href="#">Referral Programme</a>
						</li>
						<li>
							<a href="#">Pricing</a>
						</li>
					</ul>
				</div>
				{/* grid items-section-2 */}
				<div className="col-span-5 md:col-span-4 lg:col-span-2">
					<h3 className="text-dark-light font-bold md:text-lg">
						Services
					</h3>
					<ul className="text-[#959EAD] text-sm space-y-4 mt-5 md:text-base">
						<li>
							<a href="#">Documentation</a>
						</li>
						<li>
							<a href="#">Design</a>
						</li>
						<li>
							<a href="#">Themes</a>
						</li>
						<li>
							<a href="#">Illustrations</a>
						</li>
						<li>
							<a href="#">UI Kit</a>
						</li>
					</ul>
				</div>
				{/* grid items-section-3 */}
				<div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2">
					<h3 className="text-dark-light font-bold md:text-lg">
						Company
					</h3>
					<ul className="text-[#959EAD] text-sm space-y-4 mt-5 md:text-base">
						<li>
							<a href="#">About</a>
						</li>
						<li>
							<a href="#">Terms</a>
						</li>
						<li>
							<a href="#">Privacy Policy</a>
						</li>
						<li>
							<a href="#">Careers</a>
						</li>
					</ul>
				</div>
				{/* grid items-section-4 */}
				<div className="col-span-5 md:col-span-4 lg:col-span-2">
					<h3 className="text-dark-light font-bold md:text-lg">
						More
					</h3>
					<ul className="text-[#959EAD] text-sm space-y-4 mt-5 md:text-base">
						<li>
							<a href="#">Documentation</a>
						</li>
						<li>
							<a href="#">License</a>
						</li>
						<li>
							<a href="#">Changelog</a>
						</li>
					</ul>
				</div>

				{/* logo & social media links */}
				<div className="col-span-10 md:col-span-4 md:order-first lg:col-span-2">
					<img
						src={images.Logo}
						alt="logoImage"
						className="brightness-0 invert mx-auto md:mx-0"
					/>
					<p className="text-sm mt-4 text-dark-light text-center md:text-left lg:text-sm">
						{" "}
						Build a modern and creative website with crealand
					</p>
					<ul className="flex justify-center items-center md:justify-start mt-5 space-x-4">
						<li>
							<a href="#">
								<AiOutlineTwitter className="w-6 h-6 text-white" />
							</a>
						</li>
						<li>
							<a href="#">
								<AiFillYoutube className="w-6 h-6 text-white" />
							</a>
						</li>
						<li>
							<a href="#">
								<AiFillInstagram className="w-6 h-6 text-white" />
							</a>
						</li>
						<li>
							<a href="#">
								<FaFacebook className="w-6 h-6 text-white" />
							</a>
						</li>
						<li>
							<a href="#">
								<BsTelegram className="w-6 h-6 text-white" />
							</a>
						</li>
					</ul>
				</div>
				<div className="hidden md:flex flex-col items-center space-y-4 md:col-span-12 lg:col-span-10">
					<div className="bg-primary text-white p-3 rounded-full">
						<AiFillHeart className="w-7 h-auto" />
					</div>
					<p className="font-bold italic text-dark-light">
						Copyright © 2023. Khalidur Rahman
					</p>
				</div>
			</footer>
		</section>
	);
}

export default Footer;
