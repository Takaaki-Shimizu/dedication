"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Twitter, ArrowUp, MapPin, Clock } from "lucide-react";

const navigationLinks = [
  { name: "経歴・プロフィール", href: "#about" },
  { name: "技術スタック", href: "#skills" },
  { name: "プロジェクト", href: "#projects" },
  { name: "お問い合わせ", href: "#contact" },
];

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Takaaki-Shimizu",
    icon: Github,
    description: "コードとプロジェクト"
  },
  {
    name: "LinkedIn", 
    href: "https://linkedin.com/in/takaakishimizu",
    icon: Linkedin,
    description: "プロフェッショナルネットワーク"
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/ilsbt", 
    icon: Twitter,
    description: "技術情報とアップデート"
  },
  {
    name: "Email",
    href: "mailto:57.shimizu.takaaki@gmail.com",
    icon: Mail,
    description: "直接連絡"
  }
];

export function Footer() {
  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (href: string) => {
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
    <footer className="bg-gradient-to-br from-muted/30 to-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* About Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary/70 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-lg">Takaaki Shimizu</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">清水 隆亮</h3>
                <p className="text-sm text-muted-foreground">Backend Engineer</p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              スケーラブルなシステム構築とクラウドアーキテクチャ設計を専門とする
              エンジニア。Go、Python、AWSを用いた高性能なWeb
              アプリケーション開発に従事しています。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>埼玉県</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>57.shimizu.takaaki@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>返信: 通常24時間以内</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold mb-4">サイトマップ</h4>
            <nav className="space-y-2">
              {navigationLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">ソーシャル</h4>
            <div className="space-y-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    target={social.name !== "Email" ? "_blank" : undefined}
                    rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="font-medium">{social.name}</div>
                      <div className="text-xs text-muted-foreground">{social.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Takaaki Shimizu. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
          
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Button
                  key={social.name}
                  asChild
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 hover:bg-primary/10 hover:text-primary"
                >
                  <Link
                    href={social.href}
                    target={social.name !== "Email" ? "_blank" : undefined}
                    rel={social.name !== "Email" ? "noopener noreferrer" : undefined}
                    title={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={handleScrollToTop}
        variant="default"
        size="icon"
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full shadow-lg hover:scale-110 transition-all duration-300 z-40"
        title="トップに戻る"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
    </footer>
  );
}