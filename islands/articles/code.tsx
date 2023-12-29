import hljs from "npm:highlight.js";
import ts from "npm:highlight.js/lib/languages/typescript";
hljs.registerLanguage("typescript", ts);

export const Code = (
  { children }: {
    children: string;
  },
) => {
  const text = hljs.highlight(children.toString(), { language: "typescript" })
    .value;

  return (
    <pre
      className="p-4 my-4 bg-[#fdfbf8] dark:bg-[#12111a] rounded-md"
      dangerouslySetInnerHTML={{ __html: text }}
    />
  );
};
