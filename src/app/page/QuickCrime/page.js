"use client";
import { useState, useEffect } from "react";
import MapComponent from "../../../components/Maps"
const CaseDetailsPage = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await fetch("/api/reportCrime");
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCases(data);
        } else {
          throw new Error(data.error || "Failed to fetch case details");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  const handleOnTheWay = async (caseId) => {
    try {
      const response = await fetch(`/api/updateCaseStatus/${caseId}`, { // New API route
        method: 'PUT', // Or POST, depending on your API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'On the way' }), // Send the updated status
      });

      if (response.ok) {
        // Update the case status in the UI
        setCases(cases.map(caseItem =>
          caseItem.case_id === caseId ? { ...caseItem, status: 'On the way' } : caseItem
        ));
        alert("Case status updated to 'On the way'"); // Or a better notification
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update case status");
      }
    } catch (err) {
      console.error("Error updating case status:", err);
      alert("Error updating case status. Please try again."); // User-friendly error message
    }
  };


  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Case Details</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : cases.length === 0 ? (
        <p className="text-center text-gray-600">No cases found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <div
              key={caseItem.case_id}
              className="bg-white p-4 shadow-md rounded-lg"
            >
              <h3 className="text-xl font-semibold">Case ID: {caseItem.case_id}</h3>
              <p className="text-gray-700 mt-2">
                <strong>Description:</strong> {caseItem.crime_description}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {caseItem.status}
              </p>
              <p className="text-gray-700">
                <strong>Incident Date:</strong> {new Date(caseItem.createdAt).toDateString()}
              </p>
              <p className="text-gray-700">
                <strong>Location:</strong> {caseItem.live_location}
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> {caseItem.phone_number}
              </p>

              {caseItem.image_url && (
                <div className="mt-3">
                  <p className="font-medium">Uploaded Image:</p>
                  <img
                    src={caseItem.image_url}
                    alt="Uploaded Evidence"
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>
              )}
                {/* Conditionally render the button */}
                {caseItem.status !== 'On the way' && ( // Only show if not already "On the way"
                  <button
                    onClick={() => handleOnTheWay(caseItem.case_id)}
                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    On the Way
                  </button>
                )}
            </div>
          ))}
          <MapComponent />
        </div>
      )}
    </div>

  );
};

export default CaseDetailsPage;