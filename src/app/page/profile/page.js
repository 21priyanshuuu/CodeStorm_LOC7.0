"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import ProfileForm from "../../../components/ProfileForm";
import ProfileData from "../../../components/ProfileData";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const ProfilePage = () => {
  const { user } = useKindeBrowserClient();
  const [profileExists, setProfileExists] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      const officerId = user.id || "P123456789";

      axios
        .get(`/api/profile?officer_id=${officerId}`)
        .then((response) => {
          if (response.status === 200 && response.data.data) {
            setProfileExists(true);
          } else {
            setProfileExists(false);
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setProfileExists(false);
          } else {
            setError("Error fetching profile data.");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-3/4 bg-gray-300" />
            <Skeleton className="h-6 w-1/2 bg-gray-300" />
            <Skeleton className="h-6 w-full bg-gray-300" />
          </div>
        ) : error ? (
          <Alert variant="destructive" className="bg-red-100 text-red-700 border-red-400">
            <AlertTitle className="font-bold">Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : profileExists ? (
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Officer Profile</h2>
            <ProfileData />
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Create Profile</h2>
            <ProfileForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
