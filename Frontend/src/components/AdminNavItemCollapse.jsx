import React, { useState } from "react";

function AdminNavItemCollapse({
	content,
	title,
	icon,
	name,
	activeName,
	setactiveName,
	children,
}) {
	const [isChecked, setisChecked] = useState(false);
	return (
		<div className="d-collapse bg-base-200 d-collapse-arrow min-h-0 rounded-none py-2">
			<input
				type="checkbox"
				className="min-h-0 py-0"
				onChange={() => {
					setactiveName(name);
					setisChecked(!isChecked);
				}}
			/>
			<div
				className={`d-collapse-title font-medium pl-0 min-h-0 py-0 flex gap-x-2 text-lg items-center ${
					name === activeName
						? "font-bold text-primary"
						: "font-semibold text-[#A5A5A5]"
				}`}
			>
				{icon}
				{title}
			</div>
			<div className="d-collapse-content ">
				<div className="flex flex-col gap-y-2 mt-2">{children}</div>
			</div>
		</div>
	);
}

export default AdminNavItemCollapse;
