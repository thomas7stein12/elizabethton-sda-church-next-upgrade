"use client";

import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero
        title="A Place To Grow In Faith"
        description="Join a welcoming community centered on Jesus Christ, Biblical truth, and serving our neighbors with love."
        homePage
        onContact={() => {
          window.dispatchEvent(new Event("open-contact"));
        }}
      />

      <section id="about" className="px-5 py-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto grid max-w-[1100px] items-center gap-[60px] md:grid-cols-2">
            <div>
              <span className="mb-3 inline-block rounded-full bg-[#17593f]/10 px-3.5 py-1.5 text-sm font-semibold text-[#17593f]">
                Who We Are
              </span>

              <h2 className="mb-4 text-4xl font-bold md:text-[2.6rem]">
                About Our Church
              </h2>

              <p className="mb-8 text-lg leading-[1.7] text-gray-600">
                We are a Seventh-day Adventist church plant dedicated to helping
                people know Jesus, grow in Scripture, and experience authentic
                Christian community. Our goal is simple—follow Christ, love
                people, and serve our community.
              </p>

              <a
                href="/about"
                className="inline-block rounded-full bg-[#17593f] px-[30px] py-[14px] text-white transition hover:-translate-y-1"
              >
                Learn More About Us
              </a>
            </div>

            <div className="grid gap-4">
              {[
                {
                  title: "Rooted in Scripture",
                  text: "We believe the Bible is the foundation for life and faith.",
                },
                {
                  title: "Community First",
                  text: "Church is more than a service—it’s a family.",
                },
                {
                  title: "Christ Centered",
                  text: "Everything we do points back to Jesus.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-[14px] bg-white p-5 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-1"
                >
                  <h3 className="mb-1.5 text-[1.1rem] font-bold">
                    {item.title}
                  </h3>

                  <p className="text-[0.95rem] text-gray-600">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e6e6e6] px-5 py-[120px]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mx-auto mb-[50px] max-w-[700px] text-center">
            <span className="mb-3 inline-block rounded-full bg-[#17593f]/10 px-3.5 py-1.5 text-sm font-semibold text-[#17593f]">
              Weekly Gatherings
            </span>

            <h2 className="mb-2 text-4xl font-bold md:text-[2.6rem]">
              Service Times
            </h2>

            <p className="text-[1.05rem] leading-[1.6] text-gray-600">
              Join us each Sabbath as we worship, study Scripture, and grow
              together in Christ.
            </p>
          </div>

          <div className="mx-auto grid max-w-[900px] gap-6 md:grid-cols-2">
            <div className="flex gap-4 rounded-[18px] bg-white p-7 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-1">
              <div className="text-3xl">📖</div>

              <div>
                <h3 className="text-xl font-bold">Sabbath School</h3>
                <p className="my-1.5 text-xl font-bold text-[#17593f]">
                  9:30 AM
                </p>
                <span className="text-sm text-gray-500">
                  Bible Study & Discussion
                </span>
              </div>
            </div>

            <div className="flex gap-4 rounded-[18px] bg-white p-7 shadow-[0_15px_40px_rgba(0,0,0,0.06)] transition hover:-translate-y-1">
              <div className="text-3xl">⛪</div>

              <div>
                <h3 className="text-xl font-bold">Worship Service</h3>
                <p className="my-1.5 text-xl font-bold text-[#17593f]">
                  11:00 AM
                </p>
                <span className="text-sm text-gray-500">
                  Main Worship Gathering
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="visit"
        className="bg-[radial-gradient(circle_at_top,#f7f7f7,#eeeeee)] px-5 py-[120px]"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="relative overflow-hidden rounded-[20px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-[60px]">
            <div className="absolute -right-[100px] -top-[100px] h-[300px] w-[300px] rounded-full bg-[#17593f]/[0.08]" />

            <span className="relative mb-4 inline-block rounded-full bg-[#fdc20f]/15 px-3.5 py-1.5 text-sm font-semibold text-[#17593f]">
              Weekly Gathering
            </span>

            <h2 className="relative mb-4 text-4xl font-bold md:text-[2.5rem]">
              Join Us This Sabbath
            </h2>

            <p className="relative mb-10 max-w-[700px] text-lg leading-[1.6] text-gray-600">
              We are currently a church plant and meet in different locations as
              we grow. Each Sabbath is a chance to experience authentic
              community, worship, and Bible-centered teaching.
            </p>

            <div className="relative mb-10 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "⛪",
                  title: "Flexible Location",
                  text: "We meet in rotating venues as we grow.",
                },
                {
                  icon: "🤝",
                  title: "Welcoming Community",
                  text: "No pressure, just genuine people and faith.",
                },
                {
                  icon: "📖",
                  title: "Bible-Centered Worship",
                  text: "Christ-focused teaching every Sabbath.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex gap-3 rounded-xl bg-[#f9f9f9] p-4 transition hover:-translate-y-1 hover:bg-[#f3f3f3]"
                >
                  <span className="text-[1.4rem]">{item.icon}</span>

                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="mt-1 text-sm text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event("open-contact"));
                }}
                className="rounded-full bg-[#17593f] px-[30px] py-[14px] text-white transition hover:-translate-y-1"
              >
                Get This Week’s Location
              </button>

              <a
                href="#services"
                className="rounded-full bg-white px-[30px] py-[14px] text-gray-900 transition hover:-translate-y-1 hover:bg-[#fdc20f]"
              >
                Service Times
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#f7f7f7] to-white px-5 py-[120px]">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative overflow-hidden rounded-[20px] bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] md:p-[60px]">
            <div className="absolute -bottom-[120px] -left-[120px] h-[300px] w-[300px] rounded-full bg-[#fdc20f]/[0.08]" />

            <span className="relative mb-4 inline-block rounded-full bg-[#17593f]/10 px-3.5 py-1.5 text-sm font-semibold text-[#17593f]">
              Get In Touch
            </span>

            <h2 className="relative mb-4 text-4xl font-bold md:text-[2.5rem]">
              We’d Love To Hear From You
            </h2>

            <p className="relative mb-10 max-w-[700px] text-lg leading-[1.6] text-gray-600">
              Whether you have questions about our church, want to visit for the
              first time, or need prayer, we’re here for you.
            </p>

            <div className="relative mb-10 grid gap-6 md:grid-cols-3">
              <div className="flex gap-3 rounded-xl bg-[#f9f9f9] p-4">
                <div className="text-[1.4rem]">✉️</div>
                <div>
                  <h4 className="font-bold">Email</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    drstephendexter@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl bg-[#f9f9f9] p-4">
                <div className="text-[1.4rem]">🙏</div>
                <div>
                  <h4 className="font-bold">Prayer Requests</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    We’re happy to pray for you anytime
                  </p>
                </div>
              </div>

              <div className="flex gap-3 rounded-xl bg-[#f9f9f9] p-4">
                <div className="text-[1.4rem]">🤝</div>
                <div>
                  <h4 className="font-bold">Community</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Connect with our church family
                  </p>
                </div>
              </div>
            </div>

            <div className="relative flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => {
                  window.dispatchEvent(new Event("open-contact"));
                }}
                className="rounded-full bg-[#17593f] px-[30px] py-[14px] text-white transition hover:-translate-y-1"
              >
                Send a Message
              </button>

              <a
                href="mailto:drstephendexter@gmail.com"
                className="rounded-full bg-white px-[30px] py-[14px] text-gray-900 transition hover:-translate-y-1 hover:bg-[#fdc20f]"
              >
                Email Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
