import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { RouterProvider, useRouter } from './router';
import Background from './components/Background';
import Cursor from './components/Cursor';
import Nav from './components/Nav';
import Preloader from './components/Preloader';
import { BackToTop, Footer, ScrollProgress } from './components/Chrome';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Tools from './pages/Tools';
import Contact from './pages/Contact';

const PAGES = { home: Home, about: About, services: Services, portfolio: Portfolio, tools: Tools, contact: Contact };

function Shell() {
  const { route } = useRouter();
  const mainRef = useRef<HTMLElement>(null);
  const first = useRef(true);
  const Page = PAGES[route];

  // Move keyboard / screen-reader focus to the new page (but not on first load)
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [route]);

  return (
    <>
      <Nav />
      <main id="main" ref={mainRef} tabIndex={-1} className="relative min-h-screen">
        <Page key={route} />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <RouterProvider>
      <Background />
      <Cursor />
      <ScrollProgress />
      {!loading && <Shell />}
      {!loading && <BackToTop />}
      <AnimatePresence>{loading && <Preloader key="pre" onDone={() => setLoading(false)} />}</AnimatePresence>
    </RouterProvider>
  );
}
