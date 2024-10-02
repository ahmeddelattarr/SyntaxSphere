import { useNavigate } from "react-router-dom";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import { useEffect, useState } from "react";

interface PostData {
    id: string;
    title: string;
    content: string;
    url: string;
    user: string;
    posted_at: string;
    like_count: number;
}

interface PostProps {
    post: PostData;
    isLast: boolean;
    isSingular: boolean
}

const Post: React.FC<PostProps> = ({ post, isLast, isSingular }) => {
    const [nOfLikes, setNOfLikes] = useState<number>();
    const navigate = useNavigate();

    useEffect(()=>{
        setNOfLikes(post.like_count);
    },[post])

    const classList = `bg-gray-900 cursor-pointer shadow-md border border-gray-700 ${!isLast && 'border-b-0'}`

    const viewCommentHandler = () => {
        if(isSingular)
            return
        navigate('/post/'+post.id)
    }

    const toggleLikeHandler = () => {
        const likePost = async () => {
            const token = localStorage.getItem('access')
            const response = await fetch(`http://localhost:8000/posts/${post.id}/like/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                alert("smth went wrong");
                return;
            }
            const { likes_count: likesCount } = await response.json();
            setNOfLikes(likesCount);

        }
        likePost();
    }

    const postOnClickHandler: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (event) => {
        if(isSingular)
            return
        if ((event.target as HTMLElement).closest('.gap-4'))
            return;
        navigate('/post/'+post.id)
    }


    return (
        <div
            onClick={postOnClickHandler}
            key={post.id}
            className={`${classList} p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200`}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <h2 className="text-white font-semibold text-lg">{post.user}</h2>
                    <p className="text-gray-500 text-sm">
                        &#9679; {new Date(post.posted_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <h3 className="text-gray-100 text-xl font-bold mt-4">{post.title}</h3>

            <p className="text-gray-300 text-base leading-relaxed mt-2">
                {post.content}
            </p>

            <div className="flex gap-4 mt-4 border-t border-gray-700 pt-3">
                <div
                    onClick={toggleLikeHandler}
                    className="select-none cursor-pointer flex items-center text-gray-500 space-x-1 group hover:text-white"
                >
                    <LikeIcon style="text-2xl fill-current stroke-0 inline mr-1 group-hover:fill-white transition-colors duration-200" />
                    <span className="text-sm">{nOfLikes}</span>
                </div>
                {!isSingular&&<div
                    onClick={viewCommentHandler}
                    className="cursor-pointer flex items-center text-gray-500 space-x-1 group hover:text-white"
                >
                    <CommentIcon style="text-2xl fill-current stroke-0 inline mr-1 group-hover:fill-white transition-colors duration-200" />
                    <span className="text-sm">View Comments</span>
                </div>}
            </div>
        </div>

    );
};

export default Post;
