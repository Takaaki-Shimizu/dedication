"use client";

import { Timeline, type TimelineItem } from "./timeline";
import { StrengthsGrid, type Strength, type Interest, type Certification } from "./strengths-grid";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Users, 
  Zap, 
  Target, 
  Camera, 
  Code2, 
  Gamepad2, 
  Plane,
  Music,
  Book
} from "lucide-react";

// Sample data
const timelineData: TimelineItem[] = [
  {
    id: "1",
    type: "work",
    title: "シニアバックエンドエンジニア",
    organization: "テックイノベーション株式会社",
    location: "東京",
    period: "2022年4月 - 現在",
    current: true,
    description: [
      "マイクロサービスアーキテクチャの設計・実装を主導",
      "Go言語を使った高性能APIの開発とパフォーマンス最適化",
      "DevOpsパイプラインの構築とクラウドインフラ管理"
    ],
    achievements: [
      "APIレスポンス時間を70%短縮する最適化を実施",
      "月間1,000万リクエストを処理するシステムアーキテクチャを設計",
      "チーム内のコードレビュー文化を確立し、バグ発生率を40%削減",
      "新入社員向けの技術研修プログラムを開発・実施"
    ],
    skills: ["Go", "Kubernetes", "AWS", "PostgreSQL", "Redis", "Docker", "gRPC", "Prometheus"]
  },
  {
    id: "2",
    type: "work",
    title: "バックエンドエンジニア",
    organization: "フューチャーシステムズ合同会社",
    location: "大阪",
    period: "2020年3月 - 2022年3月",
    description: [
      "ECサイトのバックエンド開発とAPI設計",
      "Python (Django) を使ったWebアプリケーション開発",
      "データベース設計とパフォーマンスチューニング"
    ],
    achievements: [
      "レガシーシステムのモダンアーキテクチャへの移行を完了",
      "自動テストカバレッジを20%から85%まで向上",
      "決済システムのセキュリティ強化を実施"
    ],
    skills: ["Python", "Django", "PostgreSQL", "AWS", "Docker", "Jenkins", "REST API"]
  },
  {
    id: "3",
    type: "work",
    title: "ジュニアソフトウェアエンジニア",
    organization: "スタートアップテック株式会社",
    location: "東京",
    period: "2018年4月 - 2020年2月",
    description: [
      "フルスタック開発でのWebアプリケーション構築",
      "React.js とNode.js を使ったSPAの開発",
      "小規模チームでのアジャイル開発の経験"
    ],
    achievements: [
      "ユーザー数3倍増加に貢献するUI/UX改善を実施",
      "開発効率向上のためのツール作成・導入"
    ],
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express.js", "HTML/CSS"]
  },
  {
    id: "4",
    type: "education",
    title: "情報工学科 学士",
    organization: "東京工業大学",
    location: "東京",
    period: "2014年4月 - 2018年3月",
    description: [
      "コンピュータサイエンスの基礎から応用まで幅広く学習",
      "アルゴリズムとデータ構造、ソフトウェア工学を専攻",
      "卒業研究では機械学習を使った画像認識システムを開発"
    ],
    achievements: [
      "学業成績優秀者として学科代表に選出",
      "プログラミングコンテストで3位入賞",
      "オープンソースプロジェクトに継続的に貢献"
    ],
    skills: ["C++", "Java", "Python", "機械学習", "数学", "統計学"]
  }
];

const strengthsData: Strength[] = [
  {
    id: "1",
    title: "問題解決力",
    description: "複雑な技術的課題を分析し、効率的で実装可能な解決策を見つけることが得意です。",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    examples: [
      "レガシーシステムのパフォーマンス問題を根本から解決",
      "複雑な業務要件を技術仕様に落とし込み",
      "障害発生時の迅速な原因特定と対策実施"
    ]
  },
  {
    id: "2",
    title: "チームワーク",
    description: "多様なバックグラウンドを持つメンバーとの協働を通じて、チーム全体のパフォーマンス向上に貢献します。",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-500 to-purple-500",
    examples: [
      "新入社員のメンタリングと技術指導",
      "クロスファンクショナルチームでのプロジェクト推進",
      "知識共有セッションの企画・実施"
    ]
  },
  {
    id: "3",
    title: "継続的学習",
    description: "新しい技術やトレンドを積極的に学び、実際のプロジェクトに活用することで価値を創出します。",
    icon: <Zap className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    examples: [
      "新しいプログラミング言語の習得と業務での活用",
      "技術書の読書とアウトプットの継続",
      "OSS貢献を通じたスキル向上"
    ]
  },
  {
    id: "4",
    title: "品質への拘り",
    description: "コードの品質、システムの信頼性、ユーザー体験の向上に常に注力しています。",
    icon: <Target className="w-6 h-6" />,
    color: "from-red-500 to-pink-500",
    examples: [
      "包括的なテスト戦略の策定と実施",
      "コードレビューの品質向上とベストプラクティス共有",
      "監視・アラートシステムの構築"
    ]
  }
];

const interestsData: Interest[] = [
  {
    id: "1",
    title: "写真撮影",
    description: "風景や街角の写真を撮ることで、新しい視点や美しさを発見することを楽しんでいます。",
    icon: <Camera className="w-8 h-8" />
  },
  {
    id: "2",
    title: "OSS貢献",
    description: "オープンソースプロジェクトへの貢献を通じて、グローバルな開発コミュニティとの交流を深めています。",
    icon: <Code2 className="w-8 h-8" />
  },
  {
    id: "3",
    title: "ゲーム開発",
    description: "個人プロジェクトとして小規模なゲーム開発を行い、創作活動を通じて技術力を磨いています。",
    icon: <Gamepad2 className="w-8 h-8" />
  },
  {
    id: "4",
    title: "旅行",
    description: "国内外の様々な場所を訪れ、異なる文化や価値観に触れることで視野を広げています。",
    icon: <Plane className="w-8 h-8" />
  },
  {
    id: "5",
    title: "音楽鑑賞",
    description: "ジャズからエレクトロニックまで幅広いジャンルの音楽を聴き、集中力とクリエイティビティを高めています。",
    icon: <Music className="w-8 h-8" />
  },
  {
    id: "6",
    title: "技術書読書",
    description: "最新の技術トレンドやソフトウェア設計の知識を書籍から学び、実務に活かしています。",
    icon: <Book className="w-8 h-8" />
  }
];

const certificationsData: Certification[] = [
  {
    id: "1",
    name: "AWS Certified Solutions Architect - Professional",
    issuer: "Amazon Web Services",
    date: "2023年8月",
    description: "AWSクラウドアーキテクチャの設計と実装に関する上級レベルの認定",
    credentialId: "AWS-SAP-12345"
  },
  {
    id: "2",
    name: "Certified Kubernetes Administrator (CKA)",
    issuer: "Cloud Native Computing Foundation",
    date: "2023年3月",
    description: "Kubernetesクラスターの管理と運用に関する実践的な認定",
    credentialId: "CKA-67890"
  },
  {
    id: "3",
    name: "Google Cloud Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "2022年11月",
    description: "Google Cloudでのクラウドアーキテクチャ設計・実装の専門認定"
  },
  {
    id: "4",
    name: "基本情報技術者試験",
    issuer: "独立行政法人情報処理推進機構",
    date: "2017年12月",
    description: "ITエンジニアとしての基本的な知識とスキルの国家資格"
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-muted/10 to-background relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            経歴 & プロフィール
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            これまでの学習と実務経験を通じて培った技術力と、
            エンジニアとしての価値観や人となりをご紹介します。
          </p>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          
          {/* Left Column - Profile & Introduction */}
          <div className="space-y-12">
            {/* Profile Card */}
            <Card className="bg-gradient-to-br from-background to-muted/20 border-2">
              <CardContent className="p-8">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                    <AvatarImage 
                      src="/profile-photo.jpg" 
                      alt="清水 貴明"
                      className="object-cover"
                    />
                    <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-primary to-primary/70 text-white">
                      清水
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="text-center sm:text-left flex-1">
                    <h3 className="text-2xl font-bold mb-2">清水 貴明</h3>
                    <p className="text-lg text-muted-foreground mb-4">シニアバックエンドエンジニア</p>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                      <Badge className="bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300">
                        Go
                      </Badge>
                      <Badge className="bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                        Python
                      </Badge>
                      <Badge className="bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
                        AWS
                      </Badge>
                      <Badge className="bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                        Kubernetes
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Introduction */}
            <Card className="bg-gradient-to-br from-background to-muted/20 border-2">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">自己紹介</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    大学で情報工学を学んだ後、スタートアップから大手企業まで様々な環境で
                    バックエンド開発に携わってきました。特にスケーラブルなシステム設計と
                    高性能なAPI開発を得意としています。
                  </p>
                  <p>
                    現在はシニアバックエンドエンジニアとして、Go言語を中心とした
                    マイクロサービスアーキテクチャの設計・実装をリードしています。
                    技術的な課題解決だけでなく、チームの技術力向上にも注力しており、
                    メンタリングや知識共有を積極的に行っています。
                  </p>
                  <p>
                    新しい技術への学習意欲が高く、AWSやKubernetesなどのクラウド技術、
                    AI・機械学習分野にも継続的に取り組んでいます。
                    エンジニアとしてのキャリアを通じて、技術力の向上と
                    チーム・組織への貢献の両立を大切にしています。
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Strengths, Interests, and Certifications */}
            <StrengthsGrid 
              strengths={strengthsData}
              interests={interestsData}
              certifications={certificationsData}
            />
          </div>

          {/* Right Column - Timeline */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">経歴タイムライン</h3>
            <Timeline items={timelineData} />
          </div>
        </div>
      </div>
    </section>
  );
}