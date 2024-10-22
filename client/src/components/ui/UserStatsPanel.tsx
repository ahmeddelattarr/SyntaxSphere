interface UserStatsPanelProps {
    activePanel: "posts" | "comments" | "likes";
    onShowPosts: () => void;
    onShowComments: () => void;
    onShowLikes: () => void;
}

const UserStatsPanel: React.FC<UserStatsPanelProps> = ({ activePanel, onShowPosts, onShowComments, onShowLikes }) => {
    return (
        <div className="bg-gray-800 mt-6 p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-3 gap-4 text-center">
                <button
                    onClick={onShowPosts}
                    className={`focus:outline-none transition-all ${
                        activePanel === "posts" ? "border-b-4 border-blue-500" : ""
                    } hover:bg-gray-700 p-2 rounded-lg`}
                >
                    <h3 className="text-xl font-bold text-white">Posts</h3>
                </button>

                <button
                    onClick={onShowComments}
                    className={`focus:outline-none transition-all ${
                        activePanel === "comments" ? "border-b-4 border-blue-500" : ""
                    } hover:bg-gray-700 p-2 rounded-lg`}
                >
                    <h3 className="text-xl font-bold text-white">Comments</h3>
                </button>

                <button
                    onClick={onShowLikes}
                    className={`focus:outline-none transition-all ${
                        activePanel === "likes" ? "border-b-4 border-blue-500" : ""
                    } hover:bg-gray-700 p-2 rounded-lg`}
                >
                    <h3 className="text-xl font-bold text-white">Likes</h3>
                </button>
            </div>
        </div>
    );
};

export default UserStatsPanel;