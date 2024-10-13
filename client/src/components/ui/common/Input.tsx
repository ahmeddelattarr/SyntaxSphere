import * as React from 'react';


type InputVariant = "sign" | "url" | "search";

const InputClasses: Record<InputVariant, string> = {
  sign: "flex h-9 w-full rounded-md border border-neutral-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
  url: "w-full bg-transparent border border-gray-700 text-lg text-gray-300 placeholder-gray-500 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200",
  search: "bg-transparent border-none outline-none text-white placeholder-gray-400"
};
interface InputProps {
  variant: InputVariant;
  children?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  ({ variant, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`${InputClasses[variant]}`}
        {...rest}
      />
    );
  }
);

export { Input };
