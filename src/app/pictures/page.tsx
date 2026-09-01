import Gallery from "@/components/Gallery";
import Hero from "@/components/Hero";

export default function PicturesPage() {
  return (
    <>
      <Hero
        title="Pictures Gallery"
        description="Please take a look at our community!"
      />

      <section className="px-5 py-[100px]">
        <div className="mx-auto w-[90%] max-w-[1200px]">
          <div className="mb-[60px] text-center">
            <span className="mb-3 inline-block text-sm font-bold uppercase tracking-[3px] text-[#17593f]">
              Our Church Family
            </span>

            <h2 className="my-4 text-4xl font-bold md:text-5xl">
              Photo Gallery
            </h2>

            <p className="mx-auto max-w-[700px] text-gray-600">
              Moments of worship, fellowship, outreach, and special memories
              shared together.
            </p>
          </div>

          <Gallery />
        </div>
      </section>
    </>
  );
}
