import mongoose, { Schema } from "mongoose";

const policeOfficerSchema = new Schema({
    login_id: { type: String, required: true, unique: true },
    login_name: { type: String, required: true },
    login_email: { type: String, required: true, unique: true },
    officer_id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    sex: { type: String, enum: ["Male", "Female", "Other"], required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    judicial_section: { type: String, required: true },
    blood_group: { type: String, enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"], required: true },
    dob: { type: Date, required: true }
});

const PoliceOfficer =
  (mongoose.models.policeOfficerSchema) ||
  mongoose.model('PoliceOfficer', policeOfficerSchema);

export default PoliceOfficer;