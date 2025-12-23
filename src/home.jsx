import { Link } from "react-router-dom";

const registerbtnStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  backgroundColor: "#3626e9ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
}

const loginbtnStyle = {
  marginTop: "10px",
  padding: "6px 12px",
  backgroundColor: "#9b26e9ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginLeft: "10px"
}

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to Blog App</h1>

      <Link to="/register">
        <button style={registerbtnStyle}>Register</button>
      </Link>

      <Link to="/login">
        <button style={loginbtnStyle}>Login</button>
      </Link>
    </div>
  );
};

export default Home;
