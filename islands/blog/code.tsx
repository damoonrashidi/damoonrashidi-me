import hljs from "npm:highlight.js";
import ts from "npm:highlight.js/lib/languages/typescript";
hljs.registerLanguage("typescript", ts);

export const Code = (
  { children, language }: {
    children: string;
    language: string;
  },
) => {
  const text = hljs.highlight(children.toString(), { language })
    .value;

  return (
    <pre
      className="p-4 my-4 bg-[#101010] text-[#fff] rounded-md"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
