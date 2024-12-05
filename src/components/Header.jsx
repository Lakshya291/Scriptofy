import React from "react";

export default function Header() {
	return (
		<header className=" flex items-center justify-between gap-4 p-4">
			<a href="/">
				<h1 className="font-medium">
					<span className="text-teal-600 font-semibold text-xl hover:text-teal-700 duration-300">
						Script
					</span>
					<span className="text-gray-700 bold font-normal text-xl ">ofy</span>
				</h1>
			</a>
			<a
				href="/"
				className="flex items-center gap-2 specialBtn px-3 py-2 text-gray-900 rounded-lg"
			>
				{" "}
				<p>New</p>
				<i className="fa-solid fa-plus"></i>
			</a>
		</header>
	);
}
