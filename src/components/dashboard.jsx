import { useNavigate } from "react-router-dom";

function Dashboard({ children }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.clear();   // clear session when logged out   
        navigate("/login");
    };

    const divStyle = {
        width: "200px",
        background: "#333",
        color: "#fff",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    }

    const btnStyle = {
        display: "block",
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor: "#555",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        textAlign: "left"
    }

    const logoutbtnStyle = {
        marginTop: "-10px",
        padding: "10px",
        backgroundColor: "#ff4d4f",
        border: "none",
        borderRadius: "5px",
        color: "#fff",
        cursor: "pointer"
    }

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>

            <div style={divStyle}>
                <div>
                    <h3>Dashboard</h3>
                    <button onClick={() => navigate("/posts")} style={btnStyle} >
                        Post List
                    </button>

                    <button onClick={() => navigate("/addpost")} style={btnStyle} >
                        Add Post
                    </button>
                    <button onClick={() => navigate("/postbyuser/:id")} style={btnStyle} >
                        My Posts
                    </button>
                </div>

                <button onClick={handleLogout} style={logoutbtnStyle} >
                    Logout
                </button>
            </div>

            <div style={{ flex: 1, padding: "20px" }}>
                {children}    {/* pages are wrapped in dashboard */}
            </div>

        </div>
    );
}

export default Dashboard;
