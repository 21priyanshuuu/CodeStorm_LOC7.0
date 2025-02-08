import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Profile from "../../../models/profile";


export async function POST(req) {
  await dbConnect();

  try {
    const requestData = await req.json();
    console.log("Received Profile Data:", JSON.stringify(requestData, null, 2));

    // Create and save profile
    const newProfile = new Profile(requestData);
    await newProfile.save();

    return NextResponse.json(
      { message: "Profile saved successfully", data: newProfile },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving profile:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return NextResponse.json(
      { message: "Error saving profile", error: error.message },
      { status: 500 }
    );
  }
}
