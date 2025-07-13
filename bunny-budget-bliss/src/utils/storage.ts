import { Expense, Budget } from "@/types/budget"

const EXPENSES_KEY = "bunnybudget_expenses"
const BUDGET_KEY = "bunnybudget_budget"

export const storageUtils = {
  // Expenses
  getExpenses(): Expense[] {
    try {
      const data = localStorage.getItem(EXPENSES_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error("Error loading expenses:", error)
      return []
    }
  },

  saveExpenses(expenses: Expense[]): void {
    try {
      localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses))
    } catch (error) {
      console.error("Error saving expenses:", error)
    }
  },

  addExpense(expense: Expense): Expense[] {
    const expenses = this.getExpenses()
    const newExpenses = [expense, ...expenses]
    this.saveExpenses(newExpenses)
    return newExpenses
  },

  deleteExpense(id: string): Expense[] {
    const expenses = this.getExpenses()
    const filtered = expenses.filter(expense => expense.id !== id)
    this.saveExpenses(filtered)
    return filtered
  },

  // Budget
  getBudget(): Budget | null {
    try {
      const data = localStorage.getItem(BUDGET_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error("Error loading budget:", error)
      return null
    }
  },

  saveBudget(budget: Budget): void {
    try {
      localStorage.setItem(BUDGET_KEY, JSON.stringify(budget))
    } catch (error) {
      console.error("Error saving budget:", error)
    }
  },

  // Clear all data
  clearAllData(): void {
    try {
      localStorage.removeItem(EXPENSES_KEY)
      localStorage.removeItem(BUDGET_KEY)
    } catch (error) {
      console.error("Error clearing data:", error)
    }
  }
}