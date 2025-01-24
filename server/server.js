const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const allowedArea = {
  minLat: 18.5135, // South boundary
  maxLat: 18.5140, // North boundary
  minLon: 73.7833, // West boundary
  maxLon: 73.7838, // East boundary
};

// API endpoint to validate location
app.post("/api/validate-location", (req, res) => {
  const { latitude, longitude } = req.body;
  console.log(latitude, longitude); // Debugging
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`); // Debugging

  // Validate if the user's location is within the allowed area
  if (
    latitude >= allowedArea.minLat &&
    latitude <= allowedArea.maxLat &&
    longitude >= allowedArea.minLon &&
    longitude <= allowedArea.maxLon
  ) {
    res.status(200).json({ message: "Access granted." });
  } else {
    res.status(403).json({ message: "Access denied: Outside allowed area." });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

