import { memo } from "react";

const Footer = memo(function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/50 liquid-glass">
      <div className="section-container flex flex-col gap-3 py-12 text-center">
        <p className="text-sm font-medium text-foreground">© 2025 Gabriel Ludwig Rivera. All rights reserved.</p>
      </div>
    </footer>
  );
});

export default Footer;

