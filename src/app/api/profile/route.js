import dbConnect from "../../../lib/dbConnect";
import PoliceOfficer from "../../../models/profile";

// Fetch all police officers
async function GET(req, res) {
    try {
        const officers = await PoliceOfficer.find();
        return res.status(200).json(officers);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching officers", error });
    }
}

// Create a new police officer
const POST = async function (req, res) {
    try {
        const officer = new PoliceOfficer(req.body);
        await officer.save();
        return res.status(201).json(officer);
    } catch (error) {
        return res.status(400).json({ message: "Error saving officer", error });
    }
};

// Update an existing police officer
async function PUT(req, res) {
    try {
        const { officer_id, ...updateData } = req.body;
        const officer = await PoliceOfficer.findOneAndUpdate({ officer_id }, updateData, { new: true });
        if (!officer) return res.status(404).json({ message: "Officer not found" });
        return res.status(200).json(officer);
    } catch (error) {
        return res.status(400).json({ message: "Error updating officer", error });
    }
}

// API handler function
export default async function handler(req, res) {
    await dbConnect();

    switch (req.method) {
        case "GET":
            return GET(req, res);
        case "POST":
            return POST(req, res);
        case "PUT":
            return PUT(req, res);
        default:
            return res.status(405).json({ message: "Method Not Allowed" });
    }
}
