import React from "react"
import { cn } from "@/lib/utils"

export interface CategoryBadgeProps {
  category: string
  className?: string
}

const colorMap: Record<string, string> = {
  football: "bg-brand-red text-white",
  tennis: "bg-blue-600 text-white",
  basketball: "bg-orange-500 text-white",
  f1: "bg-purple-600 text-white",
  cricket: "bg-emerald-600 text-white",
  golf: "bg-teal-600 text-white",
  rugby: "bg-cyan-600 text-white"
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className }) => {
  const normCat = category.toLowerCase()
  const badgeColor = colorMap[normCat] || "bg-neutral-700 text-white"

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] md:text-xs font-bold uppercase tracking-wider",
        badgeColor,
        className
      )}
    >
      {category}
    </span>
  )
}

export default CategoryBadge
