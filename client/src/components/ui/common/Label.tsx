import * as React from "react"

type LabelVariant = "sign"|"sleep"

const LabelClasses:Record<LabelVariant,string>={
  sign:"text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  sleep:""
}

interface LabelProps {
  variant?: LabelVariant;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps & React.LabelHTMLAttributes<HTMLLabelElement>> = ({ variant="sign", children, className, ...rest }) => {
  return (
    <label className={`${LabelClasses[variant]} ${className ?? ""}`} {...rest}>
      {children}
    </label>
  );
};

export { Label }
