import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/header.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <Header />
      <div className="max-w-prose m-auto">
        <h1 className="font-display text-5xl leading-4 pb-4">404.</h1>
        <p className="font-display">Couldn't find that page.</p>
      </div>
    </>
  );
}
