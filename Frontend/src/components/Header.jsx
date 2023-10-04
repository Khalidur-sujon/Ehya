import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { NavItem } from "../components/index";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { images } from "../constants/index";
import { logout } from "../store/actions/userActions";

const navItemInfo = [
	{ name: "Home", type: "link" },

	{ name: "Pages", type: "dropdown", items: ["About Us", "Contact Us"] },
	{ name: "Faq", type: "link" },
];

function Header() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [navIsVisible, setnavIsVisible] = useState(false);
	const [profileDropDown, setprofileDropDown] = useState(false);

	const userState = useSelector((state) => state.user);
	console.log(userState);

	const navVisibilityHandler = () => {
		setnavIsVisible((currState) => !currState);
	};

	// logout handler
	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<section className="container mx-auto">
			<header className="flex justify-between items-center px-5 py-4 bg-white">
				{/* img */}
				<div>
					<Link to="/">
						<img className="w-16" src={images.Logo} alt="logo" />
					</Link>
				</div>

				{/* mobile menubar */}
				<div className="lg:hidden z-50">
					{navIsVisible ? (
						<AiOutlineClose
							className="w-6 h-6 cursor-pointer"
							onClick={navVisibilityHandler}
						/>
					) : (
						<AiOutlineMenu
							className="w-6 h-6 cursor-pointer"
							onClick={navVisibilityHandler}
						/>
					)}
				</div>
				{/* nav links */}
				<div
					className={` ${
						navIsVisible ? "right-0" : "-right-full"
					} fixed top-0 bottom-0 flex flex-col justify-center items-center w-full lg:w-auto lg:justify-end lg:flex-row lg:static gap-x-9 z-[49] mt-[56px] lg:mt-0 transition-all duration-300 bg-dark-hard lg:bg-transparent font-bold text-2xl lg:text-xl`}
				>
					<ul className="flex flex-col lg:flex-row gap-x-2 items-center font-normal tracking-wider text-white lg:text-dark-soft gap-y-7">
						{navItemInfo.map((item) => (
							<NavItem key={item.name} item={item} />
						))}
					</ul>
					{userState.userInfo ? (
						<div className="flex flex-col lg:flex-row gap-x-2 items-center font-normal tracking-wider text-white lg:text-dark-soft gap-y-7">
							<div className="relative group">
								<div className=" flex flex-col justify-center items-center">
									<button
										className="mt-5 lg:mt-0 border-2 border-blue-500 text-blue hover:bg-blue-500 hover:text-white px-4 py-2 rounded-full transition-all duration-300 text-white lg:text-dark-soft flex items-center"
										onClick={() =>
											setprofileDropDown(!profileDropDown)
										}
									>
										<span>Account</span>
										<MdKeyboardArrowDown className="ml-1" />
									</button>
									<div
										className={`${
											profileDropDown ? "block" : "hidden"
										} lg:hidden lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block transition-all duration-300 pt-4 w-max`}
									>
										<ul className="flex flex-col shadow-lg  bg-dark-soft lg:bg-transparent rounded-lg overflow-hidden text-center">
											{userState?.userInfo?.email ===
												"khalid@gmail.com" && (
												<button
													type="button"
													className="hover:bg-dark-hard  hover:text-white lg:text-dark-soft
									 text-white px-4 py-2 cursor-pointer hover:scale-105 transition-all duration-300 lg:hover:scale-100"
													onClick={() =>
														navigate("/admin")
													}
												>
													Admin Dashboard
												</button>
											)}
											<button
												type="button"
												className="hover:bg-dark-hard  hover:text-white lg:text-dark-soft
									 text-white px-4 py-2 cursor-pointer hover:scale-105 transition-all duration-300 lg:hover:scale-100"
												onClick={() =>
													navigate("/profile")
												}
											>
												Profile
											</button>

											<button
												type="button"
												className="hover:bg-dark-hard  hover:text-white lg:text-dark-soft
									 text-white px-4 py-2 cursor-pointer hover:scale-105 transition-all duration-300 lg:hover:scale-100"
												onClick={logoutHandler}
											>
												Logout
											</button>
										</ul>
									</div>
								</div>
							</div>
						</div>
					) : (
						<button
							className="mt-5 lg:mt-0 border-2 border-blue-500 text-blue hover:bg-blue-500 hover:text-white px-4 py-2 rounded-full transition-all duration-300 text-white lg:text-dark-soft"
							onClick={() => navigate("/login")}
						>
							Sign In
						</button>
					)}
				</div>
			</header>
		</section>
	);
}

export default Header;
