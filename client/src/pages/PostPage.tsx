import { useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Post from "../components/ui/Post";
import Comment from "../components/ui/Comment";
import { PostData } from "../types/post-interfaces";
import { CommentResponse } from "../types/comment-interfaces";
import useFetchWithToken from "../hooks/useFetchWithToken";


const PostPage = () => {
    const postId = useParams().postId!;
    const { data: post } = useFetchWithToken<PostData>(`/posts/${postId}/`, 'GET');
    const { data: commentResponse, refresh: refreshComments } = useFetchWithToken<CommentResponse>(`/posts/${postId}/comments/`, `GET`);

    const handleSeeMore = ()=>{
        const currentLength= commentResponse?.results.length||0;
        refreshComments(`?limit=${currentLength+10}`)
    }

    const CommentsListEl = commentResponse?.results.length ? (
        <div>{commentResponse.results.map((el) => <Comment key={el.id} commentObj={el} />)}</div>
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
                {commentResponse?.next && (
                    <div className="text-center mt-6">
                        <button
                            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-sm transition-all duration-200"
                            onClick={handleSeeMore}
                        >
                            See More
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostPage;