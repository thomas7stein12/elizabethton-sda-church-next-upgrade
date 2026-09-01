"use client";

import Hero from "@/components/Hero";

export default function AboutPage() {
  return (
    <>
      <Hero
        title="About Our Church"
        description="A growing Seventh-day Adventist church community serving Elizabethton and the surrounding area."
      />

      {/* MISSION */}
      <section className="px-5 py-20 text-center md:py-[80px]">
        <div className="mx-auto w-[90%] max-w-[1200px]">
          <h2 className="mb-6 text-4xl font-bold">Our Mission</h2>

          <p className="mx-auto mb-6 max-w-[700px] text-lg leading-[1.7] text-gray-700">
            This church plant began as a small group of believers from{" "}
            <strong>Kingsport SDA Church</strong> and the surrounding areas who
            saw a growing need for a Christ-centered Adventist presence in the
            Elizabethton area.
          </p>

          <p className="mx-auto max-w-[700px] text-lg leading-[1.7] text-gray-700">
            Our mission is simple: to share the everlasting gospel of Jesus
            Christ, build authentic community, and prepare people for His soon
            return.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="bg-[#e6e6e6] px-5 py-20 md:py-[80px]">
        <div className="mx-auto grid w-[90%] max-w-[1200px] gap-10 md:grid-cols-2 md:items-start">
          <div>
            <h2 className="mb-6 text-4xl font-bold">Our Story</h2>

            <p className="mb-6 leading-[1.7] text-gray-700">
              What started as prayer meetings and small gatherings has grown
              into a church plant focused on biblical truth, discipleship, and
              service.
            </p>

            <p className="leading-[1.7] text-gray-700">
              We are still in the early stages of growth, meeting in different
              locations as we establish a permanent home in Elizabethton.
            </p>
          </div>

          <div className="rounded-2xl border-l-4 border-[#17593f] bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
            <h3 className="mb-5 text-2xl font-bold">What We Value</h3>

            <ul className="space-y-4 text-gray-700">
              <li>✝️ Christ-centered teaching</li>
              <li>📖 Biblical truth</li>
              <li>🤝 Community & fellowship</li>
              <li>🙏 Prayer & spiritual growth</li>
              <li>🌍 Mission & outreach</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURED WORSHIP */}
      <section className="bg-[#f8f8f8] px-5 py-[120px]">
        <div className="mx-auto w-[90%] max-w-[1200px]">
          <div className="mx-auto mb-[60px] max-w-[700px] text-center">
            <span className="mb-4 block font-bold uppercase tracking-[3px] text-[#17593f]">
              Featured Worship
            </span>

            <h2 className="mb-6 text-[clamp(2.4rem,5vw,3.6rem)] font-bold leading-tight">
              Prepare Your Heart For Worship
            </h2>

            <p className="text-lg leading-[1.8] text-gray-600">
              Music has a unique way of drawing our hearts closer to Christ. We
              invite you to spend a few moments in worship through this special
              song before your visit.
            </p>
          </div>

          <div className="grid overflow-hidden rounded-[28px] bg-white shadow-[0_25px_60px_rgba(0,0,0,0.08)] md:grid-cols-[1.2fr_1fr]">
            <div className="relative min-h-[300px] md:min-h-[500px]">
              <iframe
                src="https://www.youtube.com/embed/tC2EE8awotw"
                title="Featured Worship"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <div className="flex flex-col justify-center p-7 md:p-[60px]">
              <h3 className="mb-6 text-3xl font-bold">
                Featuring Melissa Dexter and her son Stephen
              </h3>

              <p className="mb-10 leading-[1.8] text-gray-600">
                A beautiful reminder that our Heavenly Father never loses sight
                of His children. May this song encourage your faith and remind
                you of His constant care.
              </p>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-fit rounded-full bg-[#17593f] px-[30px] py-[14px] text-white transition hover:-translate-y-1"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="px-5 py-[120px]">
        <div className="mx-auto w-[90%] max-w-[1200px]">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold">Leadership & Elders</h2>

            <p className="mx-auto max-w-[700px] text-gray-600">
              Our church is guided by faithful leaders serving in teaching,
              prayer, and care.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1200px] gap-[30px] md:grid-cols-2">
            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[18px] bg-white p-[30px] text-center shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition hover:-translate-y-1.5">
              <div className="mb-3 h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-300">
                <img
                  src="/assets/stephen-dexter.png"
                  alt="Stephen Dexter"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold">Stephen Dexter</h3>
              <p className="text-gray-700">Elder</p>
              <p className="text-sm text-gray-500">📞 (423) 429-6523</p>
            </div>

            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[18px] bg-white p-[30px] text-center shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition hover:-translate-y-1.5">
              <div className="mb-3 h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-300">
                <img
                  src="/assets/melissa-dexter.png"
                  alt="Melissa Dexter"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold">Melissa Dexter</h3>
              <p className="text-gray-700">Elder</p>
              <p className="text-sm text-gray-500">📞 (423) 429-6524</p>
            </div>

            <div className="flex min-h-[280px] flex-col items-center justify-center rounded-[18px] bg-white p-[30px] text-center shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition hover:-translate-y-1.5 md:col-span-2">
              <div className="mb-3 h-[200px] w-[200px] overflow-hidden rounded-full bg-gray-300">
                <img
                  src="/assets/thomas-stein.png"
                  alt="Thomas Stein"
                  className="h-full w-full object-cover"
                />
              </div>

              <h3 className="text-xl font-bold">Thomas Stein</h3>
              <p className="text-gray-700">Website Manager</p>
              <p className="text-sm text-gray-500">📞 (423) 707-5268</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
