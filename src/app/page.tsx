import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypingAnimation } from "@/components/typing-animation";
import { SkillCard } from "@/components/skill-card";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactForm } from "@/components/contact-form";
import { HeaderNavigation } from "@/components/header-navigation";
import { Footer } from "@/components/footer";
import { Github, Linkedin, Mail, ExternalLink, Server, Database, Cloud, X as Twitter, Languages, Download, Globe, Wrench, Star } from "lucide-react";
import Link from "next/link";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Takaaki Shimizu",
  "jobTitle": "Engineer",
  "description": "engineer specializing in scalable systems, cloud architecture, and modern development practices.",
  "url": "https://dedication.vercel.app",
  "sameAs": [
    "https://github.com/Takaaki-Shimizu",
    "https://www.linkedin.com/in/takaaki-shimizu-3813a7375"
  ],
  "knowsAbout": [
    "Development",
    "Cloud Architecture", 
    "Go Programming",
    "Python",
    "AWS",
    "Microservices",
    "Database Design"
  ]
};

const skillsData = {
  backend: {
    title: "バックエンド",
    icon: <Server className="h-6 w-6 text-white" />,
    color: "from-blue-600 to-blue-700",
    skills: [
      { name: "PHP", level: 70, years: 3, description: "Laravelを用いたWebアプリケーション開発" },
      { name: "Java", level: 30, years: 1, description: "Spring Boot、Maven、Webアプリケーション開発" }
    ]
  },
  frontend: {
    title: "フロントエンド",
    icon: <Globe className="h-6 w-6 text-white" />,
    color: "from-indigo-600 to-indigo-700",
    skills: [
      { name: "React", level: 40, years: 1, description: "WIP" },
    ]
  },
  database: {
    title: "データベース",
    icon: <Database className="h-6 w-6 text-white" />,
    color: "from-slate-600 to-slate-700",
    skills: [
      { name: "MySQL", level: 50, years: 3, description: "WIP" },
    ]
  },
  infrastructure: {
    title: "インフラ",
    icon: <Cloud className="h-6 w-6 text-white" />,
    color: "from-purple-600 to-purple-700",
    skills: [
      { name: "AWS", level: 50, years: 3, description: "WIP" },
    ]
  },
  tools: {
    title: "ツール・手法",
    icon: <Wrench className="h-6 w-6 text-white" />,
    color: "from-teal-600 to-teal-700",
    skills: [
      { name: "Git", level: 90, years: 6, description: "ブランチ戦略、コードレビュー、チーム開発ワークフロー" },
    ]
  }
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Header Navigation */}
      <HeaderNavigation />
      
      <main>
        <div id="hero" className="min-h-screen bg-hero-pattern bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/30 relative overflow-hidden pt-16">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-indigo-600/5 to-purple-600/5 animate-gradient"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: "2s"}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse-glow"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <section className="min-h-[90vh] flex items-center justify-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left space-y-6 animate-fade-in-left">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                    <Languages className="inline w-4 h-4 mr-1" />
                    Shimizu Takaaki
                  </p>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-700 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent leading-tight">
                    清水 隆亮
                  </h1>
                  <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground min-h-[3rem] flex items-center justify-center lg:justify-start">
                    <TypingAnimation 
                      texts={["営業（過去）", "エンジニア（現在）", "プロダクトマネージャー（未来）"]}
                      className="font-semibold"
                      typingSpeed={80}
                      deletingSpeed={40}
                      delayBetweenTexts={2500}
                    />
                  </div>
                </div>

                <div className="space-y-4 max-w-2xl">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    顧客とのコミュニケーションを大切にし、
                    要件定義から設計、実装、運用まで行うエンジニアです。
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    「顧客が心から欲しいプロダクトを届ける」を信条として、
                    エンジニアのロールにとどまらない動きを心がけています。
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl magnetic-button">
                    <Link href="#contact">
                      <Mail className="mr-2 h-5 w-5" />
                      お問い合わせ(WIP)
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-blue-600/20 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 font-semibold px-8 py-6 text-lg magnetic-button">
                    <Link href="#projects">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      作品を見る(WIP)
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="font-semibold px-8 py-6 text-lg hover:bg-slate-100 dark:hover:bg-slate-800 magnetic-button">
                    <Link href="/resume.pdf">
                      <Download className="mr-2 h-5 w-5" />
                      履歴書(WIP)
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="font-semibold px-8 py-6 text-lg hover:bg-slate-100 dark:hover:bg-slate-800 magnetic-button">
                    <Link href="https://lookerstudio.google.com/reporting/1146a000-4d69-4aca-8c73-671aac4fb28f" target="_blank">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      ランニング記録
                    </Link>
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 justify-center lg:justify-start pt-6">
                  <div className="flex gap-4">
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all duration-300">
                      <Link href="https://github.com/Takaaki-Shimizu" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all duration-300">
                      <Link href="https://linkedin.com/in/takaaki-shimizu-3813a7375" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all duration-300">
                      <Link href="https://x.com/ilsbt" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">X（Twitter）</span>
                      </Link>
                    </Button>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                </div>
              </div>
            </div>
          </section>
        </div>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-700 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent">
                技術スタック & スキル
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                各分野での習熟度と経験年数を
                プログレスバーと星評価で視覚的に表現しています。
              </p>
            </div>
            
            {/* Skills Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Backend Skills */}
              <div className="lg:col-span-1">
                <SkillCard
                  title={skillsData.backend.title}
                  icon={skillsData.backend.icon}
                  skills={skillsData.backend.skills}
                  color={skillsData.backend.color}
                  delay={0}
                />
              </div>
              
              {/* Frontend Skills */}
              <div className="lg:col-span-1">
                <SkillCard
                  title={skillsData.frontend.title}
                  icon={skillsData.frontend.icon}
                  skills={skillsData.frontend.skills}
                  color={skillsData.frontend.color}
                  delay={200}
                />
              </div>
              
              {/* Database Skills */}
              <div className="lg:col-span-1 xl:col-span-1">
                <SkillCard
                  title={skillsData.database.title}
                  icon={skillsData.database.icon}
                  skills={skillsData.database.skills}
                  color={skillsData.database.color}
                  delay={400}
                />
              </div>
              
              {/* Infrastructure Skills */}
              <div className="lg:col-span-1">
                <SkillCard
                  title={skillsData.infrastructure.title}
                  icon={skillsData.infrastructure.icon}
                  skills={skillsData.infrastructure.skills}
                  color={skillsData.infrastructure.color}
                  delay={600}
                />
              </div>
              
              {/* Tools & Methodologies */}
              <div className="lg:col-span-1 xl:col-span-2">
                <SkillCard
                  title={skillsData.tools.title}
                  icon={skillsData.tools.icon}
                  skills={skillsData.tools.skills}
                  color={skillsData.tools.color}
                  delay={800}
                />
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-16 text-center">
              <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-6 py-3 backdrop-blur-sm border">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current text-yellow-500" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground mx-2">|</span>
                <span className="text-sm font-medium">5段階評価</span>
                <span className="text-sm text-muted-foreground mx-2">•</span>
                <span className="text-sm text-muted-foreground">プログレスバーは習熟度を表示</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <ProjectsSection />

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gradient-to-br from-slate-50/50 to-white dark:from-slate-900/50 dark:to-slate-900 relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-700 dark:from-slate-100 dark:via-blue-200 dark:to-indigo-300 bg-clip-text text-transparent">
                お問い合わせ(WIP)
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                WIP
              </p>
            </div>

            {/* Contact Form */}
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <ContactForm />
            </div>

            {/* Alternative Contact Methods */}
            <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "400ms" }}>
              <h3 className="text-xl font-semibold mb-6">その他の連絡方法</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                <Button asChild variant="outline" size="lg" className="border-2 border-blue-600/20 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 magnetic-button min-w-[160px]">
                  <Link href="mailto:57.shimizu.takaaki@gmail.com">
                    <Mail className="mr-2 h-5 w-5" />
                    直接メール
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-blue-600/20 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 magnetic-button min-w-[160px]">
                  <Link href="https://github.com/Takaaki-Shimizu" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-blue-600/20 hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 magnetic-button min-w-[160px]">
                  <Link href="https://linkedin.com/in/takaaki-shimizu-3813a7375" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
              
              {/* Contact Info */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">メール</h4>
                  <p className="text-sm text-muted-foreground">57.shimizu.takaaki@gmail.com</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center shadow-lg">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">GitHub</h4>
                  <p className="text-sm text-muted-foreground">@takaakishimizu</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">LinkedIn</h4>
                  <p className="text-sm text-muted-foreground">Takaaki Shimizu</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
}
