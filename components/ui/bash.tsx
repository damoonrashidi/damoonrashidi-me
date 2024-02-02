import { JSX } from "preact/jsx-runtime";

export const Bash = ({
  children,
}: {
  children: JSX.Element | JSX.Element[] | string;
}) => {
  return (
    <pre className="p-4 rounded-md bg-bgLight overflow-x-auto mb-8">
      <code>{children}</code>
    </pre>
  );
};
