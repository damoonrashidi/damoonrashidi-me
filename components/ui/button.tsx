import { forwardRef } from "preact/compat";
import { JSX } from "preact/jsx-runtime";

export interface ButtonProps {
  children: JSX.Element | JSX.Element[] | string;
  onClick: (event: MouseEvent) => void;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <button
        {...props}
        ref={ref}
        className="font-textular bg-bgLight px-2 py-1 hover:bg-highlight active:bg-[#333]  hover:text-[#fff] rounded-sm transition-colors border-2"
      >
        {props.children}
      </button>
    );
  },
);
