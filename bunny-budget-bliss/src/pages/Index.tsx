import React, { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BudgetDashboard } from "@/components/budget-dashboard"
import { AddExpenseForm } from "@/components/add-expense-form"
import { ExpenseList } from "@/components/expense-list"
import { BudgetSetting } from "@/components/budget-setting"
import { MascotDisplay } from "@/components/mascot-display"
import { Expense, Budget } from "@/types/budget"
import { storageUtils } from "@/utils/storage"
import { calculateBudgetSummary, getSpendingTrend } from "@/utils/budget-calculations"
import { PiggyBank, Plus, List, Target } from "lucide-react"

const Index = () => {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [budget, setBudget] = useState<Budget | null>(null)
  const [activeTab, setActiveTab] = useState("dashboard")

  // Load data on mount
  useEffect(() => {
    const loadedExpenses = storageUtils.getExpenses()
    const loadedBudget = storageUtils.getBudget()
    
    setExpenses(loadedExpenses)
    setBudget(loadedBudget)
    
    // If no budget is set, start with budget setting
    if (!loadedBudget) {
      setActiveTab("budget")
    }
  }, [])

  const handleExpenseAdded = (expense: Expense) => {
    const updatedExpenses = [expense, ...expenses]
    setExpenses(updatedExpenses)
  }

  const handleExpenseDeleted = (id: string) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id)
    setExpenses(updatedExpenses)
  }

  const handleBudgetUpdated = (newBudget: Budget) => {
    setBudget(newBudget)
    if (activeTab === "budget") {
      setActiveTab("dashboard")
    }
  }

  const summary = calculateBudgetSummary(expenses, budget)
  const trend = getSpendingTrend(expenses)

  return (
    <div className="min-h-screen bg-gradient-rainbow">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <MascotDisplay type="bunny" size="md" />
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              BunnyBudget
            </h1>
            <MascotDisplay type="fox" size="md" />
          </div>
          <p className="text-muted-foreground text-lg">
            For my adorable Dobu,I love You! 🌸✨
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-card/50 p-1 rounded-full border-2 border-primary-light">
            <TabsTrigger 
              value="dashboard" 
              className="rounded-full data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <PiggyBank className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Dashboard</span>
            </TabsTrigger>
            <TabsTrigger 
              value="add" 
              className="rounded-full data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Add</span>
            </TabsTrigger>
            <TabsTrigger 
              value="expenses" 
              className="rounded-full data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <List className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Expenses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="budget" 
              className="rounded-full data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground"
            >
              <Target className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Budget</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {budget ? (
              <BudgetDashboard summary={summary} trend={trend} />
            ) : (
              <div className="text-center py-12">
                <MascotDisplay type="bear" size="xl" className="mb-6" />
                <h2 className="text-2xl font-semibold mb-4">Welcome to BunnyBudget!</h2>
                <p className="text-muted-foreground mb-6">
                  Let&apos;s set up your monthly budget first to get started
                </p>
                <button
                  onClick={() => setActiveTab("budget")}
                  className="text-primary hover:underline"
                >
                  Set your budget →
                </button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="add" className="space-y-6">
            <AddExpenseForm onExpenseAdded={handleExpenseAdded} />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenseList 
              expenses={expenses} 
              onExpenseDeleted={handleExpenseDeleted}
            />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetSetting 
              budget={budget} 
              onBudgetUpdated={handleBudgetUpdated}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Index
