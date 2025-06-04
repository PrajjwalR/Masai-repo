import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then(res => res.json())
      .then(data => setPosts(data.posts));
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "20px", padding: "5px", width: "100%" }}
      />
      {filteredPosts.map(post => (
        <div key={post.id} style={{ marginBottom: "15px" }}>
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
          </Link>
          <p>{post.body.slice(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
