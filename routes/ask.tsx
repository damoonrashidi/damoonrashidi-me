import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/header.tsx";
import { Handlers } from "$fresh/src/server/mod.ts";
import { AnalyticsService } from "@/analytics/analytics.service.ts";

const tableOfContents = [
  { id: "demo", label: "Demo" },
  { id: "installation", label: "Installation" },
  { id: "configuration", label: "Configuration" },
];

export const handler: Handlers<void> = {
  GET(req, ctx) {
    const url = import.meta.url.split("/").pop() as string;
    AnalyticsService.viewPage("ask", req.headers.get("Referer")).then(() => {});
    return ctx.render();
  },
};

export default function Art() {
  return (
    <>
      <Head>
        <title>Ask - Damoon Rashidi</title>
        <meta
          name="description"
          content="Ask is a command line tool that understands your shell and asks ChatGPT for shell commands using natural language"
        />
      </Head>
      <link rel="stylesheet" href="/pages/ask/ask.css" />
      <Header />
      <div className="absolute w-full flex justify-center items-center translate-y-[-200px]">
        <img src="pages/ask/top-blur-dark.png" />
      </div>
      <article className="flex flex-col items-center w-full">
        <h1 className="font-textular text-[200px] leading-none m-0 p-0 font-black text-gradient">
          ASK
        </h1>
        <p className="text-[20px]">
          Ask for a shell command using natural language.
        </p>
        <section>
          <h3>Shell aware.</h3>
          <p>
            Ask automatically figures out what shell you’re using and gets out
            of your way. No matter if you’re using nushell on linux or
            powershell on windows, just ask.
          </p>
        </section>
        <section>
          <h3>Historical Performance..</h3>
          <p>
            Ask stores questions and answers in a per-shell cache for instant
            responses for repeated questions.
          </p>
        </section>
        <section>
          <h3>Use it your way.</h3>
          <p>
            Ask provides sane defaults, but let’s you override any behaviour via
            a simple configuration file.
          </p>
        </section>
      </article>
    </>
  );
}
