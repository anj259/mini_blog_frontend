import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard";

function PostByUser() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        fetch("http://localhost:3000/api/post", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                // Filter posts by logged in user using token
                const userId = JSON.parse(atob(token.split('.')[1])).id;
                const userPosts = data.filter(post => post.author?._id === userId);
                setPosts(userPosts);
            })
            .catch(err => console.error(err));
    }, [token, navigate]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            const res = await fetch(`http://localhost:3000/api/post/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });

            const result = await res.json();
            if (res.ok) {
                setPosts(prev => prev.filter(post => post._id !== id));
            } else {
                alert(result.message || "Failed to delete");
            }
        } catch (err) {
            console.error(err);
            alert("Server error. Try again later.");
        }
    };

    const totalPages = Math.ceil(posts.length / postsPerPage);
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const currentPosts = posts.slice(firstIndex, lastIndex);

    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    };

    const imageStyle = {
        width: "100%",
        height: "200px",
        objectFit: "contain",
        borderRadius: "6px",
        marginBottom: "10px"
    };

    const authdata = {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        color: "#555",
        fontSize: "14px"
    };

    const paginationStyle = {
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        marginTop: "20px"
    };

    const btnStyle = (active = false) => ({
        padding: "6px 12px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        cursor: "pointer",
        backgroundColor: active ? "#007bff" : "#fff",
        color: active ? "#fff" : "#000"
    });

    const deletebtnStyle = {
        marginTop: "10px",
        padding: "6px 12px",
        backgroundColor: "#ff4d4f",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }

    const updatebtn={
        marginTop: "10px",
        padding: "6px 12px",
        backgroundColor: "#276d26ff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    }

    return (
        <Dashboard>
            <h2>My Posts</h2>

            {currentPosts.map(post => (
                <div key={post._id} style={cardStyle}>
                    <h3>{post.title}</h3>
                    {post.image && <img src={`http://localhost:3000/uploads/${post.image}`} alt="post" style={imageStyle} />}
                    <p>{post.content}</p>

                    <div style={authdata}>
                        <span>{post.author?.user_name}</span>
                        <span>{post.author?.email}</span>
                    </div>

                    <button style={updatebtn} onClick={() => navigate(`/updatepost/${post._id}`)} >
                        Update
                    </button>

                    <button onClick={() => handleDelete(post._id)} style={deletebtnStyle} >
                        Delete
                    </button>
                </div>
            ))}

            <div style={paginationStyle}>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                    Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} style={btnStyle(currentPage === page)} onClick={() => setCurrentPage(page)}>
                        {page}
                    </button>
                ))}
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                    Next
                </button>
            </div>
        </Dashboard>
    );
}

export default PostByUser;
