import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Dashboard from "../components/dashboard";

function AddPost() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title || !content) {
            setError("Title and content are required");
            return;
        }

        const token = sessionStorage.getItem("token");
        if (!token) {
            setError("Please login first");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (image) {
                formData.append("postImage", image);
            }

            const response = await fetch("http://localhost:3000/api/post", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess("Post created successfully");
                setTitle("");
                setContent("");
                setImage(null);

                setTimeout(() => {
                    navigate("/postbyuser");
                }, 1000);
            } else {
                setError(result.message || "Failed to create post");
            }
        } catch (err) {
            setError("Server error. Try again later.");
        }
    };
    const formStyle = {
        maxWidth: "500px",
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    };

    const textareaStyle = {
        width: "100%",
        height: "100px",
        padding: "10px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    };

    const buttonStyle = {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    };


    return (
        <Dashboard>
            <h2>Add Post</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleSubmit} style={formStyle}>

                <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} />
                <textarea placeholder="Post Content" value={content} onChange={(e) => setContent(e.target.value)} style={textareaStyle} />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                <button type="submit" style={buttonStyle}> Add Post</button>
            </form>
        </Dashboard>
    );
}

export default AddPost;
