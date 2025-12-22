import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome to Blog App</h1>

      <Link to="/register">
        <button>Register</button>
      </Link>

      <Link to="/login">
        <button style={{ marginLeft: "10px" }}>Login</button>
      </Link>
    </div>
  );
};

export default Home;
