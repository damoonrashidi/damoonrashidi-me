import { JSX } from "preact/jsx-runtime";

/**
Display the given children wrapped in a container that looks like
a bash snippet
*/
export const Bash = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <pre className="p-4 rounded-md bg-bgLight overflow-x-auto mb-8">
      <code>{children}</code>
    </pre>
  );
};
