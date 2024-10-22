import React from "react";
import Username from "./common/UserName";

interface CommentObj {
  comment: string;
  id: string;
  post_id: string;
  posted_at: string;
  user_id: number;
  username: string;
}
interface CommentProps {
  commentObj: CommentObj;
}

const Comment: React.FC<CommentProps> = ({ commentObj }) => {
  return (
    <div
      key={commentObj.id}
      className="bg-gray-900 shadow-md border border-gray-700 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Username userId={commentObj.user_id}>{commentObj.username}</Username>
          <p className="text-gray-500 text-sm">
            &#9679; {new Date(commentObj.posted_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-gray-300 text-base leading-relaxed mt-2">
        {commentObj.comment}
      </p>
    </div>
  );
};

export default Comment;
