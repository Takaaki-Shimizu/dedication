"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";
import { Menu, User } from "lucide-react";

const navigationItems = [
  { name: "About", href: "#about", label: "経歴・プロフィール" },
  { name: "Skills", href: "#skills", label: "技術スタック" },
  { name: "Projects", href: "#projects", label: "プロジェクト" },
];

export function HeaderNavigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    // スクロール検知
    window.addEventListener("scroll", handleScroll);

    // セクション検知用のIntersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-50% 0px -50% 0px",
    });

    navigationItems.forEach((item) => {
      const element = document.querySelector(item.href);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, [mounted]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    
    // スムーススクロール
    if (typeof window !== 'undefined') {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ 
          behavior: "smooth",
          block: "start"
        });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/80 backdrop-blur-md border-b shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Name */}
          <Link 
            href="#hero" 
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-2 font-bold text-xl hover:text-primary transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span>Takaaki Shimizu</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <nav className="flex items-center gap-6">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-md ${
                    activeSection === item.href.slice(1)
                      ? "text-primary font-semibold"
                      : "text-muted-foreground"
                  }`}
                  aria-label={`${item.label}セクションに移動`}
                >
                  {item.name}
                </button>
              ))}
            </nav>

            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="w-9 h-9"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">メニューを開く</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
                <SheetTitle className="sr-only">
                  ナビゲーションメニュー
                </SheetTitle>
                <div className="flex flex-col h-full p-6">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between border-b pb-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-bold text-lg">Takaaki Shimizu</span>
                    </div>
                  </div>

                  {/* Mobile Navigation Items */}
                  <nav className="flex flex-col gap-6">
                    {navigationItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`flex flex-col items-start gap-1 p-4 rounded-lg transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
                          activeSection === item.href.slice(1)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground"
                        }`}
                        aria-label={`${item.label}セクションに移動`}
                      >
                        <span className="font-semibold text-lg">{item.name}</span>
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </button>
                    ))}
                  </nav>

                  {/* Mobile Footer */}
                  <div className="mt-auto pt-6 border-t">
                    <p className="text-sm text-muted-foreground text-center">
                      Engineer Portfolio
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}