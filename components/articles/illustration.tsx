import { JSX } from "preact/jsx-runtime";

export const Illustration = (
  { children }: { children: JSX.Element | JSX.Element[] | string },
) => {
  return (
    <div className="rounded-md bg-bgLight p-4">
      {children}
    </div>
  );
};
