import { ArrowRight, X } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";
import { articles } from "@/data/insights";

const Insights = () => {
  const dialogRef = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openArticle = (article) => {
    setSelectedArticle(article);
    dialogRef.current?.showModal();
    // Prevent body scroll when dialog is open
    document.body.style.overflow = "hidden";
  };

  const closeArticle = () => {
    dialogRef.current?.close();
    // Restore body scroll when dialog closes
    document.body.style.overflow = "";
  };

  return (
    <main className="pt-24">
      <section className="py-28">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <div className="max-w-4xl">
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-primary mb-4 block">
                Insights
              </span>
              <h1 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-8 leading-[1.1]">
                Market Intelligence & Analysis
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Structured insights on crude oil trading, compliance frameworks,
                and transaction methodologies from our brokerage team.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {articles.map((article, i) => (
              <ScrollReveal key={article.slug} delay={i * 0.1}>
                <motion.article
                  className="group relative h-full cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => openArticle(article)}
                >
                  {/* Glass card */}
                  <div className="relative h-full overflow-hidden rounded-sm transition-all duration-300 border-2 border-border/40 group-hover:border-orange-500/30 group-hover:shadow-lg group-hover:shadow-orange-500/5">
                    {/* Image Header */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Dark overlay for depth */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60" />

                      {/* Grain texture overlay on image */}
                      <div
                        className="absolute inset-0 opacity-[0.15] pointer-events-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='insightGrain${i}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.8' numOctaves='4' seed='${i + 30}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23insightGrain${i})' opacity='0.3'/%3E%3C/svg%3E")`,
                          backgroundSize: "256px 256px",
                        }}
                      />
                    </div>

                    {/* Content Section with Frosted Glass Background */}
                    <div className="relative bg-card/50 backdrop-blur-md">
                      {/* Grain texture on content */}
                      <div
                        className="absolute inset-0 opacity-[0.12] pointer-events-none"
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='contentGrain${i}'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='3' seed='${i + 50}' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23contentGrain${i})' opacity='0.4'/%3E%3C/svg%3E")`,
                          backgroundSize: "128px 128px",
                        }}
                      />

                      {/* Content */}
                      <div className="relative flex flex-col p-8">
                        {/* Category and Date */}
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-xs px-3 py-1.5 rounded-full bg-foreground/10 text-primary font-medium backdrop-blur-sm">
                            {article.category}
                          </span>
                          <time className="text-xs text-muted-foreground font-medium">
                            {article.date}
                          </time>
                        </div>

                        {/* Title */}
                        <h2 className="font-heading text-xl font-semibold text-foreground mb-4 leading-tight transition-colors duration-300 group-hover:text-orange-900">
                          {article.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {article.excerpt}
                        </p>

                        {/* Read Article Link */}
                        <footer className="pt-4 border-t border-border/30 transition-colors duration-300 group-hover:border-orange-500/20">
                          <button
                            className="inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-orange-600 font-medium transition-all duration-300 group-hover:gap-3"
                            aria-label={`Read full article: ${article.title}`}
                          >
                            Read Article <ArrowRight size={14} />
                          </button>
                        </footer>
                      </div>
                    </div>

                    {/* Subtle bottom accent */}
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black/70 backdrop:backdrop-blur-sm bg-background border border-border rounded-xl shadow-2xl max-w-4xl w-[calc(100%-2rem)] h-[85vh] p-0 m-0 overflow-hidden open:animate-in open:fade-in open:zoom-in-95 open:duration-300"
        onClick={(e) => {
          // Close when clicking the backdrop
          if (e.target === dialogRef.current) {
            closeArticle();
          }
        }}
      >
        {selectedArticle && (
          <article className="h-full flex flex-col">
            <header className="shrink-0 bg-background/95 backdrop-blur-sm border-b border-border px-8 py-6 flex items-start justify-between gap-6">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium tracking-wide">
                    {selectedArticle.category}
                  </span>
                  <time className="text-xs text-muted-foreground font-medium">
                    {selectedArticle.date}
                  </time>
                </div>
                <h2 className="font-heading text-3xl font-bold text-foreground leading-tight pr-4">
                  {selectedArticle.title}
                </h2>
              </div>
              <button
                onClick={closeArticle}
                className="shrink-0 p-2.5 rounded-full hover:bg-muted/80 transition-all duration-200 group ring-1 ring-border hover:ring-primary/20"
                aria-label="Close dialog"
              >
                <X
                  size={20}
                  className="text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all duration-200"
                />
              </button>
            </header>

            <section className="flex-1 overflow-y-auto px-8 py-8 overscroll-contain">
              <div className="max-w-3xl mx-auto space-y-6 text-foreground">
                <div
                  dangerouslySetInnerHTML={{
                    __html: selectedArticle.content,
                  }}
                  className="article-content [&_h3]:text-xl [&_h3]:font-heading [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-4 [&_h3]:mt-8 first:[&_h3]:mt-0 [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-5 [&_p]:text-base"
                />
              </div>
            </section>
          </article>
        )}
      </dialog>
    </main>
  );
};

export default Insights;
