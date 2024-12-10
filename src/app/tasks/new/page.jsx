"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
const FormPage = () => {
	const [newTask, setNewTask] = useState({
		title: "",
		description: "",
	});
	const router = useRouter();
	const params = useParams();

	const handleChange = (e) => {
		setNewTask({ ...newTask, [e.target.name]: e.target.value });
	};

	const createTask = async () => {
		try {
			const res = await fetch("/api/tasks", {
				method: "POST",
				body: JSON.stringify(newTask),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			if (res.status === 200) {
				router.push("/");
				router.refresh();
			}

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			if (window.confirm("Are you sure you want to delete this task?")) {
				const res = await fetch(`/api/tasks/${params.id}`, {
					method: "DELETE",
				});
				router.push("/");
				router.refresh();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getTask = async () => {
		const res = await fetch(`/api/tasks/${params.id}`,{
			cache: 'no-store'
		});
		const data = await res.json();
		setNewTask({
			title: data.title,
			description: data.description,
		});
	};

	const updateTask = async () => {
		try {
			const res = await fetch(`/api/tasks/${params.id}`, {
				method: "PUT",
				body: JSON.stringify(newTask),
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			if (res.status === 200) {
				router.push("/");
				router.refresh();
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		//console.log(newTask)
		if (!params.id) {
			await createTask();
		} else {
			updateTask();
		}
	};

	useEffect(() => {
		if (params.id) {
			getTask();
		}
	}, []);

	return (
		<div className="h-[calc(100vh - 7rem)] flex justify-center items-center">
			<form onSubmit={handleSubmit}>
				<header className="flex justify-between">
					<h1 className="font-bold text-3xl">
						{params.id ? "Update Task" : "Create Task"}
					</h1>
					<button
						type="button"
						className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg"
						onClick={handleDelete}
					>
						Delete
					</button>
				</header>
				<input
					type="text"
					name="title"
					placeholder="Title"
					className="bg-gray-800 border-2 w-full p-4 rounded-lg my-4"
					onChange={handleChange}
					value={newTask.title}
				/>
				<textarea
					name="description"
					placeholder="Description"
					className="bg-gray-800 border-2 w-full rounded-lg p-4 my-4"
					rows={3}
					onChange={handleChange}
					value={newTask.description}
				></textarea>
				<button
					type="submit"
					className="bg-green-600 hover:bg-green-700 text-white font-bold px-4 py-2 rounded-lg"
				>
					{params.id ? "Update" : "Create"}
				</button>
			</form>
		</div>
	);
};

export default FormPage;
