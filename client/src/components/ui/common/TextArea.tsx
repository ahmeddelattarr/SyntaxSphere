import React from "react";

type TextAreaVariant = "post" | "comment"|"bio";

const TextAreaClasses: Record<TextAreaVariant, string> = {
    post: "w-full bg-transparent border border-gray-700 text-xl resize-none outline-none text-gray-300 placeholder-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
    comment: "w-full bg-gray-800 text-gray-300 text-base p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500",
    bio: "w-full p-2 rounded-lg bg-gray-800 text-white mb-4"
};

interface TextAreaProps {
    variant: TextAreaVariant;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
    ({ variant, ...rest }, ref) => {
        return <div className="mb-4">
            <textarea
                ref={ref}
                className={`${TextAreaClasses[variant]}`}
                {...rest}
            />
        </div>;
    });

export default TextArea;