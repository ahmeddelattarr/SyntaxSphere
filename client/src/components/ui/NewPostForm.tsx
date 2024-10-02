import { useState } from "react";
import UrlIcon from "./icons/UrlIcon";

interface NewPostProps {
  refreshTimeLine: () => void
}

const NewPostForm: React.FC<NewPostProps> = ({ refreshTimeLine }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    if (title.trim().length < 5) {
      setErrorMessage("You need to write a title exceeding 4 characters!");
      return;
    }
    if (content.trim().length < 11) {
      setErrorMessage("Your content needs to exceed 10 characters!");
      return;
    }
    const submittedTitle = title.trim();
    const sendPost = async () => {
      const response = await fetch('http://localhost:8000/posts/', {
        method: 'Post',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "title": submittedTitle.trim(),
          "content": content.trim(),
          "url": url.trim()
        })
      })
      if (!response.ok) {
        setErrorMessage("Something went wrong Please Refresh the page")
      }
      await response.json();
      refreshTimeLine();
    }
    sendPost();
  };

  return (
    <div className="flex flex-col border border-gray-700 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex-1">
        <div className="mb-4">
          <textarea
            id="postTitle"
            className="w-full bg-transparent border border-gray-700 text-xl resize-none outline-none text-gray-300 placeholder-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="What's on your mind?"
            rows={2}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            id="postContent"
            className="w-full bg-transparent border border-gray-700 text-lg resize-none outline-none text-gray-300 placeholder-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            placeholder="Share more details..."
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}

        <div className="flex gap-5 justify-end items-center">
          {displayUrl ? <input
            type="url"
            placeholder="Add a URL (optional)"
            className="w-full bg-transparent border border-gray-700 text-lg text-gray-300 placeholder-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          /> :
            <button onClick={() => { setDisplayUrl(prevState => !prevState) }}>
              <UrlIcon style="text-2xl fill-current text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer" />
            </button>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-sm transition-all duration-200"
          >
            Post
          </button>
        </div>
      </form>
    </div>

  );
};

export default NewPostForm;
