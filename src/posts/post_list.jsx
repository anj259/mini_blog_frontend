import { useEffect, useState } from "react";
import Dashboard from "../components/dashboard";

function PostList() {
    const [posts, setPosts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    useEffect(() => {
        fetch("http://localhost:3000/api/post")
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(err => console.error(err));
    }, []);

    // Pagination logic
    const lastIndex = currentPage * postsPerPage;
    const firstIndex = lastIndex - postsPerPage;
    const currentPosts = posts.slice(firstIndex, lastIndex);

    const totalPages = Math.ceil(posts.length / postsPerPage);

    const cardStyle = {
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "15px",
        marginBottom: "15px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
    };

    const authdata = {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "10px",
        color: "#555",
        fontSize: "14px"
    };

    const imageStyle = {
        width: "100%",
        height: "200px",
        objectFit: "contain",
        borderRadius: "6px",
        marginBottom: "10px"
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

    return (
        <Dashboard>
            <h2>Post List</h2>

            {currentPosts.map(post => (
                <div key={post._id} style={cardStyle}>

                    <h3>{post.title}</h3>
                    {post.image && (
                        <img src={`http://localhost:3000/uploads/${post.image}`} alt="post" style={imageStyle} />
                    )}
                    <p>{post.content}</p>

                    <div style={authdata}>
                        <span>
                            {post.author?.user_name || "Unknown"}
                        </span>
                        <span>
                            {post.author?.email || "N/A"}
                        </span>
                    </div>

                </div>
            ))}
            <div style={paginationStyle}>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button key={page} style={btnStyle(currentPage === page)} onClick={() => setCurrentPage(page)} >
                        {page}
                    </button>
                ))}

                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </button>
            </div>
        </Dashboard>
    );
}

export default PostList;
