import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Post from "../components/ui/Post";
import NewPostForm from "../components/ui/NewPostForm";
import { fetchWithToken } from "../lib/utils";

interface PostData {
    id: string;
    title: string;
    content: string;
    url: string;
    user: string;
    posted_at: string;
    like_count: number;
}

interface PostResponse {
  previous:string|null;
  next:string|null;
  count:number;
  results:PostData[];
}


const Homepage = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [addNewPost,SetAddNewPost] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetchWithToken('posts/','GET')
      if (!response.ok) {
        navigate("/login");
      }
      const data:PostResponse = await response.json();
      console.log(data)
      setPosts(data.results);
    }; 
    fetchPosts();
  }, [navigate, addNewPost]);
  
  const refreshTimeLine= ()=>{
    SetAddNewPost(prevState=>!prevState);
  }
  const PostsEl =<div className="flex flex-col">{posts.map((post,i,posts) => (<Post isLast={i==posts.length-1} key={post.id} post={post}/>))}</div> 



  return (
    <div className="min-h-screen w-full text-gray-200 bg-gray-800">
      <Navbar/>
      <div className="container mx-auto p-6 mt-86">
        <div>
          <NewPostForm refreshTimeLine={refreshTimeLine}/>
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
