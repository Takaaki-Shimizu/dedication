"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// バリデーションスキーマ
const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "お名前は必須です")
    .min(2, "お名前は2文字以上で入力してください")
    .max(50, "お名前は50文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("有効なメールアドレスを入力してください"),
  subject: z
    .string()
    .max(100, "件名は100文字以内で入力してください")
    .optional(),
  message: z
    .string()
    .min(1, "メッセージは必須です")
    .min(10, "メッセージは10文字以上で入力してください")
    .max(1000, "メッセージは1000文字以内で入力してください"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setFormState("sending");
    setStatusMessage("");

    try {
      // 実際の送信処理はここに実装
      // 現在はシミュレーション
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // ランダムに成功/失敗をシミュレート（実際の実装では削除）
      const isSuccess = Math.random() > 0.3;
      
      if (isSuccess) {
        setFormState("success");
        setStatusMessage("お問い合わせありがとうございます。24時間以内にご返信いたします。");
        form.reset();
      } else {
        throw new Error("送信に失敗しました");
      }
    } catch (error) {
      setFormState("error");
      setStatusMessage("送信に失敗しました。しばらく時間をおいて再度お試しください。");
    }
  };

  const resetForm = () => {
    setFormState("idle");
    setStatusMessage("");
    form.reset();
  };

  const getStatusIcon = () => {
    switch (formState) {
      case "sending":
        return <Loader2 className="w-5 h-5 animate-spin" />;
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Send className="w-5 h-5" />;
    }
  };

  const getStatusColor = () => {
    switch (formState) {
      case "success":
        return "text-green-600 bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800";
      case "error":
        return "text-red-600 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800";
      default:
        return "text-blue-600 bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800";
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-background to-muted/20 border-2 shadow-xl">
      <CardHeader className="text-center pb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-white" />
        </div>
        <CardTitle className="text-2xl md:text-3xl">お問い合わせ</CardTitle>
        <CardDescription className="text-lg">
          お仕事のご相談、技術に関するご質問など、お気軽にお問い合わせください
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* ステータスメッセージ */}
        {statusMessage && (
          <div className={`p-4 rounded-lg border text-sm ${getStatusColor()}`}>
            <div className="flex items-center gap-2">
              {getStatusIcon()}
              <span>{statusMessage}</span>
            </div>
            {formState === "success" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="mt-2 h-auto p-1 text-xs hover:bg-transparent"
              >
                新しいメッセージを送信
              </Button>
            )}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* 名前フィールド */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    お名前 <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="山田 太郎"
                      className="h-12 text-base"
                      disabled={formState === "sending"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* メールアドレスフィールド */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    メールアドレス <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      className="h-12 text-base"
                      disabled={formState === "sending"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    ご返信用のメールアドレスをご入力ください
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 件名フィールド */}
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">件名</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="お仕事のご相談について"
                      className="h-12 text-base"
                      disabled={formState === "sending"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* メッセージフィールド */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    メッセージ <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="お問い合わせ内容をご記入ください..."
                      className="min-h-[120px] text-base resize-none"
                      disabled={formState === "sending"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value.length}/1000文字
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 送信ボタン */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={formState === "sending"}
                className="flex-1 h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-base font-semibold"
              >
                {formState === "sending" ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    送信中...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    送信する
                  </>
                )}
              </Button>

              {(formState === "error" || form.formState.isDirty) && formState !== "sending" && (
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={resetForm}
                  className="h-12 text-base font-semibold"
                >
                  リセット
                </Button>
              )}
            </div>
          </form>
        </Form>

        {/* 追加情報 */}
        <div className="pt-6 border-t">
          <div className="text-sm text-muted-foreground text-center space-y-2">
            <p>
              <strong>返信時間:</strong> 通常24時間以内にご返信いたします
            </p>
            <p>
              <strong>緊急のご連絡:</strong> takaki.shimizu@example.com まで直接メールをお送りください
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}