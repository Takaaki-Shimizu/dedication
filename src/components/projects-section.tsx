"use client";

import { useState, useMemo } from "react";
import { ProjectCard, type Project } from "./project-card";
import { ProjectFilter } from "./project-filter";

const sampleProjects: Project[] = [
  {
    id: "1",
    title: "WIP",
    category: "WIP",
    description: "WIP",
    fullDescription: "WIP",
    technologies: ["WIP"],
    image: "WIP",
    githubUrl: "https://github.com/Takaaki-Shimizu/WIP",
    liveUrl: "https://WIP",
    detailUrl: "/WIP",
    date: "XXXX年月",
    status: "completed"
  },
  {
    id: "2",
    title: "WIP",
    category: "WIP",
    description: "WIP",
    fullDescription: "WIP",
    technologies: ["WIP"],
    image: "WIP",
    githubUrl: "https://github.com/Takaaki-Shimizu/WIP",
    liveUrl: "https://WIP",
    detailUrl: "/WIP",
    date: "XXXX年月",
    status: "completed"
  },
  {
    id: "3",
    title: "WIP",
    category: "WIP",
    description: "WIP",
    fullDescription: "WIP",
    technologies: ["WIP"],
    image: "WIP",
    githubUrl: "https://github.com/Takaaki-Shimizu/WIP",
    liveUrl: "https://WIP",
    detailUrl: "/WIP",
    date: "XXXX年月",
    status: "completed"
  },
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
            WIP
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