import { Head } from "$fresh/runtime.ts";
import { Header } from "@/components/header.tsx";
import { BitAlarm } from "@/components/home/bitalarm.tsx";
import { GenerativeArtSpinner } from "@/components/home/generative-art.tsx";
import { Wdp } from "@/components/home/wdp.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Damoon Rashidi</title>
        <meta
          name="description"
          content="Damoon Rashidi - my personal website where I write a bit about generative art, software development and other things"
        />
      </Head>
      <section className="col gap-y-10">
        <Header />
        <GenerativeArtSpinner />
        <BitAlarm />
        <Wdp />
        <div className="p-32 bg-bgLight">
          <h3 className="text-3xl font-display text-center">That's it!</h3>
        </div>
      </section>
    </>
  );
}
