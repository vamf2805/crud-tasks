import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoose";
import Task from "@/models/Task";

export const GET = async (request, {params})=>{
    connectDB()
    const {id} = await params

    try {
        //Busca una tarea
        const taskFound = await Task.findById(id)

        if(!taskFound) return NextResponse.json({message:"Task not found"}, {status:404})
        return NextResponse.json(taskFound)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
        
    }
}

export const DELETE = async (request, {params}) =>{
    connectDB()
    const {id} = await params

    try {
        //Eliminar una tarea
        const taskDelete = await Task.findByIdAndDelete(id)
        if(!taskDelete) return NextResponse.json({message:"Task not found"}, {status:404})
        return NextResponse.json(taskDelete)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
    
}

export const PUT = async (request, {params}) =>{
    connectDB()
    const {id} = await params
    try {
        const data = await request.json()
        //console.log(data)
        const taskUpdated = await Task.findByIdAndUpdate(id, data,{
            new: true
        })
        
        return NextResponse.json(taskUpdated)
    } catch (error) {
        return NextResponse.json(error.message, {status:400})
    }
}