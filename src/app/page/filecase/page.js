"use client"; // Mark this file as a client component

import React, { useState } from 'react';

const ComplaintForm = () => {
  const [complaintType, setComplaintType] = useState('');
  const [personalInfo, setPersonalInfo] = useState({ name: '', address: '', contact: '', description: '' });
  const [incidentInfo, setIncidentInfo] = useState({ date: '', time: '', location: '', description: '' });
  const [files, setFiles] = useState([]);
  const [idProof, setIdProof] = useState(null);
  const [idType, setIdType] = useState('');
  const [referenceNo, setReferenceNo] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate a random complaint reference number (this can be replaced with backend logic)
    const refNo = Math.floor(Math.random() * 1000000);
    setReferenceNo(refNo);

    // Simulate sending confirmation message (SMS/Email)
    setConfirmationMessage(`Your complaint has been received. Reference No: ${refNo}. A confirmation message has been sent to your provided contact.`);

    // Reset form
    setComplaintType('');
    setPersonalInfo({ name: '', address: '', contact: '', description: '' });
    setIncidentInfo({ date: '', time: '', location: '', description: '' });
    setFiles([]);
    setIdProof(null);
    setIdType('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Complaint Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Complaint Type Section */}
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Complaint Type</label>
          <select
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Complaint Type</option>
            <option value="theft">Theft</option>
            <option value="fraud">Fraud</option>
            <option value="cyber">Cyber</option>
            <option value="other">Other</option>
          </select>
        </div>

        {complaintType === 'other' && (
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700">Other Complaint Type</label>
            <input
              type="text"
              placeholder="Specify Complaint Type"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        )}

        {/* Personal Information Section */}
        <h3 className="text-2xl font-semibold mt-6 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-lg font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={personalInfo.name}
              onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Address</label>
            <input
              type="text"
              value={personalInfo.address}
              onChange={(e) => setPersonalInfo({ ...personalInfo, address: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Contact</label>
            <input
              type="text"
              value={personalInfo.contact}
              onChange={(e) => setPersonalInfo({ ...personalInfo, contact: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              value={personalInfo.description}
              onChange={(e) => setPersonalInfo({ ...personalInfo, description: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Incident Information Section */}
        <h3 className="text-2xl font-semibold mt-6 mb-4">Incident Information</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-lg font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={incidentInfo.date}
              onChange={(e) => setIncidentInfo({ ...incidentInfo, date: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Time</label>
            <input
              type="time"
              value={incidentInfo.time}
              onChange={(e) => setIncidentInfo({ ...incidentInfo, time: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={incidentInfo.location}
              onChange={(e) => setIncidentInfo({ ...incidentInfo, location: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">Description</label>
            <textarea
              value={incidentInfo.description}
              onChange={(e) => setIncidentInfo({ ...incidentInfo, description: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Supporting Documents Section */}
        <h3 className="text-2xl font-semibold mt-6 mb-4">Supporting Documents</h3>
        <div>
          <label className="block text-lg font-medium text-gray-700">Upload Picture/Video/Report</label>
          <input
            type="file"
            multiple
            onChange={(e) => setFiles([...e.target.files])}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ID Proof Section */}
        <h3 className="text-2xl font-semibold mt-6 mb-4">ID Proof</h3>
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Select ID Proof Type</label>
          <select
            value={idType}
            onChange={(e) => setIdType(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select ID Proof</option>
            <option value="aadhar">Aadhar Card</option>
            <option value="passport">Passport</option>
            <option value="driving-license">Driving License</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-700">Upload ID Proof</label>
          <input
            type="file"
            onChange={(e) => setIdProof(e.target.files[0])}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit Complaint
          </button>
        </div>
      </form>

      {/* Confirmation Message */}
      {confirmationMessage && (
        <div className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700">
          {confirmationMessage}
        </div>
      )}
    </div>
  );
};

export default ComplaintForm;