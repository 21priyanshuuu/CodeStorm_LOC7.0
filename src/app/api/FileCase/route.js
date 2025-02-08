import dbConnect from '../../../lib/dbConnect';
import { NextResponse } from "next/server";
import Complaint from "../../../models/Complaint";

export async function POST(req) {
    await dbConnect();
    
    try {
        const newComplaint = new Complaint({ complaintType: "Theft" }); // Hardcoded value
        await newComplaint.save();
        
        return NextResponse.json({ message: "Complaint saved successfully", data: newComplaint }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Error saving complaint", error: error.message }, { status: 500 });
    }
}