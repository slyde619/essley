import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import Modal from "@/components/Modal";
import { productList } from "@/data/products";
import { ChevronRight, Check, ArrowRight } from "lucide-react";

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [modalState, setModalState] = useState({ isOpen: false, type: "mandate" });

  const openModal = (type) => {
    setModalState({ isOpen: true, type });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: "mandate" });
  };

  return (
    <main className="pt-24">
      {/* Header Section */}
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Products
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Energy Products We Facilitate
              </h1>
              <div className="w-16 h-0.5 bg-primary mb-8" />
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                We facilitate transactions across a range of crude oil and
                refined petroleum products, each with full specification
                documentation, verified sourcing, and established delivery
                terms.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Interactive Product Selector */}
      <section className="pb-28">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Selector Rail - Sticky on desktop */}
            <div className="lg:w-64 shrink-0">
              <div className="lg:sticky lg:top-28 space-y-2">
                <h3 className="font-heading text-sm font-semibold text-muted-foreground tracking-wider uppercase mb-4">
                  Select Product
                </h3>
                {productList.map((product, i) => (
                  <button
                    key={product.name}
                    onClick={() => setSelectedProduct(i)}
                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-300 ${
                      selectedProduct === i
                        ? "border-primary bg-primary/5 text-foreground"
                        : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium truncate">
                        {product.name}
                      </span>
                      {selectedProduct === i && (
                        <Check size={14} className="text-primary shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Product Detail Panel with Animation */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedProduct}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <div className="relative p-8 md:p-12 rounded-lg border border-border bg-card overflow-hidden group">
                    {/* Concentric Ring Animation Background */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/10 scale-0 group-hover:scale-[8] transition-transform duration-1500 ease-out" />
                      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/5 scale-0 group-hover:scale-[12] transition-transform duration-1500 ease-out delay-150" />
                      <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-primary/5 scale-0 group-hover:scale-[16] transition-transform duration-1500 ease-out delay-300" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header with floating tags */}
                      <div className="mb-8">
                        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                          {productList[selectedProduct].name}
                        </h2>

                        {/* Floating metric tags */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 backdrop-blur-sm"
                          >
                            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            <span className="text-xs font-medium text-foreground">
                              {productList[selectedProduct].origin}
                            </span>
                          </motion.span>

                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 backdrop-blur-sm"
                          >
                            <span className="text-xs font-medium text-foreground">
                              {productList[selectedProduct].api}
                            </span>
                          </motion.span>

                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-border/50 backdrop-blur-sm"
                          >
                            <span className="text-xs font-medium text-foreground">
                              Sulfur: {productList[selectedProduct].sulfur}
                            </span>
                          </motion.span>

                          <motion.span
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 backdrop-blur-sm"
                          >
                            <Check size={12} className="text-primary" />
                            <span className="text-xs font-medium text-primary">
                              Available
                            </span>
                          </motion.span>
                        </div>

                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-base text-muted-foreground leading-relaxed"
                        >
                          {productList[selectedProduct].description}
                        </motion.p>
                      </div>

                      {/* Specifications Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border"
                      >
                        {/* Specifications */}
                        <div>
                          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider uppercase flex items-center gap-2">
                            <ChevronRight size={14} className="text-primary" />
                            Specifications
                          </h4>
                          <ul className="space-y-3">
                            {productList[selectedProduct].specs.map((spec, i) => (
                              <motion.li
                                key={spec}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.05 }}
                                className="flex items-start gap-3 text-sm text-muted-foreground"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                                {spec}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Delivery Terms */}
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 }}
                        >
                          <h4 className="font-heading text-sm font-semibold text-foreground mb-4 tracking-wider uppercase flex items-center gap-2">
                            <ChevronRight size={14} className="text-primary" />
                            Delivery Terms
                          </h4>
                          <div className="p-4 rounded-lg bg-secondary/30 border border-border/50">
                            <p className="text-base font-medium text-foreground mb-2">
                              {productList[selectedProduct].delivery}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Flexible delivery arrangements available based on buyer requirements
                            </p>
                          </div>

                          <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
                            <p className="text-xs font-medium text-primary mb-1">
                              Documentation Provided
                            </p>
                            <ul className="space-y-1">
                              <li className="text-xs text-muted-foreground flex items-center gap-2">
                                <Check size={10} className="text-primary" />
                                Full product specifications
                              </li>
                              <li className="text-xs text-muted-foreground flex items-center gap-2">
                                <Check size={10} className="text-primary" />
                                Quality certificates
                              </li>
                              <li className="text-xs text-muted-foreground flex items-center gap-2">
                                <Check size={10} className="text-primary" />
                                Chain of custody verification
                              </li>
                            </ul>
                          </div>
                        </motion.div>
                      </motion.div>

                      {/* CTA Button */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="mt-8 pt-8 border-t border-border"
                      >
                        <button
                          onClick={() => openModal("mandate")}
                          className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground font-heading font-semibold text-sm tracking-wide rounded-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-1"
                        >
                          Submit Request
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>
                        <p className="mt-3 text-xs text-muted-foreground">
                          Submit your interest for {productList[selectedProduct].name}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Product Comparison Grid */}
          <ScrollReveal delay={0.3}>
            <div className="mt-20">
              <h3 className="font-heading text-2xl font-bold text-foreground mb-8 text-center">
                Quick Comparison
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Product
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Origin
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        API Gravity
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Sulfur Content
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Delivery
                      </th>
                      <th className="text-left py-4 px-4 font-heading text-sm font-semibold text-foreground">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productList.map((product, i) => (
                      <motion.tr
                        key={product.name}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className={`border-b border-border/50 hover:bg-secondary/20 transition-colors ${
                          selectedProduct === i ? "bg-primary/5" : ""
                        }`}
                      >
                        <td
                          className="py-4 px-4 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(i);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <span className="text-sm font-medium text-foreground">
                            {product.name}
                          </span>
                        </td>
                        <td
                          className="py-4 px-4 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(i);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <span className="text-sm text-muted-foreground">
                            {product.origin}
                          </span>
                        </td>
                        <td
                          className="py-4 px-4 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(i);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <span className="text-sm text-muted-foreground">
                            {product.api}
                          </span>
                        </td>
                        <td
                          className="py-4 px-4 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(i);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <span className="text-sm text-muted-foreground">
                            {product.sulfur}
                          </span>
                        </td>
                        <td
                          className="py-4 px-4 cursor-pointer"
                          onClick={() => {
                            setSelectedProduct(i);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >
                          <span className="text-sm text-muted-foreground">
                            {product.delivery}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal("mandate");
                            }}
                            className="group inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground font-medium text-xs tracking-wide rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 whitespace-nowrap"
                          >
                            Submit Request
                            <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MODAL */}
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        type={modalState.type}
      />
    </main>
  );
};

export default Products;
