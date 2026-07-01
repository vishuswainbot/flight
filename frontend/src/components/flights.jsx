import "../css/flights.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Flights() {
  const [flights, setFLights] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/"); 
}; 
useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/user/flights`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to fetch flights");
        }
        return response.json();
      })
      .then((data) => {
        setFLights(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="flights-page">
      <div className="header">
        <h1>✈ Available Flights</h1>
        <p>Choose your next journey</p>
      </div>
      <button className="logout-btn"
      onClick={handleLogout}
      >Log Out</button>

      <div className="flight-grid">
        {flights.map((flight) => (
          <div className="flight-card" key={flight._id}>
            <div className="airline">
              <h2>{flight.airline_name}</h2>
              <span>{flight.flight_number}</span>
            </div>

            <div className="route">
              <div className="city">
                <h3>{flight.departure_airport}</h3>
                <p>{flight.departure_time}</p>
              </div>

              <div className="flight-line">
                <span>✈</span>
                <div></div>
                <small>{flight.duration}</small>
              </div>

              <div className="city">
                <h3>{flight.arrival_airport}</h3>
                <p>{flight.arrival_time}</p>
              </div>
            </div>

            <button className="book-btn">Book Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Flights;
