"use client";

interface FooterProps {
  onContact: () => void;
}

export default function Footer({ onContact }: FooterProps) {
  return (
    <footer className="bg-[#1d1d1d] px-5 pb-10 pt-20 text-center text-white">
      <div className="mx-auto max-w-[900px]">
        <img
          src="/assets/logo.png"
          alt="Church Logo"
          className="mx-auto mb-5 w-[180px] opacity-95"
        />

        <h3 className="mb-2 text-[1.4rem] font-semibold">
          Elizabethton SDA Church
        </h3>

        <p className="mx-auto my-2 max-w-[600px] text-white/75">
          Sharing hope. Growing faith. Serving our community.
        </p>

        <div className="my-7 flex justify-center gap-[18px]">
          <button
            type="button"
            onClick={onContact}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-[#17593f]"
            aria-label="Facebook"
          >
            <i className="fab fa-facebook-f" />
          </button>

          <button
            type="button"
            onClick={onContact}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-[#17593f]"
            aria-label="Phone"
          >
            <i className="fas fa-phone" />
          </button>

          <button
            type="button"
            onClick={onContact}
            className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-1 hover:bg-[#17593f]"
            aria-label="Email"
          >
            <i className="fas fa-envelope" />
          </button>
        </div>

        <p className="mx-auto mt-8 max-w-[600px] text-sm text-white/40">
          © 2026 Elizabethton SDA Church. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
