"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProjectFilterProps {
  categories: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  projectCounts: Record<string, number>;
}

export function ProjectFilter({ 
  categories, 
  activeFilter, 
  onFilterChange, 
  projectCounts 
}: ProjectFilterProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFilterChange = (filter: string) => {
    if (filter === activeFilter) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      onFilterChange(filter);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      <Button
        variant={activeFilter === "all" ? "default" : "outline"}
        onClick={() => handleFilterChange("all")}
        className="relative overflow-hidden transition-all duration-300 hover:scale-105"
        disabled={isAnimating}
      >
        <span className="flex items-center gap-2">
          すべて
          <Badge 
            variant="secondary" 
            className="bg-background/20 text-current text-xs min-w-[1.5rem] justify-center"
          >
            {Object.values(projectCounts).reduce((sum, count) => sum + count, 0)}
          </Badge>
        </span>
      </Button>
      
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeFilter === category ? "default" : "outline"}
          onClick={() => handleFilterChange(category)}
          className="relative overflow-hidden transition-all duration-300 hover:scale-105"
          disabled={isAnimating}
        >
          <span className="flex items-center gap-2">
            {category}
            <Badge 
              variant="secondary" 
              className="bg-background/20 text-current text-xs min-w-[1.5rem] justify-center"
            >
              {projectCounts[category] || 0}
            </Badge>
          </span>
        </Button>
      ))}
    </div>
  );
}