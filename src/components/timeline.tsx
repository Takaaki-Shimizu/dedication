"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Building, GraduationCap, Award } from "lucide-react";
import { useState } from "react";

export interface TimelineItem {
  id: string;
  type: "education" | "work" | "certification";
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string[];
  skills?: string[];
  achievements?: string[];
  current?: boolean;
}

interface TimelineProps {
  items: TimelineItem[];
}

const getTypeIcon = (type: TimelineItem["type"]) => {
  switch (type) {
    case "education":
      return <GraduationCap className="w-5 h-5" />;
    case "work":
      return <Building className="w-5 h-5" />;
    case "certification":
      return <Award className="w-5 h-5" />;
    default:
      return <CalendarDays className="w-5 h-5" />;
  }
};

const getTypeColor = (type: TimelineItem["type"]) => {
  switch (type) {
    case "education":
      return "from-blue-500 to-indigo-500";
    case "work":
      return "from-emerald-500 to-teal-500";
    case "certification":
      return "from-purple-500 to-pink-500";
    default:
      return "from-gray-500 to-gray-600";
  }
};

export function Timeline({ items }: TimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"></div>
      
      <div className="space-y-8">
        {items.map((item) => {
          const isExpanded = expandedItems.has(item.id);
          
          return (
            <div key={item.id} className="relative flex items-start gap-6">
              {/* Timeline Icon */}
              <div className={`
                relative z-10 flex items-center justify-center w-16 h-16 
                bg-gradient-to-br ${getTypeColor(item.type)} 
                rounded-full shadow-lg text-white
                ${item.current ? 'ring-4 ring-primary/20 animate-pulse' : ''}
              `}>
                {getTypeIcon(item.type)}
              </div>

              {/* Timeline Content */}
              <div className="flex-1 pb-8">
                <Card 
                  className={`
                    hover:shadow-xl transition-all duration-300 cursor-pointer
                    ${isExpanded ? 'shadow-lg scale-[1.02]' : ''}
                    ${item.current ? 'ring-2 ring-primary/20 bg-gradient-to-br from-background to-primary/5' : ''}
                  `}
                  onClick={() => toggleExpanded(item.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {item.title}
                          {item.current && (
                            <Badge className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs">
                              現在
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription className="text-base font-medium text-foreground/80">
                          {item.organization}
                        </CardDescription>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="w-4 h-4" />
                        {item.period}
                      </div>
                      {item.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {item.location}
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Description */}
                    <div className="space-y-2 mb-4">
                      {item.description.map((desc, idx) => (
                        <p key={idx} className="text-sm leading-relaxed text-muted-foreground">
                          • {desc}
                        </p>
                      ))}
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="space-y-4 animate-fade-in-up">
                        {item.achievements && item.achievements.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 text-foreground/90">主な成果</h4>
                            <div className="space-y-1">
                              {item.achievements.map((achievement, idx) => (
                                <p key={idx} className="text-sm text-muted-foreground">
                                  ✓ {achievement}
                                </p>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.skills && item.skills.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-sm mb-2 text-foreground/90">関連技術・スキル</h4>
                            <div className="flex flex-wrap gap-2">
                              {item.skills.map((skill) => (
                                <Badge key={skill} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Expand Indicator */}
                    <div className="flex justify-center mt-4">
                      <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                        {isExpanded ? '詳細を隠す ▲' : '詳細を見る ▼'}
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}