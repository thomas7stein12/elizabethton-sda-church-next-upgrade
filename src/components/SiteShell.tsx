"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./NavBar";
import Footer from "./Footer";
import ContactModal from "./ContactModal";
import path from "path";

interface SiteShellProps {
  children: React.ReactNode;
}

export default function SiteShell({ children }: SiteShellProps) {
  const [contactOpen, setContactOpen] = useState(false);
  const pathname = usePathname();

  const showStaffPortal = pathname === "/calendar" || pathname === "/pictures";

  const simpleNavigation =
    pathname === "/calendar" ||
    pathname === "/pictures" ||
    pathname === "/admin";

  useEffect(() => {
    const openContact = () => {
      setContactOpen(true);
    };

    window.addEventListener("open-contact", openContact);

    return () => {
      window.removeEventListener("open-contact", openContact);
    };
  }, []);

  return (
    <>
      <Navbar
        onContact={() => setContactOpen(true)}
        showStaffPortal={pathname === "/calendar" || pathname === "/pictures"}
        simple={simpleNavigation}
      />

      <main>{children}</main>

      <Footer onContact={() => setContactOpen(true)} />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
