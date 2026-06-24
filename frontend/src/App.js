import { useState } from "react";
import Login from "./login";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
          <h1>Successfully Logged In</h1>
          <p>Waiting for the developer to build more...</p>

          <button onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;