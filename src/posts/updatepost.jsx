import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dashboard from "../components/dashboard";

function UpdatePost() {
    const { id } = useParams(); // get post id from URL 
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [existingImage, setExistingImage] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const token = sessionStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`http://localhost:3000/api/post/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setTitle(data.title);
                    setContent(data.content);
                    setExistingImage(data.image);
                }
            })
            .catch(err => setError("Failed to fetch post data"));
    }, [id, navigate, token]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!title || !content) {
            setError("Title and content are required");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            if (image) {
                formData.append("postImage", image);
            }

            const res = await fetch(`http://localhost:3000/api/post/${id}`, {
                method: "PUT",
                headers: { Authorization: `Bearer ${token}` },
                body: formData
            });

            const result = await res.json();

            if (res.ok) {
                setSuccess("Post updated successfully!");
                setTimeout(() => navigate("/postbyuser"), 1000);
            } else {
                setError(result.message || "Failed to update post");
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
        backgroundColor: "#28a745",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer"
    };

    const imageStyle = {
        width: "100%",
        height: "200px",
        objectFit: "contain",
        borderRadius: "6px",
        marginBottom: "10px"
    };

    return (
        <Dashboard>
            <h2>Update Post</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>{success}</p>}

            <form onSubmit={handleUpdate} style={formStyle}>
                <input type="text" placeholder="Post Title" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle}/>
                <textarea placeholder="Post Content" value={content} onChange={(e) => setContent(e.target.value)} style={textareaStyle}/>

                {existingImage && (
                    <div>
                        <img src={`http://localhost:3000/uploads/${existingImage}`} alt="Existing" style={imageStyle} />
                    </div>
                )}

                <input type="file" onChange={(e) => setImage(e.target.files[0])} />

                <button type="submit" style={buttonStyle}>
                    Update Post
                </button>
            </form>
        </Dashboard>
    );
}

export default UpdatePost;
