import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Droplet, Zap } from "lucide-react";
import { products } from "../data/products";
import { ProductCard } from "./ProductCard";
import GridBackground from "./GridBackground";
import Badge from "./Badge";

export default function ProductsPortfolio({ onSubmitMandate }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollLeft = Math.round(container.scrollLeft);
      const maxScroll = container.scrollWidth - container.clientWidth;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < maxScroll - 5);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      checkScrollButtons();
      container.addEventListener("scroll", checkScrollButtons, {
        passive: true,
      });
      window.addEventListener("resize", checkScrollButtons);
      return () => {
        container.removeEventListener("scroll", checkScrollButtons);
        window.removeEventListener("resize", checkScrollButtons);
      };
    }
  }, [checkScrollButtons]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const cardWidth = container.querySelector("article")?.offsetWidth || 380;
      const gap = 24;
      const scrollAmount = cardWidth + gap;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="products" className="relative bg-darker overflow-hidden">
      {/* Enhanced Grid Background with multiple layers */}
      <div className="absolute inset-0">
        <GridBackground
          gridSize={80}
          lineColor="rgba(234, 88, 12, 0.08)"
          backgroundColor="[#050d1a]"
          fade
          className="absolute inset-0"
        />
        {/* Secondary grid layer */}
        <div className="absolute inset-0 opacity-40">
          <GridBackground
            gridSize={40}
            lineColor="rgba(234, 88, 12, 0.04)"
            backgroundColor="transparent"
            className="absolute inset-0"
          />
        </div>
        {/* Radial gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(234,88,12,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(234,88,12,0.06),transparent_40%)]" />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <div className="pt-24 pb-12 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              {/* Title with gradient */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-heading text-4xl md:text-5xl font-bold mb-6 leading-tight"
              >
                <span className="bg-linear-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
                  Premium Crude Oil Products
                </span>
              </motion.h2>

              {/* Decorative line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-32 h-1 bg-linear-to-r from-transparent via-primary to-transparent mx-auto mb-8"
              />

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-4xl mx-auto px-4"
              >
                Essley facilitates the trading of a wide range of crude oil and
                refined petroleum products, sourced from verified suppliers and
                delivered to qualified buyers under transparent commercial and
                regulatory frameworks.
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="pb-24">
          <div className="max-w-7xl mx-auto">
            {/* Horizontal Scrollable Container */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pl-4 sm:pl-6 lg:pl-0 pr-4 sm:pr-6 pb-6 no-scrollbar scroll-smooth"
              style={{
                marginRight: "calc(-50vw + 50%)",
                paddingRight: "max(1.5rem, calc(50vw - 50%))",
              }}
            >
              {products.map((product, index) => (
                <motion.div
                  key={`${product.title}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <ProductCard
                    product={product}
                    onSubmitMandate={onSubmitMandate}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex justify-center items-center gap-6 mt-12 px-4"
            >
              {/* Left Button */}
              <motion.button
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                whileHover={canScrollLeft ? { scale: 1.1 } : {}}
                whileTap={canScrollLeft ? { scale: 0.95 } : {}}
                className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  !canScrollLeft
                    ? "opacity-30 cursor-not-allowed bg-gray-800/50 border border-gray-700"
                    : "bg-primary/10 border-2 border-primary/30 hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/30"
                }`}
                aria-label="Scroll left to view previous products"
              >
                <ChevronLeft
                  size={24}
                  className={`transition-all duration-300 ${
                    !canScrollLeft
                      ? "text-gray-600"
                      : "text-primary group-hover:text-white group-hover:-translate-x-1"
                  }`}
                />
                {canScrollLeft && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
                )}
              </motion.button>

              {/* Progress Indicators */}
              <div className="flex gap-2">
                {products.map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.05 }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === 0
                        ? "w-10 bg-linear-to-r from-primary to-primary/70"
                        : "w-1.5 bg-gray-700 hover:bg-primary/50 hover:w-6 cursor-pointer"
                    }`}
                  />
                ))}
              </div>

              {/* Right Button */}
              <motion.button
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                whileHover={canScrollRight ? { scale: 1.1 } : {}}
                whileTap={canScrollRight ? { scale: 0.95 } : {}}
                className={`group relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                  !canScrollRight
                    ? "opacity-30 cursor-not-allowed bg-gray-800/50 border border-gray-700"
                    : "bg-primary/10 border-2 border-primary/30 hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/30"
                }`}
                aria-label="Scroll right to view more products"
              >
                <ChevronRight
                  size={24}
                  className={`transition-all duration-300 ${
                    !canScrollRight
                      ? "text-gray-600"
                      : "text-primary group-hover:text-white group-hover:translate-x-1"
                  }`}
                />
                {canScrollRight && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300 -z-10" />
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hide scrollbar styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
