import React from "react"
import { Progress } from "@/components/ui/progress"
import { CuteCard, CuteCardContent, CuteCardHeader, CuteCardTitle } from "@/components/ui/cute-card"
import { MascotDisplay } from "@/components/mascot-display"
import { SpeechBubble } from "@/components/ui/speech-bubble"
import { BudgetSummary } from "@/types/budget"
import { getBudgetMood, formatCurrency } from "@/utils/budget-calculations"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface BudgetDashboardProps {
  summary: BudgetSummary
  trend: "increasing" | "decreasing" | "stable"
}

export function BudgetDashboard({ summary, trend }: BudgetDashboardProps) {
  const mood = getBudgetMood(summary)
  
  const getTrendIcon = () => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-warning" />
      case "decreasing": 
        return <TrendingDown className="w-4 h-4 text-success" />
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getTrendMessage = () => {
    switch (trend) {
      case "increasing":
        return "Spending is trending up"
      case "decreasing":
        return "Great! Spending is going down"
      default:
        return "Spending is steady"
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Budget Card */}
      <CuteCard variant="gradient" className="overflow-hidden">
        <CuteCardHeader className="pb-2">
          <CuteCardTitle className="text-center">Monthly Budget</CuteCardTitle>
        </CuteCardHeader>
        <CuteCardContent className="space-y-6">
          {/* Mascot and Speech Bubble */}
          <div className="flex flex-col items-center space-y-4">
            <MascotDisplay type={mood.mascot} size="xl" />
            <SpeechBubble variant={mood.variant} position="center">
              {mood.message}
            </SpeechBubble>
          </div>

          {/* Budget Progress */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-muted-foreground">Progress</span>
              <span className="text-sm font-bold">
                {summary.percentageUsed.toFixed(0)}%
              </span>
            </div>
            <Progress 
              value={summary.percentageUsed} 
              className="h-3"
              indicatorClassName={`transition-all duration-500 ${
                summary.isOverBudget 
                  ? "bg-destructive" 
                  : summary.percentageUsed >= 80 
                  ? "bg-warning" 
                  : "bg-gradient-primary"
              }`}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹0</span>
              <span>{formatCurrency(summary.budgetLimit)}</span>
            </div>
          </div>

          {/* Budget Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(summary.totalSpent)}
              </div>
              <div className="text-xs text-muted-foreground">Spent</div>
            </div>
            <div className="text-center p-3 bg-muted/50 rounded-lg">
              <div className={`text-2xl font-bold ${
                summary.remainingBudget >= 0 ? "text-success" : "text-destructive"
              }`}>
                {formatCurrency(Math.abs(summary.remainingBudget))}
              </div>
              <div className="text-xs text-muted-foreground">
                {summary.remainingBudget >= 0 ? "Remaining" : "Over Budget"}
              </div>
            </div>
          </div>

          {/* Spending Trend */}
          <div className="flex items-center justify-center space-x-2 p-2 bg-muted/30 rounded-lg">
            {getTrendIcon()}
            <span className="text-sm text-muted-foreground">
              {getTrendMessage()}
            </span>
          </div>
        </CuteCardContent>
      </CuteCard>
    </div>
  )
}