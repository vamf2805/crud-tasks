import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoose";

export const GET = () =>{
    connectDB()
    return NextResponse.json({mensaje: "Hello world"})
}