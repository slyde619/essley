import { ArrowRight, X } from "lucide-react";
import { useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import { articles } from "@/data/insights";

const Insights = () => {
  const dialogRef = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const openArticle = (article) => {
    setSelectedArticle(article);
    dialogRef.current?.showModal();
    // Prevent body scroll when dialog is open
    document.body.style.overflow = 'hidden';
  };

  const closeArticle = () => {
    dialogRef.current?.close();
    // Restore body scroll when dialog closes
    document.body.style.overflow = '';
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
              <div className="w-16 h-0.5 bg-primary mb-8" />
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
                <article className="group p-8 rounded-lg border border-border bg-card hover:border-primary/30 transition-all duration-500 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs px-3 py-1 rounded-full bg-secondary text-primary font-medium">
                      {article.category}
                    </span>
                    <time className="text-xs text-muted-foreground">
                      {article.date}
                    </time>
                  </div>
                  <h2 className="font-heading text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <footer className="mt-6 pt-4 border-t border-border">
                    <button
                      onClick={() => openArticle(article)}
                      className="inline-flex items-center gap-2 text-sm text-primary font-medium hover:gap-3 transition-all duration-300"
                      aria-label={`Read full article: ${article.title}`}
                    >
                      Read Article <ArrowRight size={14} />
                    </button>
                  </footer>
                </article>
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
                <X size={20} className="text-muted-foreground group-hover:text-foreground group-hover:rotate-90 transition-all duration-200" />
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
