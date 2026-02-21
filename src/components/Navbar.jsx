import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "@/components/Modal";

// Route prefetching map for performance optimization
const routePrefetch = {
  "/": () => import("@/pages/Index"),
  "/about": () => import("@/pages/About"),
  "/our-role": () => import("@/pages/OurRole"),
  "/products": () => import("@/pages/Products"),
  "/process": () => import("@/pages/Process"),
  "/compliance": () => import("@/pages/Compliance"),
  "/insights": () => import("@/pages/Insights"),
  "/contact": () => import("@/pages/Contact"),
};

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Our Role", path: "/our-role" },
  { label: "Products", path: "/products" },
  { label: "Process", path: "/process" },
  { label: "Compliance", path: "/compliance" },
  { label: "Insights", path: "/insights" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, type: "mandate" });
  const location = useLocation();

  const openModal = (type) => {
    setModalState({ isOpen: true, type });
    setMobileOpen(false); // Close mobile menu when opening modal
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "mandate" });
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prefetch route on hover for instant navigation
  const handlePrefetch = (path) => {
    if (routePrefetch[path]) {
      routePrefetch[path]();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-glass border-b border-glass py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-wider text-foreground"
        >
          ESSLEY<span className="text-primary">.</span>TRADING
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={() => handlePrefetch(link.path)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-md ${
                location.pathname === link.path
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => openModal("mandate")}
            className="ml-2 inline-flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            Submit Request
            <ArrowRight size={14} />
          </button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-foreground p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-glass border-t border-glass overflow-hidden"
          >
            <nav className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onTouchStart={() => handlePrefetch(link.path)}
                  className={`px-4 py-3 text-sm font-medium transition-colors rounded-md ${
                    location.pathname === link.path
                      ? "text-primary bg-secondary/50"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => openModal("mandate")}
                className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300"
              >
                Submit Request
                <ArrowRight size={14} />
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </header>
  );
};

export default Navbar;
