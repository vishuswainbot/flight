import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import Flights from "./components/flights";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/flights" element={<Flights />} />
    </Routes>
  );
}

export default App;