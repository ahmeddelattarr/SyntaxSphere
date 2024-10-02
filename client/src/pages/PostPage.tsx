import { useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { useEffect, useState } from "react";
import Post from "../components/ui/Post";
import Comment from "../components/ui/Comment";

interface Post {
    content: string;
    id: string;
    title: string;
    url: string;
    posted_at: string;
    like_count: number
}

interface CommentObj {
    comment: string;
    id: string;
    post_id: string;
    posted_at: string;
    user_id: number;
}

const PostPage = () => {
    const { postId } = useParams()
    const [post, setPost] = useState<Post>();
    const [comments, setComments] = useState<CommentObj[]>();
    const [reloadPage, SetReloadPage] = useState(false);
    const token = localStorage.getItem('access');

    const fetchComments = async () => {
        const response = await fetch(`http://localhost:8000/posts/${postId}/comments`, {
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
        const data = await response.json();
        data.reverse();
        setComments([...data]);
    }
    useEffect(() => {
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
        fetchPost();
        fetchComments();
    }, [])

    const refreshPage = () => {
        fetchComments();
    }

    const CommentsListEl = comments?.length ? (
        <div>{comments.map((el) => <Comment key={el.id} commentObj={el} />)}</div>
    ) : (
        <div className="text-gray-400 text-center mt-4">There are no comments yet.</div>
    );
    return (

        <div className="min-h-screen w-screen text-gray-200 bg-gray-800">
            <Navbar />
            <div className="container mx-auto p-6 mt-86">
                {/* @ts-ignore */}
                <Post reloadPage={refreshPage} isSingular={true} post={{ id: postId, ...post }} />
                <h3 className="p-2 text-xl font-semibold text-white mt-8 mb-4 border-b border-gray-600 pb-2">
                    Comments
                </h3>
                {CommentsListEl}
            </div>
        </div>
    )
}

export default PostPage;