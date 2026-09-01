"use client";

import Link from "next/link";
import { useState } from "react";

interface NavbarProps {
  onContact: () => void;
  showStaffPortal?: boolean;
  simple?: boolean;
}

export default function Navbar({
  onContact,
  showStaffPortal = false,
  simple = false,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed left-0 top-0 z-[1000] w-full bg-[#e6e6e6] shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-[80px] max-w-[1200px] items-center justify-between px-5">
          <Link href="/" className="shrink-0">
            <img
              src="/assets/logo.png"
              alt="Church Logo"
              className="h-[55px] w-auto"
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {showStaffPortal && (
              <Link
                href="/admin"
                className="rounded-full border border-dashed border-gray-500 px-3 py-1.5 text-sm text-gray-700 opacity-70 transition hover:bg-gray-200 hover:opacity-100"
              >
                Staff Portal
              </Link>
            )}

            {!simple ? (
              <>
                <Link
                  href="/about"
                  className="text-gray-900 transition hover:opacity-70"
                >
                  About
                </Link>

                <Link
                  href="/calendar"
                  className="text-gray-900 transition hover:opacity-70"
                >
                  Calendar
                </Link>

                <Link
                  href="/pictures"
                  className="text-gray-900 transition hover:opacity-70"
                >
                  Pictures
                </Link>

                <a
                  href="#visit"
                  className="text-gray-900 transition hover:opacity-70"
                >
                  Visit Us
                </a>

                <button
                  type="button"
                  onClick={onContact}
                  className="rounded-full bg-[#17593f] px-5 py-2.5 text-white transition hover:-translate-y-0.5"
                >
                  Contact
                </button>
              </>
            ) : (
              <Link
                href="/"
                className="rounded-full bg-[#17593f] px-5 py-2.5 text-white transition hover:-translate-y-0.5"
              >
                Home
              </Link>
            )}
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            className="text-2xl text-[#17593f] md:hidden"
          >
            <i className="fas fa-bars" />
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[1150] bg-black/50 transition-opacity duration-200 md:hidden ${
          menuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
      />

      <aside
        className={`fixed right-0 top-0 z-[1200] h-screen w-[300px] bg-white p-6 shadow-2xl transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close navigation menu"
          className="absolute right-5 top-5 text-2xl text-gray-700"
        >
          <i className="fas fa-times" />
        </button>

        <div className="mt-[60px] flex flex-col gap-6">
          {showStaffPortal && (
            <Link
              href="/admin"
              onClick={closeMenu}
              className="rounded-full border border-dashed border-gray-400 px-3 py-2 text-gray-700"
            >
              Staff Portal
            </Link>
          )}

          {!simple ? (
            <>
          <Link
            href="/about"
            onClick={closeMenu}
            className="text-lg text-gray-900"
          >
            About
          </Link>

          <Link
            href="/calendar"
            onClick={closeMenu}
            className="text-lg text-gray-900"
          >
            Calendar
          </Link>

          <Link
            href="/pictures"
            onClick={closeMenu}
            className="text-lg text-gray-900"
          >
            Pictures
          </Link>

          <a
            href="#visit"
            onClick={closeMenu}
            className="text-lg text-gray-900"
          >
            Visit Us
          </a>

          <button
            type="button"
            onClick={() => {
              closeMenu();
              onContact();
            }}
            className="rounded-full bg-[#17593f] px-5 py-3 text-left text-white"
          >
            Contact
          </button>
            </>
          ) : (
            <Link
              href="/"
              onClick={closeMenu}
              className="rounded-full bg-[#17593f] px-5 py-3 text-left text-white"
            >
              Home
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
