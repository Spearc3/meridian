import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    // Opening or closing a Field Book page is a URL change but not a page change
    // — resetting the scroll would throw the reader back to the top of the book.
    const withinStories =
      pathname.startsWith("/stories") && previous.current.startsWith("/stories");
    previous.current = pathname;
    if (!withinStories) window.scrollTo(0, 0);
  }, [pathname]);

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
