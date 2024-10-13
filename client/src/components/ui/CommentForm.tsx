import { Button } from './common/Button';
import TextArea from './common/TextArea';

interface CommentFormProps {
    onSubmit: (e: React.FormEvent) => void;
    errorMessage?: string;
    commentText: string;
    setCommentText: React.Dispatch<React.SetStateAction<string>>;
}

const CommentForm: React.FC<CommentFormProps> = ({ setCommentText, commentText, onSubmit, errorMessage }) => {

    const commentOnChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentText(event.target.value);
    };

    return (
        <div className="mt-4 bg-gray-900 p-4 rounded-lg border border-gray-700">
            <form onSubmit={onSubmit} className="space-y-4">
                <TextArea
                    variant='comment'
                    rows={3}
                    placeholder="Write a comment..."
                    value={commentText}
                    onChange={commentOnChangeHandler}
                />

                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                <div className="flex justify-end">
                    <Button
                        variant='blue'
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CommentForm;
