import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const collectData = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/api/auth/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_name: userName,
                    email,
                    mobileNumber,
                    password
                })
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                // alert("Registration Successful!");
                navigate("/login");
            } else {
                setError(result.message || "Registration failed");          
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setError("Server error. Please try again later.");
        }
    };

    const formStyle = {
        width: "300px",
        margin: "80px auto",
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
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        cursor: "pointer",
        borderRadius: "10px"
    };

    return (
        <form style={formStyle} onSubmit={collectData}>
            <h2>Register</h2>
            <input style={inputStyle} placeholder="Username" value={userName} onChange={e => setUserName(e.target.value)} />
            <input style={inputStyle} placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <input style={inputStyle} placeholder="Mobile Number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
            <input style={inputStyle} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && (
                <p style={{ color: "red", fontSize: "14px" }}>
                    {error}
                </p>
            )}
            <button style={btnStyle}>Register</button>
            <p className="text-center text-gray-600">
                Already have an account?
                <Link to="/login" className="text-blue-600 font-semibold hover:underline">
                    Login
                </Link>
            </p>
        </form>
    );
}

export default Register;
