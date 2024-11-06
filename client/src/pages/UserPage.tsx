import { useParams } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import useFetchWithToken from "../hooks/useFetchWithToken";
import { UserData } from "../types/user-interface";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import UserStatsPanel from "../components/ui/UserStatsPanel";
import { PostData } from "../types/post-interfaces";
import Post from "../components/ui/Post";
import { CommentData } from "../types/comment-interfaces";
import Comment from "../components/ui/Comment";


const UserPage = () => {
    const user_name = useParams().userId!;
    const [activePanel, setActivePanel] = useState<"posts" | "comments" | "likes">("posts");
    const { data: user, error, loading } = useFetchWithToken<UserData>(`profiles/${user_name}/`, "GET");
    const { data: posts } = useFetchWithToken<PostData[]>(`/posts/users/${user_name}`, 'GET');
    const { data: comments } = useFetchWithToken<CommentData[]>(`/users/${user_name}/comments`, 'GET');
    const { data: likes } = useFetchWithToken<PostData[]>(`/users/${user_name}/likes`, 'GET');

    const handleShowPosts = () => setActivePanel("posts");
    const handleShowComments = () => setActivePanel("comments");
    const handleShowLikes = () => setActivePanel("likes");

    if (loading) {
        return (
            <div className="min-h-screen w-full text-gray-200 bg-gray-800">
                <Navbar />
                <div className="container mx-auto p-6 mt-4 text-center">
                    <p>Loading user profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen w-full text-gray-200 bg-gray-800">
                <Navbar />
                <div className="container mx-auto p-6 mt-4 text-center">
                    <p className="text-red-500">Error loading user profile.</p>
                </div>
            </div>
        );
    }

    let elList;

    const setElList = () => {
        switch (activePanel) {
            case 'posts':
                elList = posts && <div className="flex flex-col">{posts.map((post, i, posts) => (<Post isLast={i == posts.length - 1} key={post.id} post={post} />))}</div>;
                break;
            case 'comments':
                elList = comments && <div className="flex flex-col">{comments.map((comment, i) => <Comment userPage={true} commentObj={comment} key={i}/>)}</div> 
            break;
            case 'likes':
                elList = likes && <div className="flex flex-col">{likes.map((post, i, posts) => (<Post isLast={i == posts.length - 1} key={post.id} post={{...post, id:post.post_id}} />))}</div>;
                break;
        }

    };
    setElList();

    return (
        <div className="min-h-screen w-full text-gray-200 bg-gray-800">
            <Navbar />
            <div className="container mx-auto p-6 mt-4">


                <div className="bg-gray-900 p-6 pt-8 rounded-lg shadow-md ">
                    <h1 className="text-3xl font-bold text-white mb-2">{user?.username || "Omar"}</h1>
                    <p className="text-gray-400 mb-4">@{user?.username || "unknown"}</p>
                    <p className="text-gray-300 mb-4">{user?.bio || "No bio available"}</p>

                    {user?.git_hub_url && (
                        <a
                            href={user.git_hub_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-fit items-center text-white bg-blue-500 px-4 py-2 rounded-full font-semibold hover:bg-blue-600 transition-colors"
                        >
                            <GitHubLogoIcon className="inline-block mr-2" />
                            Visit GitHub Profile
                        </a>
                    )}
                    <UserStatsPanel
                        activePanel={activePanel}
                        onShowPosts={handleShowPosts}
                        onShowComments={handleShowComments}
                        onShowLikes={handleShowLikes}
                    />
                </div>
                {elList}
            </div>



        </div>
    );
};

export default UserPage;