"use client";
import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const MapComponent = ({ latitude, longitude }) => {
  const [policeStation, setPoliceStation] = useState(null);
  const [directions, setDirections] = useState(null);
  const incidentLocation = { lat: latitude, lng: longitude };

  useEffect(() => {
    const fetchNearestPoliceStation = async () => {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      const location = `${latitude},${longitude}`;
      const placesUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&type=police&key=${apiKey}`;

      try {
        const response = await fetch(placesUrl);
        const data = await response.json();

        if (data.results.length > 0) {
          const nearestStation = data.results[0];
          const stationLocation = nearestStation.geometry.location;
          setPoliceStation(stationLocation);

          // Get directions from police station to incident location
          const directionsService = new google.maps.DirectionsService();
          directionsService.route(
            {
              origin: stationLocation,
              destination: incidentLocation,
              travelMode: google.maps.TravelMode.DRIVING,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                setDirections(result);
              } else {
                console.error("Directions request failed:", status);
              }
            }
          );
        }
      } catch (error) {
        console.error("Error fetching police stations:", error);
      }
    };

    if (latitude && longitude) {
      fetchNearestPoliceStation();
    }
  }, [latitude, longitude]);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={mapContainerStyle} center={incidentLocation} zoom={14}>
        {/* Incident Location Marker */}
        <Marker position={incidentLocation} label="Incident Location" />

        {/* Nearest Police Station Marker */}
        {policeStation && <Marker position={policeStation} label="Police Station" />}

        {/* Draw Route */}
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
