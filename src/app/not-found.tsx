import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Mail } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-emerald-500/5"></div>
      
      <Card className="w-full max-w-2xl relative z-10 border-2 shadow-2xl">
        <CardContent className="p-8 md:p-12 text-center">
          {/* 404 Large Text */}
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
              404
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
          </div>

          {/* Error Message */}
          <div className="mb-8 space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              ページが見つかりません
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md mx-auto">
              申し訳ございません。お探しのページは移動または削除された可能性があります。
            </p>
          </div>

          {/* Navigation Options */}
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold">
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  ホームに戻る
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 font-semibold">
                <Link href="javascript:history.back()">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  前のページに戻る
                </Link>
              </Button>
            </div>

            {/* Quick Navigation */}
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-4">よく訪問されるページ</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#about">経歴・プロフィール</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#skills">技術スタック</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#projects">プロジェクト</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <Link href="/#contact">お問い合わせ</Link>
                </Button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="pt-6 border-t">
              <p className="text-sm text-muted-foreground mb-3">
                問題が解決しない場合は、お気軽にお問い合わせください
              </p>
              <Button asChild variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                <Link href="mailto:57.shimizu.takaaki@gmail.com">
                  <Mail className="mr-2 h-4 w-4" />
                  57.shimizu.takaaki@gmail.com
                </Link>
              </Button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-emerald-400/20 rounded-full blur-xl"></div>
        </CardContent>
      </Card>
    </div>
  );
}