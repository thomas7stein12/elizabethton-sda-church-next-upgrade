"use client";

import { useEffect } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="relative w-full max-w-[420px] rounded-2xl bg-white p-6 shadow-2xl transition-transform duration-300"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close contact dialog"
          className="absolute right-3 top-2 text-2xl text-gray-700 transition hover:opacity-60"
        >
          ✕
        </button>

        <h2 className="mb-2 text-2xl font-bold">Contact Us</h2>

        <p className="mb-4 text-gray-600">
          We’d love to hear from you. Reach out anytime.
        </p>

        <div className="space-y-2">
          <a
            href="mailto:drstephendexter@gmail.com"
            className="block rounded-xl bg-[#f5f5f5] p-3 text-gray-900 transition hover:bg-[#17593f] hover:text-white"
          >
            📧 Email Us
          </a>

          <a
            href="tel:+14234296524"
            className="block rounded-xl bg-[#f5f5f5] p-3 text-gray-900 transition hover:bg-[#17593f] hover:text-white"
          >
            📞 Call Us
          </a>

          <a
            href="https://www.facebook.com/share/14jT2zxjCAD/?mibextid=wwXlfr"
            target="_blank"
            rel="noreferrer"
            className="block rounded-xl bg-[#f5f5f5] p-3 text-gray-900 transition hover:bg-[#17593f] hover:text-white"
          >
            <i className="fab fa-facebook-f mr-2" />
            Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
