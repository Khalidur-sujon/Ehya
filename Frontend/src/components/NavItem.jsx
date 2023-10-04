import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { MdKeyboardArrowDown } from "react-icons/md";

const NavItem = ({ item }) => {
	const [dropDown, setdropDown] = useState(false);
	const navigate = useNavigate();

	//handel drop down menu route
	const handleDropDownMenuRoute = (index) => {
		if (index === 0) {
			navigate("/about");
		} else {
			navigate("/contact");
		}
	};

	//handle item route
	const handleNavItemRoute = (name) => {
		if (name === "Faq") {
			navigate("/faq");
		}
		if (name === "Home") {
			navigate("/");
		}
		if (name == "Articles") {
			return <a href="#articles"></a>;
		}
	};

	//toggle drop down
	const toggleDropDownHandler = () => {
		setdropDown((currState) => !currState);
	};
	return (
		<li className=" relative group">
			{item.type === "link" ? (
				<>
					<button
						className="px-4 py-2"
						onClick={() => handleNavItemRoute(item.name)}
					>
						{item.name}
					</button>
					<span
						className="text-blue-500 font-bold absolute top-0 right-0 
                            opacity-0
                            group-hover:right-[90%] group-hover:opacity-100 transition-all duration-300 cursor-pointer"
					>
						/
					</span>
				</>
			) : (
				<div className=" flex flex-col justify-center items-center">
					<button
						className="px-4 py-2 flex items-center gap-x-1"
						onClick={toggleDropDownHandler}
					>
						<span>{item.name}</span>
						<MdKeyboardArrowDown />
					</button>
					<div
						className={`${
							dropDown ? "block" : "hidden"
						} lg:hidden lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block transition-all duration-300 pt-4 w-max`}
					>
						<ul className="flex flex-col shadow-lg  bg-dark-soft lg:bg-transparent rounded-lg overflow-hidden text-center">
							{item.items.map((page, index) => (
								<button
									key={index}
									className="hover:bg-dark-hard  hover:text-white lg:text-dark-soft
									 text-white px-4 py-2 cursor-pointer hover:scale-105 transition-all duration-300 lg:hover:scale-100"
									onClick={() =>
										handleDropDownMenuRoute(index)
									}
								>
									{page}
								</button>
							))}
						</ul>
					</div>
				</div>
			)}
		</li>
	);
};
export default NavItem;
