import { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (data.token) {
                sessionStorage.setItem("token", data.token);
                // alert("Login Successful");
                navigate("/posts")

            } else {
                setError(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("Server error. Please try again later.");
        }
    };

    const formStyle = {
        width: "300px",
        margin: "100px auto",
        padding: "20px",
        border: "1px solid gray",
        borderRadius: "5px"
    };

    const inputStyle = {
        width: "90%",
        padding: "8px",
        margin: "8px 0",
        borderRadius: "10px"
    };

    const btnStyle = {
        width: "100%",
        padding: "10px",
        backgroundColor: "#2196F3",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "10px"
    };

    return (
        <form style={formStyle} onSubmit={loginUser}>
            <h2>Login</h2>

            <input style={inputStyle} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && (
                <p style={{ color: "red", fontSize: "14px" }}>
                    {error}
                </p>
            )}
            <button style={btnStyle}>Login</button>
            <p className="text-center text-gray-600">
                Dont't have an account?
                <Link to="/register" className="text-blue-600 font-semibold hover:underline">
                    Register
                </Link>
            </p>
        </form>
    );
}

export default Login;
