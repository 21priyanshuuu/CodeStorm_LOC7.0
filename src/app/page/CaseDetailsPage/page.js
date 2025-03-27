"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const CaseDetailsContent = () => {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!caseId) {
      setError("No case ID provided.");
      setLoading(false);
      return;
    }

    const fetchCaseDetails = async () => {
      try {
        const response = await fetch(`/api/getCaseDetails?caseId=${caseId}`);
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setCaseData(data);
        } else {
          setError(data.message || "Failed to fetch case details.");
        }
      } catch (err) {
        console.log(err);
        setError("Error fetching case details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  if (loading) return <p>Loading case details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6">Case Details</h2>
      {caseData ? (
        <div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <p>
                <strong>Complaint Type:</strong> {caseData.complaintType}
              </p>
              <p>
                <strong>Name:</strong> {caseData.name}
              </p>
              <p>
                <strong>Address:</strong> {caseData.address}
              </p>
              <p>
                <strong>Contact:</strong> {caseData.contact}
              </p>
            </div>
            <div>
              <p>
                <strong>Incident Date:</strong> {caseData.incidentDate}
              </p>
              <p>
                <strong>Incident Time:</strong> {caseData.incidentTime}
              </p>
              <p>
                <strong>Reference No:</strong> {caseData.referenceNo}
              </p>
            </div>
          </div>

          <p className="mb-4">
            <strong>Description:</strong> {caseData.description}
          </p>

          {/* Display Images */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Uploaded Documents</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {caseData.idProof && (
                <div className="border rounded-lg p-4">
                  <p className="font-medium mb-2">ID Proof:</p>
                  <div className="relative w-full h-64">
                    <Image 
                      src={caseData.idProof} 
                      alt="ID Proof" 
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              )}
              {caseData.uploadedFiles && (
                <div className="border rounded-lg p-4">
                  <p className="font-medium mb-2">Supporting Document:</p>
                  <div className="relative w-full h-64">
                    <Image 
                      src={caseData.uploadedFiles} 
                      alt="Uploaded File" 
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p>No case details found.</p>
      )}
    </div>
  );
};

const CaseDetails = () => {
  return (
    <Suspense fallback={<p>Loading case details...</p>}>
      <CaseDetailsContent />
    </Suspense>
  );
};

export default CaseDetails;