"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";

interface Skill {
  name: string;
  level: number; // 1-100
  years: number;
  description?: string;
  color?: string;
}

interface SkillCardProps {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  color: string;
  delay?: number;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? 'fill-current text-yellow-500'
              : 'text-muted-foreground/30'
          }`}
        />
      ))}
    </div>
  );
};

export function SkillCard({ title, icon, skills, color, delay = 0 }: SkillCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(new Array(skills.length).fill(0));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Animate progress bars
      skills.forEach((skill, index) => {
        setTimeout(() => {
          setAnimatedLevels(prev => {
            const newLevels = [...prev];
            newLevels[index] = skill.level;
            return newLevels;
          });
        }, index * 200);
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [skills, delay]);

  const getStarRating = (level: number) => {
    return Math.ceil(level / 20); // Convert 0-100 to 1-5 stars
  };

  return (
    <Card 
      className={`h-full hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20 border-2 group ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}
    >
      <CardHeader className="pb-4">
        <CardTitle className="text-xl flex items-center gap-3">
          <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {skills.map((skill, index) => (
          <div key={skill.name} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-sm">{skill.name}</span>
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {skill.years}年
                </Badge>
              </div>
              <StarRating rating={getStarRating(skill.level)} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>習熟度</span>
                <span>{skill.level}%</span>
              </div>
              <Progress 
                value={animatedLevels[index]} 
                className="h-2 bg-muted"
              />
            </div>
            
            {skill.description && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {skill.description}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}