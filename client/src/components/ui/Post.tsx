import { useNavigate } from "react-router-dom";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";

interface PostData {
    id: string;
    title: string;
    url: string;
    user: string;
    posted_at: string;
    like_count: number;
}

interface PostProps {
    post: PostData;
    isLast: boolean
}

const Post: React.FC<PostProps> = ({ post,isLast }) => {
    const navigate = useNavigate();
    
    const classList = `cursor-pointer p-4 shadow-md border border-gray-900 ${!isLast&& 'border-b-0'}`

    const viewCommentHandler=()=>{
        alert("Placeholder");
    }

    const toggleLikeHandler=()=>{
        alert("Placeholder");
    }

    const postOnClickHandler:React.EventHandler<React.MouseEvent<HTMLDivElement>> =(event)=>{
        if((event.target as HTMLElement).closest('.gap-4'))
            return;
        alert("Placeholder");
    }


    return (
        <div onClick={postOnClickHandler} key={post.id} className={classList}>
            <div className="flex items-center space-x-4">

                <div className="flex flex-row gap-5 items-center">
                    <h2 className="text-gray-100 font-bold text-lg">{post.user}</h2>
                    <p className="text-gray-500 text-sm">
                      &#9679;  {new Date(post.posted_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <p className="mt-3 text-white text-xl leading-relaxed">
                {post.title}
            </p>
            <div className="flex gap-4">
                <div onClick={toggleLikeHandler} className="cursor-pointer flex items-center mt-4 text-gray-500 space-x-1 group hover:text-gray-100">
                    <LikeIcon style="text-2xl fill-gray-500 fill-current stroke-0 inline mr-1 group:hover-fill-gray-100" /> {post.like_count}
                </div>

                <div onClick={viewCommentHandler}className="cursor-pointer flex items-center mt-4 text-gray-500 space-x-1 group hover:text-gray-100">
                    <CommentIcon style="text-2xl fill-gray-500 fill-current stroke-0 inline mr-1 group:hover-fill-gray-100" /> {post.like_count}
                </div>
            </div>
        </div>
    );
};

export default Post;
