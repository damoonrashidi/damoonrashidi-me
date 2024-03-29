import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/header.tsx";
import { Bash } from "@/components/ui/bash.tsx";
import { TableOfContents } from "@/components/articles/table-of-contents.tsx";
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
          content="Ask is a command line tool that lets you guesses your shell and asks ChatGPT for shell commands using natural language"
        />
      </Head>
      <Header />
      <article className="font-mono px-8">
        <section className="max-w-prose m-auto">
          <h1>
            ~/&rsaquo; <span className="text-highlight">ask</span>
            <span className="animate-pulse transition-opacity w-[15px] ml-4 h-[35px] inline-block bg-highlight rounded-sm translate-y-1"></span>
          </h1>
          <p>
            Ask tries to understand what shell you're using and then fetches a
            command specifically for that shell based on your natural language
            input using ChatGPT.
          </p>
          <p>
            A per shell history is saved to offer quicker lookups and avoiding
            spamming OpenAI requests.
          </p>
          <p>
            Ask is also open source and available on{" "}
            <a href="https://github.com/damoonrashidi/ask">github</a>.
          </p>
          <Bash>
            <>
              ❯ <span className="text-highlight font-bold">ask</span> list all
              branches in this format name, author, last updated
              {"\n"}? Command suggestions {"\n"}
              &gt;{" "}
              <span className="text-highlight">
                {" "}
                for-each-ref --format="%(refname:short), %(authorname),
                %(committerdate:relative)" refs/heads/
              </span>{" "}
              {"\n"}
              [↕ to select, ↵ to run and ESC to cancel]
            </>
          </Bash>
        </section>
        <section className="max-w-prose m-auto py-8">
          <TableOfContents items={tableOfContents} />
        </section>
        <section className="max-w-prose m-auto">
          <h2>Demo</h2>
        </section>
        <div className="w-[90%] max-w-[800px] m-auto">
          <script
            async
            id="asciicast-BC94XeCx9DJj0xHu0cjLLRkox"
            src="https://asciinema.org/a/BC94XeCx9DJj0xHu0cjLLRkox.js"
          ></script>
        </div>
        <section className="max-w-prose m-auto">
          <h2 id="installation">Installation</h2>
          <p>
            Ask requires you to have an OpenAI account with an API key set up
            and available in your environment variables, so add the following to
            your shell config file.
          </p>
          <Bash>
            <span>{`export OPENAI_KEY = "sk-...xxxx"`}</span>
          </Bash>
          <h3>Homebrew</h3>
          <p>Install via homebrew.</p>
          <Bash>
            <span>
              {`brew tap damoonrashidi/homebrew-ask https://github.com/damoonrashidi/homebrew-ask
brew install ask`}
            </span>
            <br />
          </Bash>
          <h3>From source</h3>
          <p>
            Ask can be installed from source if you have the Rust toolchain set
            up.
          </p>
          <Bash>
            <span>
              {`git clone https://github.com/damoonrashidi/ask
cd ask
cargo install --path .`}
            </span>
          </Bash>
          <h3>Prebuilt binaries</h3>
          <p>
            Prebuilt binaries for MacOS, Linux and Windows are made available
            for download on the{" "}
            <a href="https://github.com/damoonrashidi/ask/releases">
              github releases page
            </a>
            .
          </p>
          <h2 id="configuration">Configuration</h2>
          <p>
            While ask tries to get out of your way as much as possible to
            override functionality by creating a{" "}
            <span className="bg-bgLight py-1 px-2 rounded-md inline-block">
              ~/.config/ask/config.toml
            </span>{" "}
            file. The configuration has defaults for all entries so only
            overrides need to be provided.
          </p>
          <pre>
            <code className="p-4 bg-bgLight w-full block overflow-x-auto">
              <span className="text-[#4290f5]">[command]</span>
              <br />
              <span className="text-subtle">
                # If enabled, answers will be saved locally for each shell
                <br />
                # and the cache will be consulted instead of making an HTTP
                call.
                <br />
                #
                <br /># Default: true
              </span>
              <br />
              <span>enable_history = </span>
              <span className="text-highlight">true</span>
              <br />
              <br />
              <span className="text-subtle">
                # Max number of choices to present as answers to a question.{" "}
                <br />
                #
                <br /># Default: 2, min: 1
              </span>
              <br />
              <span>choice_count = </span>
              <span className="text-highlight">2</span>
              <br />
              <br />
              <span className="text-subtle">
                # Which ChatGPT model to prompt <br />
                # <br /># Default: "gpt-4-1106-preview"
              </span>
              <br />
              <span>model = </span>
              <span className="text-highlight">"gpt-4-1106-preview"</span>
              <br />
              <br />
              <span className="text-[#4290f5]">[shell]</span>
              <br />
              <span className="text-subtle">
                # If set, ask will no longer try to guess the active
                <br /># shell and will instead use the provided shell.
                <br />#
                <br /># Default: None
              </span>
              <br />
              <span>force_use = </span>
              <span className="text-highlight">"powershell"</span>
              <br />
              <br />
              <span className="text-subtle">
                # Which shell to use if the shell could not be reliably guessed.
                <br />
                # <br />
                # Default: "bash"
                <br />
              </span>
              <span>fallback = </span>
              <span className="text-highlight">"bash"</span>
            </code>
          </pre>
        </section>
      </article>
    </>
  );
}
