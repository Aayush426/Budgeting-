import { Expense, Budget, BudgetSummary } from "@/types/budget"

export function calculateBudgetSummary(
  expenses: Expense[], 
  budget: Budget | null
): BudgetSummary {
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  // Filter expenses for current month
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date)
    return expenseDate.getMonth() === currentMonth && 
           expenseDate.getFullYear() === currentYear
  })

  const totalSpent = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const budgetLimit = budget?.monthlyLimit || 0
  const remainingBudget = budgetLimit - totalSpent
  const percentageUsed = budgetLimit > 0 ? (totalSpent / budgetLimit) * 100 : 0
  const isOverBudget = totalSpent > budgetLimit && budgetLimit > 0

  return {
    totalSpent,
    budgetLimit,
    remainingBudget,
    percentageUsed: Math.min(percentageUsed, 100),
    isOverBudget
  }
}

export function getBudgetMood(summary: BudgetSummary): {
  mascot: "bunny" | "bear" | "fox" | "cat"
  message: string
  variant: "bunny" | "bear" | "fox" | "cat"
} {
  const { percentageUsed, isOverBudget, remainingBudget } = summary

  if (isOverBudget) {
    return {
      mascot: "cat",
      message: "Oops! Spending went a bit wild this month 🙈",
      variant: "cat"
    }
  }

  if (percentageUsed >= 80) {
    return {
      mascot: "bear", 
      message: "Almost at your limit! Let's be careful now 🐻",
      variant: "bear"
    }
  }

  if (percentageUsed >= 50) {
    return {
      mascot: "bunny",
      message: "Great progress! You're staying on track 🌟",
      variant: "bunny"
    }
  }

  return {
    mascot: "fox",
    message: `Amazing! You have ₹${remainingBudget.toFixed(0)} left to enjoy! 🎉`,
    variant: "fox"
  }
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export function getSpendingTrend(expenses: Expense[]): "increasing" | "decreasing" | "stable" {
  if (expenses.length < 7) return "stable"
  
  const lastWeek = expenses.slice(0, 7)
  const previousWeek = expenses.slice(7, 14)
  
  const lastWeekTotal = lastWeek.reduce((sum, expense) => sum + expense.amount, 0)
  const previousWeekTotal = previousWeek.reduce((sum, expense) => sum + expense.amount, 0)
  
  const difference = lastWeekTotal - previousWeekTotal
  const threshold = previousWeekTotal * 0.1 // 10% threshold
  
  if (difference > threshold) return "increasing"
  if (difference < -threshold) return "decreasing"
  return "stable"
}