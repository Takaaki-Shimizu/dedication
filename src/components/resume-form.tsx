"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, Download, Save, FileText } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { pdf } from "@react-pdf/renderer";
import { ResumePDFTemplate } from "./resume-pdf-template";

const personalInfoSchema = z.object({
  name: z.string().min(1, "氏名は必須です"),
  nameKana: z.string().min(1, "フリガナは必須です"),
  birthDate: z.string().min(1, "生年月日は必須です"),
  gender: z.enum(['male', 'female', '']).optional(),
  address: z.string().min(1, "住所は必須です"),
  phone: z.string().min(1, "電話番号は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
});

const educationSchema = z.object({
  id: z.string(),
  date: z.string().min(1, "年月は必須です"),
  institution: z.string().min(1, "学校名は必須です"),
  department: z.string().optional(),
  status: z.enum(['graduated', 'enrolled', 'dropped_out']),
});

const workExperienceSchema = z.object({
  id: z.string(),
  startDate: z.string().min(1, "開始年月は必須です"),
  endDate: z.string().optional(),
  company: z.string().min(1, "会社名は必須です"),
  position: z.string().min(1, "職種は必須です"),
  description: z.string().optional(),
  status: z.enum(['current', 'resigned']),
});

const qualificationSchema = z.object({
  id: z.string(),
  date: z.string().min(1, "取得年月は必須です"),
  name: z.string().min(1, "資格名は必須です"),
  organization: z.string().optional(),
});

const resumeFormSchema = z.object({
  personalInfo: personalInfoSchema,
  education: z.array(educationSchema),
  workExperience: z.array(workExperienceSchema),
  qualifications: z.array(qualificationSchema),
  motivation: z.string().max(1000, "志望動機は1000文字以内で入力してください"),
  selfPR: z.string().max(1000, "自己PRは1000文字以内で入力してください"),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

const STORAGE_KEY = 'resume-data';

export function ResumeForm() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastSaved, setLastSaved] = useState<string>('');

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      personalInfo: {
        name: '',
        nameKana: '',
        birthDate: '',
        gender: '',
        address: '',
        phone: '',
        email: '',
      },
      education: [],
      workExperience: [],
      qualifications: [],
      motivation: '',
      selfPR: '',
    },
  });

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: workFields,
    append: appendWork,
    remove: removeWork,
  } = useFieldArray({
    control: form.control,
    name: "workExperience",
  });

  const {
    fields: qualificationFields,
    append: appendQualification,
    remove: removeQualification,
  } = useFieldArray({
    control: form.control,
    name: "qualifications",
  });

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData: ResumeData = JSON.parse(savedData);
        form.reset({
          personalInfo: parsedData.personalInfo,
          education: parsedData.education,
          workExperience: parsedData.workExperience,
          qualifications: parsedData.qualifications,
          motivation: parsedData.motivation,
          selfPR: parsedData.selfPR,
        });
        setLastSaved(new Date(parsedData.updatedAt).toLocaleString('ja-JP'));
      } catch (error) {
        console.error('Failed to load saved resume data:', error);
      }
    }
  }, [form]);

  const saveToLocalStorage = (data: ResumeFormValues) => {
    const resumeData: ResumeData = {
      personalInfo: {
        ...data.personalInfo,
        gender: data.personalInfo.gender || '',
      },
      education: data.education,
      workExperience: data.workExperience.map(work => ({
        ...work,
        description: work.description || '',
      })),
      qualifications: data.qualifications,
      motivation: data.motivation,
      selfPR: data.selfPR,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    setLastSaved(new Date().toLocaleString('ja-JP'));
  };

  const handleSave = () => {
    const currentData = form.getValues();
    saveToLocalStorage(currentData);
  };

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      const formData = form.getValues();
      const resumeData: ResumeData = {
        personalInfo: {
          ...formData.personalInfo,
          gender: formData.personalInfo.gender || '',
        },
        education: formData.education,
        workExperience: formData.workExperience.map(work => ({
          ...work,
          description: work.description || '',
        })),
        qualifications: formData.qualifications,
        motivation: formData.motivation,
        selfPR: formData.selfPR,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveToLocalStorage(formData);

      const blob = await pdf(<ResumePDFTemplate data={resumeData} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `履歴書_${resumeData.personalInfo.name || '未入力'}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const addEducation = () => {
    appendEducation({
      id: Date.now().toString(),
      date: '',
      institution: '',
      department: '',
      status: 'graduated',
    });
  };

  const addWork = () => {
    appendWork({
      id: Date.now().toString(),
      startDate: '',
      endDate: '',
      company: '',
      position: '',
      description: '',
      status: 'resigned',
    });
  };

  const addQualification = () => {
    appendQualification({
      id: Date.now().toString(),
      date: '',
      name: '',
      organization: '',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Card className="bg-gradient-to-br from-background to-muted/20 border-2 shadow-xl">
        <CardHeader className="text-center pb-6">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl md:text-3xl">履歴書作成</CardTitle>
          <CardDescription className="text-lg">
            日本の標準的な履歴書フォーマットでPDFを生成できます
          </CardDescription>
          {lastSaved && (
            <p className="text-sm text-muted-foreground">
              最終保存: {lastSaved}
            </p>
          )}
        </CardHeader>

        <CardContent className="space-y-8">
          <Form {...form}>
            <form className="space-y-8">
              {/* Personal Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">個人情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>氏名 <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="山田 太郎" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalInfo.nameKana"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>フリガナ <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="ヤマダ タロウ" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.birthDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>生年月日 <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalInfo.gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>性別</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="選択してください" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="male">男性</SelectItem>
                              <SelectItem value="female">女性</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="personalInfo.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>住所 <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Input placeholder="〒000-0000 東京都..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>電話番号 <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input placeholder="090-0000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="personalInfo.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>メールアドレス <span className="text-red-500">*</span></FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="example@email.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Education */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">学歴</CardTitle>
                    <Button type="button" onClick={addEducation} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      追加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {educationFields.map((field, index) => (
                    <Card key={field.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold">学歴 {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeEducation(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`education.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>年月</FormLabel>
                              <FormControl>
                                <Input placeholder="2020年4月" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>学校名</FormLabel>
                              <FormControl>
                                <Input placeholder="○○大学" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`education.${index}.status`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>状況</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="graduated">卒業</SelectItem>
                                  <SelectItem value="enrolled">在学中</SelectItem>
                                  <SelectItem value="dropped_out">中退</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`education.${index}.department`}
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>学部・学科</FormLabel>
                            <FormControl>
                              <Input placeholder="工学部 情報工学科" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Work Experience */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">職歴</CardTitle>
                    <Button type="button" onClick={addWork} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      追加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {workFields.map((field, index) => (
                    <Card key={field.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold">職歴 {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeWork(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`workExperience.${index}.startDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>開始年月</FormLabel>
                              <FormControl>
                                <Input placeholder="2020年4月" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`workExperience.${index}.endDate`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>終了年月</FormLabel>
                              <FormControl>
                                <Input placeholder="2023年3月" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <FormField
                          control={form.control}
                          name={`workExperience.${index}.company`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>会社名</FormLabel>
                              <FormControl>
                                <Input placeholder="株式会社○○" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`workExperience.${index}.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>職種</FormLabel>
                              <FormControl>
                                <Input placeholder="エンジニア" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name={`workExperience.${index}.description`}
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>業務内容</FormLabel>
                            <FormControl>
                              <Textarea placeholder="担当業務の詳細..." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`workExperience.${index}.status`}
                        render={({ field }) => (
                          <FormItem className="mt-4">
                            <FormLabel>状況</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="current">在職中</SelectItem>
                                <SelectItem value="resigned">退職</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Qualifications */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-xl">資格・免許</CardTitle>
                    <Button type="button" onClick={addQualification} variant="outline" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      追加
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {qualificationFields.map((field, index) => (
                    <Card key={field.id} className="p-4">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-semibold">資格 {index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeQualification(index)}
                          variant="ghost"
                          size="sm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`qualifications.${index}.date`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>取得年月</FormLabel>
                              <FormControl>
                                <Input placeholder="2020年4月" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`qualifications.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>資格名</FormLabel>
                              <FormControl>
                                <Input placeholder="基本情報技術者試験" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`qualifications.${index}.organization`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>発行機関</FormLabel>
                              <FormControl>
                                <Input placeholder="IPA" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </Card>
                  ))}
                </CardContent>
              </Card>

              {/* Motivation and Self PR */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">志望動機</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="志望動機をご記入ください..."
                              className="min-h-[120px] resize-none"
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
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">自己PR</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="selfPR"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="自己PRをご記入ください..."
                              className="min-h-[120px] resize-none"
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
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  onClick={handleSave}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <Save className="w-5 h-5 mr-2" />
                  保存
                </Button>
                <Button
                  type="button"
                  onClick={generatePDF}
                  disabled={isGenerating}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      生成中...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5 mr-2" />
                      PDFダウンロード
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
