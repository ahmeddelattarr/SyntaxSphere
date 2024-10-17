import { useLocation } from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import useFetchWithToken from "../hooks/useFetchWithToken";
import { PostResponse } from "../types/post-interfaces";
import Post from "../components/ui/Post";
import { Button } from "../components/ui/common/Button";

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || '';
    const { data: response, error, loading, refresh } = useFetchWithToken<PostResponse>(`posts/?search=${searchQuery}`, "GET");

    const handleSeeMore = () => {
        const currentLength = response?.results.length || 0;
        refresh(`&limit=${currentLength + 10}`);
    };

    const PostsEl = response?.results && <div>{response.results.map((post, i, posts) => (<Post isLast={i == posts.length - 1} key={post.id} post={post} />))}</div>;

    return (
        <div className="min-h-screen w-full text-gray-200 bg-gray-800">
            <Navbar />
            <div className="container mx-auto p-6 mt-4">
                <h1 className="text-3xl font-bold mb-6">Search Results for "{searchQuery}"</h1>

                {loading && <p>Loading...</p>}

                {error && <p className="text-red-500">Error: {error}</p>}

                {response && response.results.length > 0 ? (
                    <div className="flex flex-col">
                    {PostsEl}
                    </div>
                ) : (
                    !loading && <p>No posts found for "{searchQuery}".</p>
                )}
                {response?.next && (
                    <div className="text-center mt-6">
                        <Button
                            variant="blue"
                            onClick={handleSeeMore}
                        >
                            See More
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;