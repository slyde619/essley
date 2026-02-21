import { BrowserRouter, Route, Routes } from "react-router";
import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazy load routes for code splitting
const Index = lazy(() => import("@/pages/Index"));
const About = lazy(() => import("@/pages/About"));
const OurRole = lazy(() => import("@/pages/OurRole"));
const Products = lazy(() => import("@/pages/Products"));
const Process = lazy(() => import("@/pages/Process"));
const Compliance = lazy(() => import("@/pages/Compliance"));
const Insights = lazy(() => import("@/pages/Insights"));
const Contact = lazy(() => import("@/pages/Contact"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Lazy load non-critical components
const WhatsAppButton = lazy(() => import("@/components/WhatsAppButton"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-role" element={<OurRole />} />
          <Route path="/products" element={<Products />} />
          <Route path="/process" element={<Process />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <Suspense fallback={null}>
        <WhatsAppButton />
      </Suspense>
    </BrowserRouter>
  );
};
export default App;
