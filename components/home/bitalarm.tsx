export function BitAlarm() {
  return (
    <section
      className="p-24 bg-bgLight bg-repeat-x"
      title="BitAlarm"
      style={`background-image: 
      `}
    >
      <div className="flex flex-col items-center gap-10 m-auto lg:w-3/4 md:flex-row ">
        <div className="font-textular">
          <h2 className="bg-clip-text text-4xl w-[350px] text-transparent font-black bg-gradient-to-r from-[#4c5fde] to-[#63240e] 90%">
            BITALARM
          </h2>
          <p className="text-2xl font-[300] max-w-prose">
            bɪtəˈlɑːm is a cross platform mobile application written in Flutter
            to help you keep track of your cryptocurrency investments with a
            focus on privacy.
          </p>
          <p className="text-2xl font-[300]">
            Everything is done on device and there is no telemetry.
          </p>
          <p className="text-2xl font-[300]">
            View on{" "}
            <a
              href="https://github.com/damoonrashidi/bitalarm"
              className="text-link underline underline-offset-2"
              rel="noopener nofollow"
            >
              github
            </a>
            .
          </p>
        </div>
        <div>
          <img
            src="/bitalarm.png"
            alt="Two screenshots of the mobile app BitAlarm"
            width={480}
            height={663}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
