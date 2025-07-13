export interface Expense {
  id: string
  name: string
  amount: number
  category: string
  date: string
  description?: string
}

export interface Budget {
  id: string
  monthlyLimit: number
  month: string
  year: number
}

export interface BudgetSummary {
  totalSpent: number
  budgetLimit: number
  remainingBudget: number
  percentageUsed: number
  isOverBudget: boolean
}

export type Category = 
  | "food"
  | "transport" 
  | "entertainment"
  | "shopping"
  | "bills"
  | "health"
  | "education"
  | "other"

export const categoryEmojis: Record<Category, string> = {
  food: "🍕",
  transport: "🚗", 
  entertainment: "🎬",
  shopping: "🛍️",
  bills: "📄",
  health: "🏥",
  education: "📚",
  other: "💫"
}

export const categoryColors: Record<Category, string> = {
  food: "bg-orange-100 text-orange-800 border-orange-200",
  transport: "bg-blue-100 text-blue-800 border-blue-200",
  entertainment: "bg-purple-100 text-purple-800 border-purple-200",
  shopping: "bg-pink-100 text-pink-800 border-pink-200", 
  bills: "bg-gray-100 text-gray-800 border-gray-200",
  health: "bg-green-100 text-green-800 border-green-200",
  education: "bg-yellow-100 text-yellow-800 border-yellow-200",
  other: "bg-indigo-100 text-indigo-800 border-indigo-200"
}