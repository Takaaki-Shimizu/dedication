"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
// Icons will be passed as props from parent component

export interface Strength {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

export interface Interest {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  description?: string;
  credentialId?: string;
  expired?: boolean;
}

export interface SpeakingHistory {
  id: string;
  title: string;
  event: string;
  videoUrl: string;
  description?: string;
}

interface StrengthsGridProps {
  strengths: Strength[];
  interests: Interest[];
  certifications: Certification[];
  speakingHistory: SpeakingHistory[];
}

export function StrengthsGrid({ strengths, interests, certifications, speakingHistory }: StrengthsGridProps) {
  const [showExpiredCerts, setShowExpiredCerts] = useState(false);

  // 資格を有効と期限切れに分ける
  const activeCertifications = certifications.filter(cert => !cert.expired);
  const expiredCertifications = certifications.filter(cert => cert.expired);

  return (
    <div className="space-y-12">
      {/* Strengths Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">強み・特徴</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {strengths.map((strength, index) => (
            <Card 
              key={strength.id}
              className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-background to-muted/20 border-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 bg-gradient-to-r ${strength.color} rounded-xl flex items-center justify-center text-white`}>
                    {strength.icon}
                  </div>
                  <CardTitle className="text-lg">{strength.title}</CardTitle>
                </div>
                <CardDescription className="text-base leading-relaxed">
                  {strength.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <h4 className="font-semibold text-sm text-muted-foreground">具体例</h4>
                  {strength.examples.map((example, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      • {example}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Speaking History Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">登壇歴</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {speakingHistory.map((talk, index) => (
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

      {/* Interests Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">趣味・興味</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, index) => (
            <Card 
              key={interest.id}
              className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-2">
                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center text-primary">
                  {interest.icon}
                </div>
                <CardTitle className="text-lg">{interest.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {interest.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Certifications Section */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">資格</h3>
        
        {/* 有効な資格 */}
        <div className="space-y-4 mb-6">
          {activeCertifications.map((cert, index) => (
            <Card 
              key={cert.id}
              className="hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{cert.name}</h4>
                    <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                    {cert.description && (
                      <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                    )}
                    {cert.credentialId && (
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          認証ID: {cert.credentialId}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <Badge className="bg-primary/10 text-primary">
                      {cert.date}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 期限切れ資格セクション */}
        {expiredCertifications.length > 0 && (
          <div>
            <div className="flex items-center justify-center mb-4">
              <Button
                variant="outline"
                onClick={() => setShowExpiredCerts(!showExpiredCerts)}
                className="flex items-center gap-2 border-2 hover:border-muted-foreground"
              >
                期限切れ資格を{showExpiredCerts ? '隠す' : '表示'}
                {showExpiredCerts ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>
            </div>

            {showExpiredCerts && (
              <div className="space-y-4 animate-fade-in-up">
                {expiredCertifications.map((cert, index) => (
                  <Card 
                    key={cert.id}
                    className="hover:shadow-lg transition-all duration-300 opacity-75 border-dashed"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-lg text-muted-foreground">{cert.name}</h4>
                            <Badge variant="destructive" className="text-xs">
                              期限切れ
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                          {cert.description && (
                            <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                          )}
                          {cert.credentialId && (
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs opacity-60">
                                認証ID: {cert.credentialId}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="opacity-60">
                            {cert.date}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
