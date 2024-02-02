import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/header.tsx";

export default function Art() {
  return (
    <>
      <Head>
        <title>Generative Art - Damoon Rashidi</title>
        <meta name="description" content="My generative art experiments" />
      </Head>
      <Header />
      <article className="max-w-prose m-auto">
        <h1 className="font-display">Generative Art.</h1>
        <p className="font-display">Still writing this part!</p>
      </article>
    </>
  );
}
