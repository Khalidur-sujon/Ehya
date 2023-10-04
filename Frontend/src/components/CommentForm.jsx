import { useState } from "react";

function CommentForm({
	btnLabel,
	formSubmitHandler,
	formCancelHandler = null,
	initialText = "",
	loading = false,
}) {
	const [value, setvalue] = useState(initialText);

	const submitHandler = (e) => {
		e.preventDefault();
		formSubmitHandler(value);
		setvalue("");
	};

	return (
		<form onSubmit={(e) => submitHandler(e)}>
			<div className="border-2 border-primary rounded-lg p-4 flex flex-col items-end mt-10">
				<textarea
					rows="5"
					placeholder="Leave your comment here..."
					className="w-full focus:outline-none bg-transparent"
					value={value}
					onChange={(e) => setvalue(e.target.value)}
				/>
				<div className="flex gap-x-3">
					{formCancelHandler && (
						<button
							className="px-3 py-1.5 border-2 border-red-500 text-red-500 rounded-lg font-semibold mt-2"
							onClick={formCancelHandler}
						>
							Cancel
						</button>
					)}

					<button
						disabled={loading}
						type="submit"
						className="px-3 py-1.5 bg-primary text-white rounded-lg font-semibold mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
					>
						{btnLabel}
					</button>
				</div>
			</div>
		</form>
	);
}

export default CommentForm;
