export default function Brollop() {
  const plan = [
    {
      time: "15:00",
      label: "Vigselceremoni",
      meta: {
        label: "Brännkyrka Kyrka, Stockholm",
        url: "https://maps.app.goo.gl/dCvjE6eX2vw8kYXz7",
      },
    },
    {
      time: "16:00",
      label: "Bröllopsfest hos Annas föräldrar",
      meta: {
        label: "Mölnbovägen 17, 124 32, Bandhagen",
        url: "https://maps.app.goo.gl/iQCi9C5keydvpaQEA",
      },
    },
    { time: "17:00", label: "Fest" },
    { time: "18:00", label: "Middag" },
    { time: "20:00", label: "Tårta" },
    { time: "Kväll", label: "Mer fest 🤪" },
  ];

  return (
    <>
      <link rel="stylesheet" href="/pages/wedding/wedding.css" />
      <div className="m-auto max-w-prose px-8 py-8 font-display ">
        <h1 className="font-display text-center">Anna & Damoon</h1>
        <p className="text-center">21 September</p>

        <div className="p-16 rounded-md mb-8 bg-[#FFF4EA] drop-shadow-2xl ">
          <table>
            {plan.map((item) => (
              <>
                <tr>
                  <td className="pr-8 align-top">
                    <h3 className="text-[#6E461E] text-[20px]">{item.time}</h3>
                  </td>
                  <td>
                    <h3 className="text-[#6E461E]">{item.label}</h3>
                  </td>
                </tr>
                {item.meta !== undefined && (
                  <tr>
                    <td colspan={2} className="pb-8">
                      <a
                        href={item.meta.url}
                        target="_blank"
                        rel="noopener nofollow"
                        className="text-[#6E461E]"
                      >
                        {item.meta.label}
                      </a>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </table>
        </div>

        <div className="flex justify-center shadow-none">
          <img src="/pages/wedding/flower.png" alt="linnea flower" />
        </div>

        <h4>Klädsel</h4>
        <p>
          Vi vill inte påtvinga traditionella klädkoder, men vi skulle uppskatta
          en formell klädsel.
        </p>
        <h4>Gåvor</h4>
        <p>
          Vi önskar oss inga gåvor förutom er närvaro. Vill man ge något ändå så
          uppskattar vi bidrag till bröllopsresan eller vad än ni ger oss.
        </p>
        <h4>Barn</h4>
        <p>
          Vi har valt att ha ett barnfritt bröllop, med undantag för ammande
          barn.
        </p>
        <h4>Parkering</h4>
        <p>
          I början av kvällen kommer det inte gå att parkera framför Annas
          föräldrars hus, men det finns fri parkering i området. Om ni har
          möjlighet rekommenderar vi att ni åker kommunalt, tar taxi eller
          samåker med en annan gäst.
        </p>
        <h4>Djur</h4>
        <p>
          Fuffens &amp; Ruth kommer vara med under kvällen. Om man har
          pälsdjursallergi kan man vilja ta antihistaminer innan för att undvika
          besvär eftersom båda hårar och gillar att mysa.
        </p>
        <h4>Övriga frågor</h4>
        <p>
          Om ni har några frågor, vill ha klädtips eller vill bara vill prata så
          kan ni nå Damoon på 0739 64 59 68 och Anna på 0706 73 01 10.
        </p>
        <div className="flex justify-center">
          <img src="/pages/wedding/us.jpg" alt="Us" />
        </div>
      </div>
    </>
  );
}
