import React from "react";

export default function FileDisplay(props) {
	const { handleAudioReset, file, audioStream, handleFormSubmission } = props;
	return (
		<main className="flex-1 bg-white p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20  w-full mx-auto">
			<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
				<span className="text-gray-700 font-semibold">Your </span>
				<span className="text-teal-600 bold">File</span>
			</h1>
			<div className="w-fit mx-auto min-w-[250px] max-w-[700px]">
				<div className="flex flex-col text-left my-4 px-2">
					<h3 className="font-semibold">Name: </h3>
					<p>{file ? file.name : "Custom Audio"}</p>
				</div>
				<div className="flex items center justify-between px-2  gap-4">
					<button
						onClick={handleAudioReset}
						className="text-gray-600 text-md font-semibold hover:text-slate-800 duration-200"
					>
						Reset
					</button>
					<button
						onClick={handleFormSubmission}
						className="specialBtn px-3 py-2 rounded-lg text-teal-600 font-semibold flex items-center gap-2 font-medium"
					>
						<p>Transcribe</p>
						<i className="fa-solid fa-feather"></i>
					</button>
				</div>
			</div>
		</main>
	);
}
