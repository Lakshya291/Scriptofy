import React from "react";

export default function Transcribing(props) {
	const { downloading } = props;
	return (
		<div className="flex flex-col flex-1 items-center justify-center text-center gap-10 md:gap-14 pb-24 p-4">
			<div className="flex flex-col gap-2 sm:gap-4">
				<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
					<span className="text-teal-600">Transcribing.. </span>
					{/* <span className="text-gray-700 bold font-normal">File</span> */}
				</h1>
				<p className="bold text-gray-600">
					{!downloading
						? "Initializing neural pathways"
						: "Intelligence unlocked"}
				</p>
			</div>
			<div className="flex flex-col gap-2 sm:gap-3 max-w-[400px] mx-auto w-full">
				{[0, 1, 2].map((val) => {
					return (
						<div
							key={val}
							className={
								"rounded-full h-2 sm:h-3 bg-white loading " + `loading${val}`
							}
						></div>
					);
				})}
			</div>
		</div>
	);
}
