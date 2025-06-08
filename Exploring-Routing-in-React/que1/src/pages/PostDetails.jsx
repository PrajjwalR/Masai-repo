import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`https://dummyjson.com/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <div>
        <strong>Tags:</strong> {post.tags.join(', ')}
      </div>
    </div>
  );
}
