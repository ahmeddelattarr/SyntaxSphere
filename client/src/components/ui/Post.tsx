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
}

const Post: React.FC<PostProps> = ({ post }) => {
    return (
        <div key={post.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
            <div className="flex items-center space-x-4">
               
                <div>
                    <h2 className="text-gray-900 font-bold text-lg">{post.user}</h2>
                    <p className="text-gray-500 text-sm">
                        {new Date(post.posted_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            <p className="mt-3 text-black text-xl leading-relaxed">
                {post.title}
            </p>

            <div className="flex items-center mt-4 text-gray-500 space-x-1">
                
                <span>{post.like_count} Likes</span>
            </div>

            <a
                href={post.url}
                className="text-blue-500 underline mt-4 block hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
            >
                View Comments
            </a>
        </div>
    );
};

export default Post;
