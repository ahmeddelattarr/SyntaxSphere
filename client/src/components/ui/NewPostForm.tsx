import { useCallback, useState } from "react";
import UrlIcon from "./icons/UrlIcon";
import TextArea from "./common/TextArea";
import { Input } from "./common/Input";
import { Button } from "./common/Button";
import { fetchWithToken } from "../../lib/utils";

interface NewPostProps {
  refreshTimeLine: () => void;
}

const NewPostForm: React.FC<NewPostProps> = ({ refreshTimeLine }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [url, setUrl] = useState("");
  const [displayUrl, setDisplayUrl] = useState(false);

  const cleanForm = useCallback(()=>{
    setTitle("");
    setContent("");
    setErrorMessage("");
    setUrl("");
    setDisplayUrl(false);
  },[])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
      const response = await fetchWithToken(`posts/`,"POST",{
          "title": submittedTitle.trim(),
          "content": content.trim(),
          "url": url.trim()
        });
      if (!response.ok) {
        setErrorMessage("Something went wrong Please Refresh the page");
      }
      await response.json();
      refreshTimeLine();
    };
    cleanForm();
    sendPost();
  };

  return (
    <div className="flex flex-col border border-gray-700 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex-1">
        <TextArea
          variant="post"
          id="postTitle"
          placeholder="What's on your mind?"
          rows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextArea
          variant="post"
          id="postContent"
          placeholder="Share more details..."
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required

        />
        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}

        <div className="flex gap-5 justify-end items-center">
          {displayUrl ? <Input
            type="url"
            placeholder="Add a URL (optional)"
            variant="url"
            onChange={(e) => setUrl(e.target.value)}
            value={url}
          /> :
            <button onClick={() => { setDisplayUrl(prevState => !prevState); }}>
              <UrlIcon style="text-2xl fill-current text-gray-500 hover:text-white transition-colors duration-200 cursor-pointer" />
            </button>}
          <Button
            variant="blue"
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-sm transition-all duration-200"
          >
            Post
          </Button>
        </div>
      </form>
    </div>

  );
};

export default NewPostForm;
