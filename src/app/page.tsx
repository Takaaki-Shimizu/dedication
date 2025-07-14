import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { TypingAnimation } from "@/components/typing-animation";
import { SkillCard } from "@/components/skill-card";
import { ProjectsSection } from "@/components/projects-section";
import { AboutSection } from "@/components/about-section";
import { ContactForm } from "@/components/contact-form";
import { HeaderNavigation } from "@/components/header-navigation";
import { Footer } from "@/components/footer";
import { Github, Linkedin, Mail, ExternalLink, Server, Database, Cloud, Twitter, MapPin, Download, Globe, Wrench, Star } from "lucide-react";
import Link from "next/link";

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Takaki Shimizu",
  "jobTitle": "Backend Engineer",
  "description": "Backend engineer specializing in scalable systems, cloud architecture, and modern development practices.",
  "url": "https://dedication.vercel.app",
  "sameAs": [
    "https://github.com/takaakishimizu",
    "https://linkedin.com/in/takaakishimizu"
  ],
  "knowsAbout": [
    "Backend Development",
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
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Python", level: 95, years: 5, description: "Django、FastAPI、Flask等を用いたWebアプリケーション開発" },
      { name: "Go", level: 90, years: 3, description: "高性能なマイクロサービス、API開発、並行処理プログラミング" },
      { name: "Node.js", level: 85, years: 4, description: "Express.js、NestJSを使ったRESTful API、リアルタイム通信" },
      { name: "Java", level: 80, years: 3, description: "Spring Boot、Maven、エンタープライズアプリケーション開発" }
    ]
  },
  frontend: {
    title: "フロントエンド",
    icon: <Globe className="h-6 w-6 text-white" />,
    color: "from-blue-500 to-purple-500",
    skills: [
      { name: "React", level: 88, years: 4, description: "モダンなUI開発、状態管理、パフォーマンス最適化" },
      { name: "TypeScript", level: 92, years: 4, description: "型安全なコード開発、大規模アプリケーションの保守性向上" },
      { name: "Next.js", level: 85, years: 2, description: "SSR、SSG、フルスタック開発、SEO最適化" }
    ]
  },
  database: {
    title: "データベース",
    icon: <Database className="h-6 w-6 text-white" />,
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "PostgreSQL", level: 90, years: 5, description: "複雑なクエリ設計、パフォーマンスチューニング、レプリケーション" },
      { name: "MySQL", level: 85, years: 4, description: "データベース設計、インデックス最適化、トランザクション管理" },
      { name: "MongoDB", level: 80, years: 3, description: "NoSQLデータモデリング、アグリゲーション、シャーディング" },
      { name: "Redis", level: 85, years: 3, description: "キャッシュ戦略、セッション管理、リアルタイム機能実装" }
    ]
  },
  infrastructure: {
    title: "インフラ・DevOps",
    icon: <Cloud className="h-6 w-6 text-white" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "AWS", level: 88, years: 4, description: "EC2、ECS、Lambda、RDS、S3等を使ったクラウドアーキテクチャ設計" },
      { name: "Docker", level: 90, years: 4, description: "コンテナ化、マルチステージビルド、開発環境の標準化" },
      { name: "Kubernetes", level: 75, years: 2, description: "オーケストレーション、自動スケーリング、サービスメッシュ" }
    ]
  },
  tools: {
    title: "ツール・手法",
    icon: <Wrench className="h-6 w-6 text-white" />,
    color: "from-indigo-500 to-blue-500",
    skills: [
      { name: "Git", level: 95, years: 6, description: "ブランチ戦略、コードレビュー、チーム開発ワークフロー" },
      { name: "CI/CD", level: 85, years: 3, description: "GitHub Actions、GitLab CI、自動テスト・デプロイパイプライン" },
      { name: "API設計", level: 90, years: 4, description: "RESTful API、GraphQL、OpenAPI仕様書作成、APIセキュリティ" }
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
        <div id="hero" className="min-h-screen bg-hero-pattern bg-gradient-to-br from-background via-background to-muted/20 relative overflow-hidden pt-16"></div>
        {/* Background decorations */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-emerald-500/10 animate-gradient"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-32 left-16 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: "2s"}}></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          {/* Hero Section */}
          <section className="min-h-[90vh] flex items-center justify-center">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left space-y-6 animate-fade-in-left">
                <div className="space-y-2">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    東京都
                  </p>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                    清水 貴明
                  </h1>
                  <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground min-h-[3rem] flex items-center justify-center lg:justify-start">
                    <TypingAnimation 
                      texts={["バックエンドエンジニア", "フルスタック開発者", "システムアーキテクト"]}
                      className="font-semibold"
                      typingSpeed={80}
                      deletingSpeed={40}
                      delayBetweenTexts={2500}
                    />
                  </div>
                </div>

                <div className="space-y-4 max-w-2xl">
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    スケーラブルなシステム構築とクラウドアーキテクチャ設計を専門とする
                    バックエンドエンジニアです。
                  </p>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                    Go、Python、AWSを用いたマイクロサービス開発で、
                    高性能なWebアプリケーションの構築を得意としています。
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-6 text-lg">
                    <Link href="#contact">
                      <Mail className="mr-2 h-5 w-5" />
                      お問い合わせ
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 font-semibold px-8 py-6 text-lg">
                    <Link href="#projects">
                      <ExternalLink className="mr-2 h-5 w-5" />
                      作品を見る
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="lg" className="font-semibold px-8 py-6 text-lg">
                    <Link href="/resume.pdf">
                      <Download className="mr-2 h-5 w-5" />
                      履歴書
                    </Link>
                  </Button>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4 justify-center lg:justify-start pt-6">
                  <div className="flex gap-4">
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all duration-300">
                      <Link href="https://github.com/takaakishimizu" target="_blank" rel="noopener noreferrer">
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all duration-300">
                      <Link href="https://linkedin.com/in/takaakishimizu" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                      </Link>
                    </Button>
                    <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10 hover:scale-110 transition-all duration-300">
                      <Link href="https://twitter.com/takaakishimizu" target="_blank" rel="noopener noreferrer">
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Link>
                    </Button>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                      Go
                    </Badge>
                    <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                      Python
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
                      AWS
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Right Column - Profile Image */}
              <div className="flex justify-center lg:justify-end animate-fade-in-right">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                  <Avatar className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 border-4 border-background shadow-2xl relative z-10 animate-float">
                    <AvatarImage 
                      src="/profile-placeholder.jpg" 
                      alt="清水 貴明 プロフィール写真"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      清水
                    </AvatarFallback>
                  </Avatar>
                  {/* Floating badges around the avatar */}
                  <div className="absolute -top-4 -right-4 animate-bounce">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                      Backend
                    </Badge>
                  </div>
                  <div className="absolute -bottom-4 -left-4 animate-bounce" style={{animationDelay: "0.5s"}}>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                      Cloud
                    </Badge>
                  </div>
                  <div className="absolute top-1/2 -left-8 animate-bounce" style={{animationDelay: "1s"}}>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-sm font-semibold shadow-lg">
                      API
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <section id="skills" className="py-20 bg-gradient-to-br from-muted/20 to-background relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                技術スタック & スキル
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                実務経験と継続的な学習を通じて培った技術力。各分野での習熟度と経験年数を
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
        <section id="contact" className="py-20 bg-gradient-to-br from-muted/20 to-background relative">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                お問い合わせ
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                お仕事のご相談、技術に関するご質問、プロジェクトについてのディスカッションなど、
                どのような内容でもお気軽にお問い合わせください。
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
                <Button asChild variant="outline" size="lg" className="border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 min-w-[160px]">
                  <Link href="mailto:takaki.shimizu@example.com">
                    <Mail className="mr-2 h-5 w-5" />
                    直接メール
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 min-w-[160px]">
                  <Link href="https://github.com/takaakishimizu" target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-5 w-5" />
                    GitHub
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 min-w-[160px]">
                  <Link href="https://linkedin.com/in/takaakishimizu" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="mr-2 h-5 w-5" />
                    LinkedIn
                  </Link>
                </Button>
              </div>
              
              {/* Contact Info */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">メール</h4>
                  <p className="text-sm text-muted-foreground">takaki.shimizu@example.com</p>
                  <p className="text-xs text-muted-foreground mt-1">24時間以内に返信</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Github className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">GitHub</h4>
                  <p className="text-sm text-muted-foreground">@takaakishimizu</p>
                  <p className="text-xs text-muted-foreground mt-1">コードとプロジェクト</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-semibold mb-2">LinkedIn</h4>
                  <p className="text-sm text-muted-foreground">Takaki Shimizu</p>
                  <p className="text-xs text-muted-foreground mt-1">プロフェッショナルネットワーク</p>
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
