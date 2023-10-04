import { images } from "../../../constants/index";

function CTA() {
	return (
		<>
			<svg
				className="w-full h-auto max-h-40 translate-y-[1px]"
				preserveAspectRatio="none"
				viewBox="0 0 2160 263"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					id="Wave"
					fillRule="evenodd"
					clipRule="evenodd"
					d="M2160 262.5H0V0C360 80 720 120 1080 120C1440 120 1800 80 2160 0V262.5Z"
					fill="#0D2436"
				/>
			</svg>
			<section className="bg-dark-hard px-5 relative">
				<div className="container mx-auto grid grid-cols-12 py-10 lg:place-items-center">
					{/* text content */}
					<div className="col-span-12 lg:col-span-6">
						<h2 className="font-roboto text-2xl md:text-4xl md:text-center md:leading-normal font-bold text-white lg:text-left ">
							Get our stories delivered From us <br /> to your
							inbox weekly.
						</h2>
						<div className="w-full max-w-[494px] mt-12 space-y-3 mx-auto md:flex md:items-center md:space-x-2 md:space-y-0 lg:mx-0">
							<input
								type="text"
								placeholder="Your Email"
								className="px-4 py-3 rounded-lg w-full placeholder:text-dark-light"
							/>
							<button className="bg-primary text-white font-bold px-4 py-3 rounded-lg w-full md:w-fit whitespace-nowrap">
								Get Started
							</button>
						</div>
						<p className="text-dark-light text-sm mt-6 leading-7 md:text-center md:text-base lg:text-left">
							<span className="font-bold italic text-[#B3BAC5] md:not-italic md:font-normal md:text-dark-light">
								Get a response tomorrow{"  "}
							</span>
							if you submit by 9pm today. If we received after{" "}
							<br /> 9pm will get a reponse the following day.
						</p>
					</div>
					{/* image */}
					<div className="col-span-12 lg:col-span-6 hidden mb-[70px] md:block md:order-first lg:order-last">
						<div className="w-3/4 mx-auto relative">
							<div className="w-1/2 h-1/2 bg-[#FC5A5A] absolute rounded-lg top-[10%] -right-[10%]"></div>
							<div className="w-1/2 h-1/2 bg-white absolute rounded-lg -bottom-[10%] -left-[8%] opacity-[0.3]"></div>
							<div className="w-full rounded-xl bg-white p-3 relative z-[1]">
								<img
									src={images.CTA_image}
									alt="cta-image"
									className="w-full object-cover object-center rounded-lg h-auto md:h-52 lg:h-48 xl:h-60"
								/>
								<div className="p-5">
									<h2 className="font-roboto text-xl font-bold text-dark-soft md:text-2xl lg:text-[28px]">
										The best aticles every week
									</h2>
									<p className="text-dark-light mt-3 text-sm md:text-lg">
										Our insurance plans offers are priced{" "}
										<br />
										the same everywhere else.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default CTA;
