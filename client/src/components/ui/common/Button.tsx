
type ButtonVariant = "sign" | "blue"| "pagination";

const ButtonClasses: Record<ButtonVariant, string> = {
  sign: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 h-9 px-4 py-2 w-full",
  blue:"bg-blue-500 hover:bg-blue-400 text-white font-semibold py-2 px-6 rounded-full shadow-sm transition-all duration-200",
  pagination: "bg-transparent border border-gray-700 text-gray-300 py-2 px-4 rounded-full hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
};

interface ButtonProps {
  variant: ButtonVariant;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ variant, children, ...rest }) => {
  return (
    <button className={ButtonClasses[variant]} {...rest}>
      {children}
    </button>
  );
};

export { Button };