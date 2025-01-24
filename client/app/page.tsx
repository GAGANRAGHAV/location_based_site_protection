"use client"; 

import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  useEffect(() => {
    // Request user's location
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
              alert("You are within the allowed area.");
              console.log("You are within the allowed area.");
            }
          } catch (error) {
            if (error.response && error.response.status === 403) {
              alert("Access denied: You are not in the allowed building.");
            } else {
              console.error("Error validating location:", error);
            }
          }
        },
        (error) => {
          alert("Unable to access location. Please enable GPS.");
          console.error("Geolocation error:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  return <h1>Welcome to the Website</h1>;
}

















