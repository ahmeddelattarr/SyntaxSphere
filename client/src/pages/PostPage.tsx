import { useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { useEffect, useState } from "react";
import Post from "../components/ui/Post";

interface Post {
    content: string;
    id: string;
    title: string;
    url: string;
    posted_at: string;
    like_count: number
}

const PostPage = () => {
    const { postId } = useParams()
    const [post, setPost] = useState<Post>();

    useEffect(() => {
        const token = localStorage.getItem('access');
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:8000/posts/${postId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            if (!response.ok) {
                alert("error");
                return;
            }
            const data = await response.json()
            setPost(data);
        }
        const fetchComments = async()=>{
            const response = await fetch(`http://localhost:8000/posts/${postId}/comments`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            if(!response.ok){
                alert("error");
                return;
            }
            const data = await response.json();
            console.log(data);
        }
        fetchPost();
        fetchComments();
    }, [])

    return (

        <div className="min-h-screen w-screen text-gray-200 bg-gray-800">
            <Navbar />
            <div className="container mx-auto p-6 mt-86">
                {/* @ts-ignore */}
                <Post post={{id:postId,...post}}/>
            </div>
        </div>
    )
}

export default PostPage;