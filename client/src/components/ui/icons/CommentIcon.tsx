import React from 'react';

interface StyleProps {
  style: string;
}

const CommentIcon: React.FC<StyleProps> = ({ style }) => {
  return (
    <svg
      className={style}
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"  // Corrected from fill-rule
        clipRule="evenodd"  // Corrected from clip-rule
        d="M9.1631 5H15.8381C17.8757 5.01541 19.5151 6.67943 19.5001 8.717V13.23C19.5073 14.2087 19.1254 15.1501 18.4384 15.8472C17.7515 16.5442 16.8158 16.9399 15.8371 16.947H9.1631L5.5001 19V8.717C5.49291 7.73834 5.8748 6.79692 6.56175 6.09984C7.24871 5.40276 8.18444 5.00713 9.1631 5Z"
        stroke="#000000"
        strokeWidth="1.5"  // Corrected from stroke-width
        strokeLinecap="round"  // Corrected from stroke-linecap
        strokeLinejoin="round"  // Corrected from stroke-linejoin
      />
      <path
        fillRule="evenodd"  // Corrected
        clipRule="evenodd"  // Corrected
        d="M7.50009 11C7.50009 10.4477 7.94781 10 8.50009 10C9.05238 10 9.50009 10.4477 9.50009 11C9.50009 11.5523 9.05238 12 8.50009 12C8.23488 12 7.98052 11.8946 7.79298 11.7071C7.60545 11.5196 7.50009 11.2652 7.50009 11Z"
        stroke="#000000"
        strokeLinecap="round"  // Corrected
        strokeLinejoin="round"  // Corrected
      />
      <path
        fillRule="evenodd"  // Corrected
        clipRule="evenodd"  // Corrected
        d="M11.5001 11C11.5001 10.4477 11.9478 10 12.5001 10C13.0524 10 13.5001 10.4477 13.5001 11C13.5001 11.5523 13.0524 12 12.5001 12C11.9478 12 11.5001 11.5523 11.5001 11Z"
        stroke="#000000"
        strokeLinecap="round"  // Corrected
        strokeLinejoin="round"  // Corrected
      />
      <path
        fillRule="evenodd"  // Corrected
        clipRule="evenodd"  // Corrected
        d="M15.5001 11C15.5001 10.4477 15.9478 10 16.5001 10C17.0524 10 17.5001 10.4477 17.5001 11C17.5001 11.5523 17.0524 12 16.5001 12C15.9478 12 15.5001 11.5523 15.5001 11Z"
        stroke="#000000"
        strokeLinecap="round"  // Corrected
        strokeLinejoin="round"  // Corrected
      />
    </svg>
  );
};

export default CommentIcon;