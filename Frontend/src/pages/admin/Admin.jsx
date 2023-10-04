import React, { Component } from "react";

export default class Admin extends Component {
	render() {
		return (
			<div className="w-screen h-screen">
				<div className="w-full h-full flex items-center justify-center">
					<h4 className="font-bold text-2xl text-slate-500">
						Go to Post section to{" "}
						<span className="italic text-slate-700">manage</span>{" "}
						post
					</h4>
				</div>
			</div>
		);
	}
}
