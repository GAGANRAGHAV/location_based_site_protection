import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Request user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Send the location to the server for validation
          fetch('/api/validate-location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitude, longitude }),
          })
            .then((res) => {
              if (!res.ok) {
                alert('Access denied: You are not in the allowed building.');
              }
            })
            .catch((err) => console.error(err));
        },
        (error) => {
          alert('Unable to access location. Please enable GPS.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  return <h1>Welcome to the Website</h1>;
}