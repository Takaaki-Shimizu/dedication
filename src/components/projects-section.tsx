"use client";

import { useState, useMemo } from "react";
import { ProjectCard, type Project } from "./project-card";
import { ProjectFilter } from "./project-filter";

// サンプルプロジェクトデータ
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "マイクロサービス型ECプラットフォーム",
    category: "バックエンド",
    description: "Go言語を使用した大規模ECサイトのマイクロサービス化プロジェクト。高トラフィックに対応できるスケーラブルなアーキテクチャを設計・実装しました。",
    fullDescription: "従来のモノリシックなECサイトを、Go言語によるマイクロサービスアーキテクチャに移行するプロジェクト。Docker、Redis、PostgreSQLを活用し、1日100万PVに対応できるシステムを構築。CI/CDパイプラインの構築も担当し、開発効率を40%向上させました。",
    technologies: ["Go", "Docker", "PostgreSQL", "Redis", "gRPC", "Prometheus", "Grafana", "GitHub Actions"],
    image: "/projects/ecommerce-microservices.jpg",
    githubUrl: "https://github.com/takaakishimizu/ecommerce-microservices",
    liveUrl: "https://demo-ecommerce.example.com",
    detailUrl: "/projects/ecommerce-microservices",
    date: "2024年3月",
    status: "completed"
  },
  {
    id: "2",
    title: "リアルタイム分析ダッシュボード",
    category: "フルスタック",
    description: "Next.js、TypeScript、Python FastAPIを使用したリアルタイムデータ分析プラットフォーム。WebSocketとRedisを活用してミリ秒レベルでの更新を実現しました。",
    fullDescription: "企業の営業データをリアルタイムで可視化するダッシュボードアプリケーション。フロントエンドはNext.js + TypeScript、バックエンドはPython FastAPI、データベースはPostgreSQL + Redis。WebSocketによるリアルタイム通信とChart.jsによる美しいデータ可視化を実装。",
    technologies: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Redis", "WebSocket", "Chart.js", "Tailwind CSS"],
    image: "/projects/analytics-dashboard.jpg",
    githubUrl: "https://github.com/takaakishimizu/analytics-dashboard",
    liveUrl: "https://analytics-demo.example.com",
    detailUrl: "/projects/analytics-dashboard",
    date: "2024年1月",
    status: "maintenance"
  },
  {
    id: "3",
    title: "AI文書要約API",
    category: "AI・機械学習",
    description: "自然言語処理を活用した文書自動要約システム。Transformerモデルと独自の前処理アルゴリズムにより、日本語文書の高精度な要約を実現しています。",
    fullDescription: "Hugging Face TransformersとBERTを使用した日本語文書の自動要約API。独自の前処理パイプラインと後処理ロジックにより、従来手法と比較して30%の精度向上を達成。Docker化されたAPIサーバーをAWS ECSでホスティング。",
    technologies: ["Python", "Transformers", "BERT", "FastAPI", "Docker", "AWS ECS", "PostgreSQL", "Celery", "Redis"],
    image: "/projects/ai-summarization.jpg",
    githubUrl: "https://github.com/takaakishimizu/ai-document-summarizer",
    liveUrl: "https://api-summarizer.example.com/docs",
    detailUrl: "/projects/ai-summarization",
    date: "2023年11月",
    status: "completed"
  },
  {
    id: "4",
    title: "チーム管理SaaSプラットフォーム",
    category: "フルスタック",
    description: "React + Node.js + MongoDBで構築したプロジェクト管理SaaS。リアルタイムコラボレーション、タスク管理、レポート機能を提供する包括的なソリューションです。",
    fullDescription: "中小企業向けのプロジェクト管理SaaSプラットフォーム。React + TypeScriptのSPA、Node.js + Express.jsのREST API、MongoDBデータベースで構築。Socket.ioによるリアルタイム更新、Stripe決済統合、メール通知システムを実装。現在50社以上で利用中。",
    technologies: ["React", "TypeScript", "Node.js", "Express.js", "MongoDB", "Socket.io", "Stripe", "AWS S3", "Heroku"],
    image: "/projects/team-management-saas.jpg",
    githubUrl: "https://github.com/takaakishimizu/team-management-platform",
    liveUrl: "https://teammanager.example.com",
    detailUrl: "/projects/team-management",
    date: "2023年8月",
    status: "maintenance"
  },
  {
    id: "5",
    title: "IoTデータ収集システム",
    category: "IoT・組み込み",
    description: "製造業向けのIoTセンサーデータ収集・分析システム。MQTT、InfluxDB、Grafanaを使用してリアルタイム監視と異常検知を実現しました。",
    fullDescription: "工場の機械データをリアルタイムで収集・分析するIoTシステム。Raspberry PiとArduinoを使用したセンサーデータ収集、MQTTブローカーによるデータ転送、InfluxDBでの時系列データ保存、Grafanaでの可視化・アラート機能を実装。機械の予知保全により稼働率を15%向上。",
    technologies: ["Python", "MQTT", "InfluxDB", "Grafana", "Raspberry Pi", "Arduino", "Docker", "Telegraf"],
    image: "/projects/iot-monitoring.jpg",
    githubUrl: "https://github.com/takaakishimizu/iot-monitoring-system",
    detailUrl: "/projects/iot-monitoring",
    date: "2023年6月",
    status: "completed"
  },
  {
    id: "6",
    title: "ブロックチェーン投票システム",
    category: "ブロックチェーン",
    description: "Ethereum上で動作する分散型投票アプリケーション。透明性とセキュリティを重視したスマートコントラクトとWeb3フロントエンドを開発中です。",
    fullDescription: "SolidityスマートコントラクトとReact + Web3.jsフロントエンドによる分散型投票システム。MetaMask連携、IPFS画像ストレージ、イベントログを活用した透明性の高い投票プロセスを実装。テストネットでの動作確認済み、メインネット展開準備中。",
    technologies: ["Solidity", "React", "Web3.js", "Ethereum", "IPFS", "MetaMask", "Hardhat", "Chai"],
    image: "/projects/blockchain-voting.jpg",
    githubUrl: "https://github.com/takaakishimizu/blockchain-voting",
    liveUrl: "https://voting-dapp.example.com",
    detailUrl: "/projects/blockchain-voting",
    date: "2024年5月",
    status: "in-progress"
  }
];

export function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");

  // Get unique categories from projects
  const categories = useMemo(() => {
    const cats = Array.from(new Set(sampleProjects.map(project => project.category)));
    return cats.sort();
  }, []);

  // Filter projects based on active filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return sampleProjects;
    }
    return sampleProjects.filter(project => project.category === activeFilter);
  }, [activeFilter]);

  // Count projects per category
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(category => {
      counts[category] = sampleProjects.filter(project => project.category === category).length;
    });
    return counts;
  }, [categories]);

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-background to-muted/10 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-dots-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            プロジェクト & ポートフォリオ
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            これまで手がけた実際のプロジェクトをご紹介します。
            バックエンド開発からフルスタック、AI・機械学習まで幅広い技術領域での実績があります。
          </p>
        </div>

        {/* Project Filter */}
        <ProjectFilter
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          projectCounts={projectCounts}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={`${project.id}-${activeFilter}`}
              project={project}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-muted-foreground">
              <p className="text-lg mb-2">該当するプロジェクトが見つかりません</p>
              <p className="text-sm">別のカテゴリを選択してください</p>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-6 py-3 backdrop-blur-sm border">
            <span className="text-sm font-medium">更にプロジェクトを開発中</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">GitHub で他のコードも確認できます</span>
          </div>
        </div>
      </div>
    </section>
  );
}