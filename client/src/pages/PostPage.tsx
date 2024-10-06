import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import { useEffect, useState } from "react";
import Post from "../components/ui/Post";
import Comment from "../components/ui/Comment";
import { PostData } from "../types/post-interfaces";
import { fetchWithToken } from "../lib/utils";
import { CommentData } from "../types/comment-interfaces";


const PostPage = () => {
    const postId = useParams().postId!;
    const [post, setPost] = useState<PostData>();
    const [comments, setComments] = useState<CommentData[]>();
    const [commentSubmitted,setCommentSubmitted] = useState(false);
    const navigate = useNavigate();

    const refreshComments = ()=>{
        setCommentSubmitted(prevState=>!prevState);
    }

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetchWithToken(`/posts/${postId}/comments`, 'GET')
            if (response.status == 401)
                navigate('/');
            const data: CommentData[] = await response.json();
            setComments([...data]);
        }
        const fetchPost = async () => {
            const response = await fetchWithToken(`/posts/${postId}/`, 'GET');
            if (response.status == 401)
                navigate('/');
            const data: PostData = await response.json();
            setPost(data);
        }
        fetchPost();
        fetchComments();
    }, [navigate, postId,commentSubmitted])


    const CommentsListEl = comments?.length ? (
        <div>{comments.map((el) => <Comment key={el.id} commentObj={el} />)}</div>
    ) : (
        <div className="text-gray-400 text-center mt-4">There are no comments yet.</div>
    );
    return (

        <div className="min-h-screen w-full text-gray-200 bg-gray-800">
            <Navbar />
            <div className="container mx-auto p-6 mt-86">
                {post && <Post refreshComments={refreshComments} isSingular={true} post={post} />}
                <h3 className="p-2 text-xl font-semibold text-white mt-8 mb-4 border-b border-gray-600 pb-2">
                    Comments
                </h3>
                {CommentsListEl}
            </div>
        </div>
    )
}

export default PostPage;