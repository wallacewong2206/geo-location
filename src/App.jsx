import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function GeolocationTracker() {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setLoading(false);
          },
          (error) => {
            console.error('Error fetching location:', error);
            setLoading(false);
          }
        );
      }
    };

    fetchLocation();

    const intervalId = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          setLoading(true);
          fetchLocation();
          return 10;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="text-center mt-5">
      <h1>Geolocation Tracker</h1>
      {loading ? (
        <p className="text-info">Refreshing...</p>
      ) : (
        <div
          className="border p-3 rounded shadow-sm"
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <h4 className="text-start">Latitude: {location.latitude}</h4>
          <h4 className="text-start">Longitude: {location.longitude}</h4>
        </div>
      )}
      <div className="mt-3">
        <p>Refreshing in {countdown} seconds...</p>
      </div>
    </div>
  );
}

export default function App() {
  const [showTracker, setShowTracker] = useState(true);
  const toggleTracker = () => setShowTracker(!showTracker);

  return (
    <div className="container d-flex flex-column min-vh-100">
      <div className="flex-grow-1 d-flex justify-content-center align-items-center">
        {showTracker && <GeolocationTracker />}
      </div>
      <div className="d-flex justify-content-center mt-auto mb-3">
        <button className="btn btn-primary" onClick={toggleTracker}>
          {showTracker ? 'Geolocation Turn Off' : 'Geolocation Turn On'}
        </button>
      </div>
    </div>
  );
}
