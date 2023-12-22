import { Header } from "@/components/header.tsx";
import { BitAlarm } from "@/components/home/bitalarm.tsx";
import { GenerativeArtSpinner } from "@/components/home/generative-art.tsx";
import { Wdp } from "@/components/home/wdp.tsx";

export default function Home() {
  return (
    <section className="col gap-y-10">
      <Header />
      <GenerativeArtSpinner />
      <BitAlarm />
      <Wdp />
    </section>
  );
}
