"use client";

import { Timeline, type TimelineItem } from "./timeline";
import { StrengthsGrid, type Strength, type Interest, type Certification } from "./strengths-grid";

export interface SpeakingHistory {
  id: string;
  title: string;
  event: string;
  videoUrl: string;
  description?: string;
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  Zap, 
  Target, 
  Book,
  Trophy,
  Activity,
  Wine,
} from "lucide-react";

// Sample data
const timelineData: TimelineItem[] = [
  {
    id: "1",
    type: "work",
    title: "エンジニア",
    organization: "株式会社ウィルゲート",
    period: "2022年9月 - 現在",
    current: true,
    description: [
      "取材支援システムの要件定義-設計-開発-テスト-運用を担当",
      "顧客とのフロント業務を担当",
    ],
    achievements: [
      "PHPerKaigi2025にて登壇(20分セッション)",
      "PHPカンファレンス香川2024にてスタッフとして運営参加",
      "PHPerKaigi2024にて登壇(LTセッション)",
    ],
    skills: ["React", "Vue", "Laravel", "AWS", "Docker", "MySQL"]
  },
  {
    id: "2",
    type: "work",
    title: "エンジニア",
    organization: "株式会社システムシェアード",
    period: "2020年8月 - 2022年8月",
    description: [
      "生命保険会社のシミュレーションサイトのバックエンド開発",
      "携帯ショップの受付発見システムのフロントエンド開発",
    ],
    achievements: [
      "開発実務未経験ながら短期間での資格取得の姿勢を評価され、大手金融機関の開発業務にアサイン",
    ],
    skills: ["React", "Vue", "Laravel", "AWS"]
  },
  {
    id: "3",
    type: "work",
    title: "不動産賃貸仲介営業",
    organization: "株式会社ケン・コーポレーション",
    period: "2016年4月 - 2019年7月",
    description: [
      "都内高級賃貸住宅の仲介営業",
      "顧客要望から物件提案・案内・契約手続き・アフターフォローまでを担当",
      "1組ごとの「なぜ借りたいか」に視点をあてた接客を実施",
    ],
    achievements: [
      "医者、弁護士、スポーツ選手、社長などからの信頼を得ることができ、リピートや紹介を獲得",
    ],
    skills: ["顧客対応", "交渉", "契約"]
  },
  {
    id: "4",
    type: "education",
    title: "法学部法律学科 学士",
    organization: "成蹊大学",
    period: "2012年4月 - 2016年3月",
    description: [
      "会社法と商法を中心に学習",
      "2年次は起業家体験プログラムに参加し、株式会社の一生を体験",
      "3・4年次は会社法、商法の判例を元に大学対抗でのディベートに参加",
    ],
    achievements: [
      "体育会卓球部に所属し、3年次からはレギュラーとして関東学生卓球リーグ4部の優勝に貢献"
    ],
    skills: ["法律知識", "ディベート", "論理的思考"]
  }
];

const strengthsData: Strength[] = [
  {
    id: "1",
    title: "継続的学習",
    description: "常に何かを学習していないと気が済まない性格です。",
    icon: <Zap className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    examples: [
      "不動産業界からの転職時は、スクールで1日10時間以上の学習を2ヶ月半継続し、ブログでのアウトプットも80日連続で行いました。",
      "不動産業界時代から業務に必要な資格以外も取得しており、足りない知識を補い続けてきました。",
    ]
  },
  {
    id: "2",
    title: "素直さ",
    description: "いただいたアドバイスは「まずやってみる」を実践しています。",
    icon: <Users className="w-6 h-6" />,
    color: "from-blue-500 to-purple-500",
    examples: [
      "この本良いよと教えてもらってから購入するまでに1分かかりません。",
    ]
  },
  {
    id: "3",
    title: "胆力",
    description: "1度でも経験してしまえばハードルが下がるので、まずは自分で経験してみることを大切にしています。",
    icon: <Target className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    examples: [
      "2年前に「当たり前の基準を高めよう」というテーマをLT会で発表した際に、当時は最長15kmまでしか走った経験がなかったですがその場でフルマラソンに申し込んだことがきっかけで、今では42kmでも抵抗がなくなりました。",
    ]
  },
  {
    id: "4",
    title: "文章力",
    description: "多くの活字を読んでいることで、表現力豊かな文章に自信があります。",
    icon: <Book className="w-6 h-6" />,
    color: "from-emerald-500 to-teal-500",
    examples: [
      "ブログ執筆が全く苦ではなく、会社で運営しているテックブログで社内1位のビュー数を獲得しました。",
      "誤字脱字は見逃すことができない性格です。",
    ]
  },
];

const interestsData: Interest[] = [
  {
    id: "1",
    title: "読書",
    description: "自分の世界を広げてくれるので、月2〜3冊読んでNotionにまとめています。",
    icon: <Book className="w-8 h-8" />
  },
  {
    id: "2",
    title: "セキュリティ",
    description: "情報処理安全確保支援士に挑戦中(後4点で落ちたので、午後試験対策を強化中です)。セキュリティを理解するには膨大な知識が必要ですが、ハードルが高いからこそ挑戦しがいがあります。",
    icon: <Wine className="w-8 h-8" />
  },
  {
    id: "3",
    title: "フルマラソン",
    description: "サブスリー(3時間以内にゴールすること)を目標に年2〜3回フルマラソンに挑戦しています。努力は必ずしも報われないが、努力しないと絶対に目標を達成できないことを実感でき、継続することの大切さを日々痛感しています。",
    icon: <Activity className="w-8 h-8" />
  },
  {
    id: "4",
    title: "鹿島アントラーズ",
    description: "「すべては勝利のために」「献身・誠実・尊重」のクラブ精神を体現する選手・スタッフから多くのことを学び、時にゴール裏で激しく応援しています。",
    icon: <Trophy className="w-8 h-8" />
  },
  {
    id: "5",
    title: "お酒",
    description: "日本酒やクラフトビールを好みます。最近はウイスキーにも挑戦中です。",
    icon: <Wine className="w-8 h-8" />
  },
];

const certificationsData: Certification[] = [
  {
    id: "1",
    name: "応用情報技術者",
    issuer: "独立行政法人 情報処理推進機構（IPA）",
    date: "2024年12月26日",
    description: "情報処理技術分野の国家資格"
  },
  {
    id: "2",
    name: "2級 ファイナンシャル・プランニング技能士",
    issuer: "日本FP協会",
    date: "2018年10月22日",
    description: "ファイナンシャルプランニングに関する国家資格"
  },
  {
    id: "3",
    name: "3級 ファイナンシャル・プランニング技能士",
    issuer: "日本FP協会",
    date: "2018年6月29日",
    description: "ファイナンシャルプランニングに関する国家資格"
  },
  {
    id: "4",
    name: "宅地建物取引士",
    issuer: "国土交通省",
    date: "2016年11月30日",
    description: "不動産取引業務に関する国家資格"
  },
  {
    id: "5",
    name: "普通自動車第一種運転免許（AT限定）",
    issuer: "公安委員会",
    date: "2015年2月3日",
    description: "自動車運転に関する国家資格"
  },
  {
    id: "6",
    name: "CompTIA Security+",
    issuer: "CompTIA",
    date: "2021年10月31日",
    description: "情報セキュリティに関する国際認定資格",
    expired: true
  },
  {
    id: "7",
    name: "CompTIA Project+",
    issuer: "CompTIA",
    date: "2021年2月27日",
    description: "プロジェクト管理に関する国際認定資格",
    expired: true
  },
  {
    id: "8",
    name: "AWS Certified Solutions Architect - Associate",
    issuer: "Amazon Web Services",
    date: "2021年1月31日",
    description: "AWSクラウドアーキテクチャの設計と実装に関する認定資格",
    expired: true
  },
  {
    id: "9",
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2020年12月6日",
    description: "AWS クラウドの基礎知識に関する認定資格",
    expired: true
  },
  {
    id: "10",
    name: "Java SE 8 認定資格 OCJ-P Silver SE 8",
    issuer: "Oracle",
    date: "2020年8月23日",
    description: "Java言語のプログラミング知識に関する認定資格",
    expired: true
  },
];

const speakingHistoryData: SpeakingHistory[] = [
  {
    id: "1",
    title: "実演！CSVダウンロードパフォーマンス改善",
    event: "PHPerKaigi 2025",
    videoUrl: "https://www.youtube.com/embed/u0TJg42B37E?si=rq1e3Enk1bI4q4Hq"
  },
  {
    id: "2", 
    title: "障害率が圧倒的に高い、テストコードが存在しないプロダクトへの導入戦略",
    event: "PHPerKaigi 2024",
    videoUrl: "https://www.youtube.com/embed/34cYJ5QM1FM?si=FEcoG5-z0J856erg"
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
            価値観や人となりをご紹介します。
          </p>
        </div>

        {/* Main Content - 2 Column Layout */}
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          
          {/* Left Column - Profile & Introduction */}
          <div className="space-y-12">
            {/* Timeline */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center lg:text-left">経歴タイムライン</h3>
              <Timeline items={timelineData} />
            </div>

            {/* Speaking History Section */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-center">登壇歴</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {speakingHistoryData.map((talk, index) => (
                  <Card 
                    key={talk.id}
                    className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20 border-2 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-4">
                      <CardTitle className="text-lg mb-2">{talk.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{talk.event}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="aspect-video w-full">
                        <iframe
                          width="100%"
                          height="100%"
                          src={talk.videoUrl}
                          title={talk.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="rounded-lg"
                        />
                      </div>
                      {talk.description && (
                        <p className="text-sm text-muted-foreground mt-4">{talk.description}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Detailed Introduction */}
            <Card className="bg-gradient-to-br from-background to-muted/20 border-2">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6">自己紹介</h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    継続力に自信があり、毎月100km以上のランニング(12ヶ月連続継続中)や、毎年春秋にあるIPA高度資格試験学習を通した体系的な知識獲得を進めています。
                  </p>
                  <p>
                    また、目標の達成のために「あえてやらない」ことも大切にし、17年続けた卓球をお休みしてマラソンの練習に集中しています。
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

          {/* Right Column - Empty for now, could be used for other content later */}
          <div>
          </div>
        </div>
      </div>
    </section>
  );
}
