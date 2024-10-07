import { useLocation} from "react-router-dom";
import Navbar from "../components/ui/Navbar";
import Post from "../components/ui/Post";
import NewPostForm from "../components/ui/NewPostForm";
import Pagination from "../components/ui/Pagination";
import useFetchWithToken from "../hooks/useFetchWithToken";

interface PostData {
  id: string;
  title: string;
  content: string;
  url: string;
  user: string;
  posted_at: string;
  like_count: number;
}

interface PostResponse {
  previous: string | null;
  next: string | null;
  count: number;
  results: PostData[];
}

const getPageNumber = (pathname: string) => {
  return pathname === '/' ? 1 : parseInt(pathname.split('/')[1]);
};


const Homepage = () => {
  const location = useLocation();
  const currentPage = getPageNumber(location.pathname);
  const offset = (currentPage - 1) * 10;
  const { data: postResponse, refresh: refreshTimeLine } = useFetchWithToken<PostResponse>(`posts/?limit=10&offset=${offset}`, 'GET');

  const posts = postResponse?.results;

  const PostsEl = posts&&<div className="flex flex-col">{posts.map((post, i, posts) => (<Post isLast={i == posts.length - 1} key={post.id} post={post} />))}</div>;

  return (
    <div className="min-h-screen w-full text-gray-200 bg-gray-800">
      <Navbar />
      <div className="container mx-auto p-6 mt-86">
        <div>
          <NewPostForm refreshTimeLine={refreshTimeLine} />
          {posts && posts.length > 0 ? (
            PostsEl
          ) : (
            <p className="text-center text-gray-400">No posts available</p>
          )}
        </div>
        <Pagination refreshTimeLine={refreshTimeLine} currentPage={currentPage} totalPosts={postResponse?.count||0} />
      </div>
    </div>
  );
};

export default Homepage;
