"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const heroImages = [
  "hero1.png",
  "hero2.png",
  "hero3.png",
  "hero4.png",
  "hero5.png",
  "hero6.png",
  "hero7.png",
  "hero8.png",
  "hero9.png",
  "hero10.png",
  "hero11.png",
  "hero12.png",
];

interface HeroProps {
  title: string;
  description: string;
  homePage?: boolean;
  onContact?: () => void;
}

export default function Hero({
  title,
  description,
  homePage = false,
  onContact,
}: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % heroImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (current) => (current - 1 + heroImages.length) % heroImages.length,
    );
  }, []);

  useEffect(() => {
    const interval = window.setInterval(nextSlide, 6000);

    return () => {
      window.clearInterval(interval);
    };
  }, [nextSlide]);

  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLElement>) => {
    setTouchStart(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLElement>) => {
    if (touchStart === null) return;

    const endX = event.changedTouches[0]?.clientX ?? touchStart;
    const difference = touchStart - endX;

    if (difference > 50) {
      nextSlide();
    }

    if (difference < -50) {
      prevSlide();
    }

    setTouchStart(null);
  };

  return (
    <header
      className="relative h-screen min-h-[650px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={`/assets/${image}`}
              alt="Church"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/55 to-black/45" />

      <div className="relative z-[3] mx-auto flex h-full max-w-[900px] flex-col items-center justify-center px-6 text-center text-white">
        <span className="mb-5 text-[0.9rem] uppercase tracking-[3px] text-[#fdc20f]">
          Seventh-day Adventist Church
        </span>

        <h1 className="mb-6 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.1]">
          {title}
        </h1>

        <p className="mb-10 max-w-[700px] text-base text-white/90 sm:text-lg md:text-xl">
          {description}
        </p>

        {homePage && (
          <div className="flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={onContact}
              className="rounded-full bg-[#17593f] px-[30px] py-[14px] text-white transition hover:-translate-y-1"
            >
              Plan Your Visit
            </button>

            <Link
              href="/about"
              className="rounded-full bg-white px-[30px] py-[14px] text-[#222] transition hover:-translate-y-1 hover:bg-[#fdc20f]"
            >
              Learn More
            </Link>
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-[30px] top-1/2 z-[4] hidden h-[55px] w-[55px] -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-[10px] transition hover:bg-[#17593f] md:flex"
      >
        <i className="fas fa-chevron-left" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-[30px] top-1/2 z-[4] hidden h-[55px] w-[55px] -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-[10px] transition hover:bg-[#17593f] md:flex"
      >
        <i className="fas fa-chevron-right" />
      </button>

      <div className="absolute bottom-10 left-1/2 z-[4] flex -translate-x-1/2 gap-3">
        {heroImages.map((image, index) => (
          <button
            key={image}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 w-3 rounded-full transition ${
              index === currentSlide ? "scale-125 bg-[#fdc20f]" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </header>
  );
}
