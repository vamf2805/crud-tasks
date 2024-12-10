import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoose";
import Task from "@/models/Task";

export const GET = async () => {
	connectDB();
	const tasks = await Task.find();

	const res = NextResponse.json(tasks);
	res.headers.set("Cache-Control", "no-store, max-age=0");

	return res;
};

export const POST = async (request) => {
	try {
		connectDB();
		//Obtener datos del request
		const data = await request.json();
		//Crear y guardar la nueva tarea
		const newTask = new Task(data);
		const savedTask = await newTask.save();
		console.log(savedTask);

		return NextResponse.json(savedTask);
	} catch (error) {
		console.error("Error al crear la tarea:", error);

		// Manejar errores
		return NextResponse.json(error.message, { status: 400 });
	}
};
