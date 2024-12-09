import React from "react";
import Link from "next/link";

const TaskCard = ({ task }) => {
	const { title, description, _id, createdAt } = task;

	return (
		<Link href={`/tasks/${_id}`}>
			<div className="bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-700 h-full">
				<h3 className="text-2xl font-bold ">{title}</h3>
				<p className="text-slate-300">{description}</p>
				<p className="text-slate-400 my-2">
					<span className="mr-1">Created At:</span>
					{new Date(createdAt).toLocaleDateString()}
				</p>
			</div>
		</Link>
	);
};

export default TaskCard;
