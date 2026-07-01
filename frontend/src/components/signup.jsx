import "../css/signup.css";
import { useState } from "react";
import {useNavigate} from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    userFirstName: "",
    userLastName: "",
    userContact: "",
    userEmail: "",
    userPassword: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/user/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("User Registered Successfully");
        console.log(data);

        setFormData({
          userFirstName: "",
          userLastName: "",
          userContact: "",
          userEmail: "",
          userPassword: "",
        });
      } else {
        alert(data.msg || "Registration Failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="userFirstName"
            placeholder="First Name"
            value={formData.userFirstName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="userLastName"
            placeholder="Last Name"
            value={formData.userLastName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="userContact"
            placeholder="Contact Number"
            value={formData.userContact}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="userEmail"
            placeholder="Email Address"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="userPassword"
            placeholder="Password"
            value={formData.userPassword}
            onChange={handleChange}
            required
          />

          <button 
          type="submit">
            Register
          </button>

          <button 
          type="submit"
          className="login"
          onClick={()=> navigate("/")}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;