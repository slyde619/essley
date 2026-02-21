import { Link } from "react-router";

const footerLinks = [
  {
    title: "Company",
    links: [
      { label: "About", path: "/about" },
      { label: "Our Role", path: "/our-role" },
      { label: "Compliance", path: "/compliance" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Products", path: "/products" },
      { label: "Process", path: "/process" },
      { label: "Insights", path: "/insights" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              to="/"
              className="font-heading text-xl font-bold tracking-wider text-foreground"
            >
              ESSLEY<span className="text-primary">.</span>TRADING
            </Link>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-md">
              A global oil & gas intermediary facilitating structured crude oil
              transactions between verified sellers and qualified international
              buyers.
            </p>
          </div>

          {/* Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="font-heading text-sm font-semibold tracking-wider uppercase text-foreground mb-4">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Essley Trading. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Structured Energy Transactions · Globally Connected
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
