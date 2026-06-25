function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Successfully Logged In</h1>

      <h3>
        Welcome {user?.firstName} {user?.lastName}
      </h3>

      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;