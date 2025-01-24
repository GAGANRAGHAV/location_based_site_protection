"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [accessStatus, setAccessStatus] = useState("loading"); // 'loading', 'granted', or 'denied'
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            // Send the location to the server for validation
            const response = await axios.post("http://localhost:5000/api/validate-location", {
              latitude,
              longitude,
            });

            if (response.data.message === "Access granted.") {
              setAccessStatus("granted");
              setMessage("Welcome! You are within the allowed area.");
            }
          } catch (error) {
            if (error.response && error.response.status === 403) {
              setAccessStatus("denied");
              setMessage("Access denied: You are not in the allowed building.");
            } else {
              console.error("Error validating location:", error);
              setAccessStatus("denied");
              setMessage("An error occurred while validating your location.");
            }
          }
        },
        (error) => {
          setAccessStatus("denied");
          setMessage("Unable to access location. Please enable GPS.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      setAccessStatus("denied");
      setMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  if (accessStatus === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        backgroundColor: accessStatus === "granted" ? "#d4edda" : "#f8d7da", // Green for granted, red for denied
        color: accessStatus === "granted" ? "#155724" : "#721c24",
        border: `1px solid ${accessStatus === "granted" ? "#c3e6cb" : "#f5c6cb"}`,
        borderRadius: "5px",
        maxWidth: "600px",
        margin: "50px auto",
      }}
    >
      <h1>{message}</h1>
    </div>
  );
}
