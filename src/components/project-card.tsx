"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Eye, Calendar } from "lucide-react";
import Link from "next/link";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDescription: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  detailUrl?: string;
  date: string;
  status: "completed" | "in-progress" | "maintenance";
}

interface ProjectCardProps {
  project: Project;
  delay?: number;
}

const statusConfig = {
  completed: { label: "完成", color: "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300" },
  "in-progress": { label: "開発中", color: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" },
  maintenance: { label: "運用中", color: "bg-orange-100 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300" }
};

export function ProjectCard({ project, delay = 0 }: ProjectCardProps) {

  return (
    <Card 
      className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-background to-muted/20 border-2 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Project Image */}
      <div className="relative overflow-hidden bg-muted/30 aspect-video">
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
          <div className="text-center text-muted-foreground">
            <Eye className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">プレビュー画像</p>
            <p className="text-xs mt-1 opacity-70">{project.category}</p>
          </div>
        </div>
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          {project.githubUrl && (
            <Button asChild size="sm" variant="secondary" className="backdrop-blur-sm">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                コード
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild size="sm" className="backdrop-blur-sm">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 mr-2" />
                デモ
              </Link>
            </Button>
          )}
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={statusConfig[project.status].color}>
            {statusConfig[project.status].label}
          </Badge>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
            {project.category}
          </Badge>
        </div>
      </div>

      {/* Card Content */}
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-1" />
            {project.date}
          </div>
        </div>
        <CardDescription className="text-base leading-relaxed line-clamp-3">
          {project.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Technology Stack */}
        <div className="mb-4">
          <p className="text-sm font-medium text-muted-foreground mb-2">使用技術</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 6).map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="text-xs px-2 py-1 hover:bg-primary/10 transition-colors"
              >
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 6 && (
              <Badge variant="outline" className="text-xs">
                +{project.technologies.length - 6}
              </Badge>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          {project.detailUrl && (
            <Button asChild variant="default" size="sm" className="flex-1">
              <Link href={project.detailUrl}>
                <Eye className="w-4 h-4 mr-2" />
                詳細を見る
              </Link>
            </Button>
          )}
          {project.githubUrl && (
            <Button asChild variant="outline" size="sm">
              <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {project.liveUrl && (
            <Button asChild variant="outline" size="sm">
              <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}