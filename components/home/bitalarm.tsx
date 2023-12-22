export function BitAlarm() {
  return (
    <section
      className="p-24 bg-bgLight bg-no-repeat"
      title="BitAlarm"
      style="background-image: url('/bitalarm-bg.png'); background-position: -200px 120px;"
    >
      <div className="flex flex-col items-center gap-10 m-auto lg:w-3/4 md:flex-row ">
        <div className="font-textular">
          <h2 className="font-textular text-5xl font-[700]">BITALARM</h2>
          <p className="pt-8 text-2xl font-[300] max-w-prose">
            bɪtəˈlɑːm is a cross platform mobile application written in Flutter
            to help you keep track of your cryptocurrency investments with a
            focus on privacy.
          </p>
          <p className="pt-8 text-2xl font-[300]">
            Everything is done on device and there is no telemetry.
          </p>
          <p className="pt-8 text-2xl font-[300]">
            View on{" "}
            <a
              href="https://github.com/damoonrashidi/bitalarm"
              target="_blank"
              className="text-link underline underline-offset-2"
              rel="noopener nofollow"
            >
              github
            </a>.
          </p>
        </div>
        <div>
          <img src="/bitalarm.png" alt="bitalarm" />
        </div>
      </div>
    </section>
  );
}
