
type ButtonVariant = "sign" | "sleep";

const ButtonClasses: Record<ButtonVariant, string> = {
  sign: "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-neutral-300 bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/90 h-9 px-4 py-2 w-full",
  sleep: ""
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