import React from "react"
import { Trash2, Calendar } from "lucide-react"
import { CuteCard, CuteCardContent, CuteCardHeader, CuteCardTitle } from "@/components/ui/cute-card"
import { CuteButton } from "@/components/ui/cute-button"
import { Badge } from "@/components/ui/badge"
import { Expense, categoryEmojis, categoryColors } from "@/types/budget"
import { formatCurrency } from "@/utils/budget-calculations"
import { storageUtils } from "@/utils/storage"
import { useToast } from "@/hooks/use-toast"

interface ExpenseListProps {
  expenses: Expense[]
  onExpenseDeleted: (id: string) => void
}

export function ExpenseList({ expenses, onExpenseDeleted }: ExpenseListProps) {
  const { toast } = useToast()

  const handleDelete = (expense: Expense) => {
    try {
      storageUtils.deleteExpense(expense.id)
      onExpenseDeleted(expense.id)
      
      toast({
        title: "Expense deleted! 🗑️",
        description: `Removed ${expense.name} (${formatCurrency(expense.amount)})`,
      })
    } catch (error) {
      toast({
        title: "Oops! Couldn't delete",
        description: "Please try again",
        variant: "destructive"
      })
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    })
  }

  if (expenses.length === 0) {
    return (
      <CuteCard variant="soft">
        <CuteCardContent className="text-center py-8">
          <div className="text-6xl mb-4">🐰</div>
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No expenses yet!
          </h3>
          <p className="text-sm text-muted-foreground">
            Add your first expense above to get started
          </p>
        </CuteCardContent>
      </CuteCard>
    )
  }

  return (
    <CuteCard>
      <CuteCardHeader>
        <CuteCardTitle>Recent Expenses</CuteCardTitle>
      </CuteCardHeader>
      <CuteCardContent className="space-y-3">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center space-x-3 flex-1">
              <div className="text-2xl">
                {categoryEmojis[expense.category as keyof typeof categoryEmojis]}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {expense.name}
                </div>
                
                <div className="flex items-center space-x-2 mt-1">
                  <Badge 
                    variant="secondary" 
                    className={`text-xs capitalize ${
                      categoryColors[expense.category as keyof typeof categoryColors]
                    }`}
                  >
                    {expense.category}
                  </Badge>
                  
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(expense.date)}
                  </div>
                </div>
                
                {expense.description && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {expense.description}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="font-bold text-sm">
                  {formatCurrency(expense.amount)}
                </div>
              </div>
              
              <CuteButton
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(expense)}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
              </CuteButton>
            </div>
          </div>
        ))}
      </CuteCardContent>
    </CuteCard>
  )
}