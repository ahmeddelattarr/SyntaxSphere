import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Post from "../components/ui/Post";

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:8000/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        navigate("/login");
      }
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [navigate]);
  
// @ts-ignore
  const PostsEl =<div className="flex flex-col">{posts.map((post,i,posts) => (<Post isLast={i==posts.length-1} key={post.id} post={post}/>))}</div> 



  return (
    <div className="min-h-screen w-screen text-gray-200">
      <Navbar/>
      <div className="container mx-auto p-6">
        <div>
          {posts.length > 0 ? (
           PostsEl
          ) : (
            <p className="text-center text-gray-400">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;