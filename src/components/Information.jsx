import React, { useState, useEffect, useRef } from "react";
import Transcription from "./Transcription";
import Translation from "./Translation";

export default function Information(props) {
	const { output, finished } = props;
	const [tab, setTab] = useState("transcription");
	const [translation, setTranslation] = useState(null);
	const [translating, setTranslating] = useState(null);
	const [toLanguage, setToLanguage] = useState("Select Language");

	const worker = useRef();
	useEffect(() => {
		if (!worker.current) {
			worker.current = new Worker(
				new URL("../utils/translate.worker.js", import.meta.url),
				{ type: "module" }
			);
		}
		const onMessageReceived = async (e) => {
			switch (e.data.status) {
				case "initiate":
					console.log("initiate");
					break;
				case "progress":
					console.log("progress");
					break;
				case "update":
					setTranslation(e.data.output);
					break;

				case "complete":
					setTranslating(false);
					console.log("completed");
					break;
			}
		};
		worker.current.addEventListener("message", onMessageReceived);

		return () => {
			worker.current.removeEventListener("message", onMessageReceived);
		};
	});
	const textElement =
		tab === "transcription"
			? output.map((val) => val.text).join(" ")
			: translation || "No translation";

	function handleCopy() {
		navigator.clipboard.writeText(textElement);
	}

	function handleDownload() {
		const element = document.createElement("a");
		const file = new Blob([textElement], { type: "text/plain" });

		element.href = URL.createObjectURL(file);
		element.download = `Scriptofy_${new Date().toString()}}.txt`;
		document.body.appendChild(element);
		element.click();
	}
	console.log(translation);
	function generateTranslation() {
		if (translating || toLanguage === "Select language") {
			return;
		}

		setTranslating(true);
		worker.current.postMessage({
			text: output.map((val) => val.text),
			src_lang: "eng_Latn",
			tgt_lang: toLanguage,
		});
	}

	return (
		<main className="flex-1 bg-white p-4 flex flex-col gap-3 text-center sm:gap-4 justify-center pb-20  w-full mx-auto">
			<h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
				<span className=" text-gray-700 font-semibold">Your </span>
				<span className="text-teal-600 bold">Transcription</span>
			</h1>
			<div className="grid grid-cols-2 mx-auto bg-white shadow rounded-full overflow-hidden items-center">
				<button
					onClick={() => setTab("transcription")}
					className={
						"px-4 py-1 duration-200  " +
						(tab === "transcription"
							? "bg-teal-600 text-white"
							: "text-teal-600 hover:text-teal-700")
					}
				>
					Transcription
				</button>
				<button
					onClick={() => setTab("translation")}
					className={
						"px-4 py-1 duration-200 " +
						(tab === "translation"
							? "bg-teal-600 text-white"
							: "text-teal-600 hover:text-teal-700")
					}
				>
					Translation
				</button>
			</div>
			<div className="flex flex-col-reverse mt-8">
				{!finished ||
					(translating && (
						<div className="grid place-items-center">
							<i className="fa-solid fa-spinner animate-spin"></i>
						</div>
					))}
				{tab === "transcription" ? (
					<Transcription {...props} textElement={textElement} />
				) : (
					<Translation
						{...props}
						toLanguage={toLanguage}
						textElement={textElement}
						translating={translating}
						setTranslating={setTranslating}
						setTranslation={setTranslation}
						setToLanguage={setToLanguage}
						generateTranslation={generateTranslation}
					/>
				)}
			</div>
			<div className="flex items-center gap-4 mx-auto ">
				<button
					title="Copy"
					onClick={handleCopy}
					className="text-teal-600 hover:text-teal-700 duration-200 px-2 aspect-square grid place-items-center rounded-lg"
				>
					<i className="fa-solid fa-copy"></i>
				</button>
				<button
					title="Download"
					onClick={handleDownload}
					className="text-teal-600 hover:text-teal-700 duration-200 px-2 aspect-square grid place-items-center rounded-lg"
				>
					<i className="fa-solid fa-file-arrow-down"></i>
				</button>
			</div>
		</main>
	);
}
