import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Nav links like /#services land on a Home section; anything else starts at
    // the top. Deferred a frame so the target section has rendered.
    const id = hash.slice(1);
    requestAnimationFrame(() => {
      const target = id ? document.getElementById(id) : null;
      if (target) target.scrollIntoView({ behavior: "smooth" });
      else window.scrollTo(0, 0);
    });
  }, [pathname, hash]);

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
