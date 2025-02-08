import dbConnect from '../../../lib/dbConnect';
import { NextResponse } from "next/server";
import FileCase from "../../../models/FileCase";

export async function POST(req) {
    await dbConnect();
    
    try {
        const requestData = await req.json();
        console.log("Received Data:", JSON.stringify(requestData, null, 2));

        // Create a new complaint entry
        const newComplaint = new FileCase(requestData);
        await newComplaint.save();

        return NextResponse.json({ 
            message: "Complaint saved successfully", 
            data: newComplaint 
        }, { status: 201 });
    } catch (error) {
        console.error("Error saving complaint:", {
            message: error.message,
            stack: error.stack,
            name: error.name
        });

        return NextResponse.json({ 
            message: "Error saving complaint", 
            error: error.message 
        }, { status: 500 });
    }
}