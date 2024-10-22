import { useNavigate } from "react-router-dom";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import { useEffect, useState } from "react";
import { PostData } from "../../types/post-interfaces";
import CommentForm from "./CommentForm";
import { fetchWithToken } from "../../lib/utils";
import Username from "./common/UserName";

interface PostProps {
    post: PostData;
    isLast?: boolean;
    isSingular?: boolean;
    refreshComments?: () => void;
}

const Post: React.FC<PostProps> = ({ post, isLast = false, isSingular = false, refreshComments }) => {
    const [nOfLikes, setNOfLikes] = useState<number>();
    const [isCommentFormVisible, setIsCommentFormVisible] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        setNOfLikes(post.like_count);
    }, [post]);

    const classList = `bg-gray-900 ${isSingular ? 'select-none' : 'cursor-pointer'} shadow-md border border-gray-700 ${!isLast && 'border-b-0'}`;

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) {
            setErrorMessage('Comment cannot be empty.');
            return;
        }
        setErrorMessage('');
        setCommentText('');

        const sendComment = async () => {
            const response = await fetchWithToken(`posts/${post.id}/comments/`, "POST", { comment: commentText });
            if (!response.ok)
                alert('error');
            await response.json();
            refreshComments!();
        };
        sendComment();
        setIsCommentFormVisible(false);
    };

    const commentButtonHandler = () => {
        if (isSingular) {
            setIsCommentFormVisible(!isCommentFormVisible);
            return;
        }
        navigate('/post/' + post.id);
    };

    const toggleLikeHandler = () => {
        const likePost = async () => {
            const response = await fetchWithToken(`posts/${post.id}/like/`, "POST");
            if (!response.ok) {
                alert("smth went wrong");
                return;
            }
            const { likes_count: likesCount } = await response.json();
            setNOfLikes(likesCount);

        };
        likePost();
    };

    const postOnClickHandler: React.EventHandler<React.MouseEvent<HTMLDivElement>> = (event) => {
        if (isSingular)
            return;
        if ((event.target as HTMLElement).closest('.gap-4') || (event.target as HTMLElement).tagName === 'H2')
            return;
        navigate('/post/' + post.id);
    };


    return (
        <>
            <div
                onClick={postOnClickHandler}
                key={post.id}
                className={`${classList} p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200`}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Username userId={post.user_id}>{post.user}</Username>
                        <p className="text-gray-500 text-sm">
                            &#9679; {new Date(post.posted_at).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <h3 className="text-gray-100 text-xl font-bold mt-4 select-text">{post.title}</h3>

                <p className="text-gray-300 text-base leading-relaxed mt-2 select-text">
                    {post.content}
                </p>
                {isSingular && <a href={post.url} className="select-text hover:underline cursor-pointer" target="_blank">
                    {post.url}
                </a>}

                <div className="flex gap-4 mt-4 border-t border-gray-700 pt-3">
                    <div
                        onClick={toggleLikeHandler}
                        className="select-none cursor-pointer flex items-center text-gray-500 space-x-1 group hover:text-white"
                    >
                        <LikeIcon style="text-2xl fill-current stroke-0 inline mr-1 group-hover:fill-white transition-colors duration-200" />
                        <span className="text-sm">{nOfLikes}</span>
                    </div>

                    <div
                        onClick={commentButtonHandler}
                        className="cursor-pointer flex items-center text-gray-500 space-x-1 group hover:text-white"
                    >
                        <CommentIcon style="text-2xl fill-current stroke-0 inline mr-1 group-hover:fill-white transition-colors duration-200" />
                        <span className="text-sm">{isSingular ? 'Write a Comment' : 'View Comments'}</span>
                    </div>
                </div>


            </div>
            {isCommentFormVisible && <CommentForm commentText={commentText} setCommentText={setCommentText} errorMessage={errorMessage} onSubmit={handleCommentSubmit} />}
        </>


    );
};

export default Post;
