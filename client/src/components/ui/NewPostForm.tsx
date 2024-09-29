import { useState } from "react";

interface NewPostProps{
  refreshTimeLine:()=>void
} 

const NewPostForm: React.FC<NewPostProps> = ({refreshTimeLine}) => {
  const [title, setTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('access');
    if (title.trim().length<5) {
      setErrorMessage("You need to write a post exceeding 4 characters!");
      return;
    }
    const submittedTitle = title.trim();
    const sendPost = async()=>{
      const response = await fetch('http://localhost:8000/posts/',{
        method:'Post',
        headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          "title":submittedTitle,
          "url":'https://chatgpt.com/c/66f540e5-4850-8012-9a41-d9442b57953f'
        })
      })
      if(!response.ok){
        setErrorMessage("Something went wrong Please Refresh the page")
      }
      await response.json();
      refreshTimeLine();
    }
    sendPost();
  };

  return (
    <div className="flex flex-col border border-gray-700 p-4 bg-gray-900 text-white shadow-md">
      <div className="mr-4">
      </div>

      <form onSubmit={handleSubmit} className="flex-1">
        <div className="mb-4">
          <textarea
            id="postTitle"
            className="w-full bg-transparent text-xl resize-none outline-none text-gray-300 placeholder-gray-500"
            placeholder="What's happening?"
            rows={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
        )}

        <div className="flex justify-between items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-4 rounded-full"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPostForm;
