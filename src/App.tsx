import { useEffect, useLayoutEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Advisor from "./components/Advisor";
import PageTransition from "./components/PageTransition";

export default function App() {
  const { pathname, hash } = useLocation();

  // The router restores nothing itself, and the browser's own restoration
  // would fight the scroll-to-top below on back/forward.
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  // A new page starts at the top — before its first paint, so it never flashes
  // in at the previous page's scroll position with its hero half gone.
  useLayoutEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  useEffect(() => {
    // Links like /corporate#proposal land on a section. Deferred a frame so the
    // target section has rendered.
    const id = hash.slice(1);
    if (!id) return;
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo(0, 0);
    });
  }, [pathname, hash]);

  return (
    <>
      <Header />
      <PageTransition>
        <Outlet />
      </PageTransition>
      <Footer />
      <Advisor />
    </>
  );
}
